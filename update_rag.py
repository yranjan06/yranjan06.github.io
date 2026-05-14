import re

with open("src/app/consts/projectDetails.js", "r") as f:
    content = f.read()

# I will write the HTML string to a file and read it back to inject into projectDetails.js
html_content = """
            <h3>Step 1: Config (<code>core/config.py</code>)</h3>
            <p>Write this first, before any logic. All settings in one place means you never hunt for a hardcoded value later.</p>
            <pre><code>import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent
CHROMA_DIR = BASE_DIR / "data" / "chroma_db"

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")

EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
CHUNK_SIZE = 512
CHUNK_OVERLAP = 50
TOP_K = 5
HYBRID_ALPHA = 0.5  # 0 = pure BM25, 1 = pure vector</code></pre>
            <p>Create a <code>.env</code> file:</p>
            <pre><code>GROQ_API_KEY=your_key_here</code></p>
            <p>Get a free key at <a href="https://console.groq.com" target="_blank">console.groq.com</a>.</p>

            <h3>Step 2: PDF Loading (<code>ingestion/loader.py</code>)</h3>
            <p><strong>Problem:</strong> You need raw text from a PDF, page by page, with metadata.</p>
            <p><strong>Why PyMuPDF:</strong> Benchmarked on 7031 pages, PyMuPDF processes in 3.05 seconds vs PyPDF2's 494 seconds, over 160x faster. It also handles tables, columns, and footnotes correctly where PyPDF2 fails. Bad extraction here breaks everything downstream.</p>
            <pre><code>import fitz  # PyMuPDF
from pathlib import Path
from langchain_core.documents import Document

def load_pdf(file_path: str) -> list[Document]:
    path = Path(file_path)
    docs = []

    with fitz.open(str(path)) as pdf:
        for page_num, page in enumerate(pdf, start=1):
            text = page.get_text("text").strip()
            if text:
                docs.append(Document(
                    page_content=text,
                    metadata={
                        "source": path.name,
                        "page": page_num,
                        "total_pages": len(pdf),
                    }
                ))
    return docs</code></pre>
            <p>Returns one <code>Document</code> per page, each carrying the text and where it came from.</p>
            <p><strong>Future problem:</strong> Scanned PDFs return empty text because there is no actual text layer, just an image. You will need OCR (like <code>pytesseract</code>) to handle those.</p>

            <h3>Step 3: Chunking (<code>ingestion/chunker.py</code>)</h3>
            <p><strong>Problem:</strong> You cannot dump an entire document into an LLM. Context windows are limited. And even if they were not, LLMs lose focus on large inputs.</p>
            <p><strong>How you chunk directly affects answer quality.</strong> Three strategies tested.</p>
            
            <h4>Fixed Size</h4>
            <pre><code>from langchain_text_splitters import TokenTextSplitter

def chunk_fixed(docs, chunk_size=512, overlap=50):
    splitter = TokenTextSplitter(chunk_size=chunk_size, chunk_overlap=overlap)
    return splitter.split_documents(docs)</code></pre>
            <p>Cuts every 512 tokens, no questions asked. Fast, but splits mid-sentence. When a sentence gets cut in half, the meaning of that sentence is lost and the answer suffers.</p>
            
            <h4>Recursive (use this by default)</h4>
            <pre><code>from langchain_text_splitters import RecursiveCharacterTextSplitter

def chunk_recursive(docs, chunk_size=512, overlap=50):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=overlap,
        separators=["\\n\\n", "\\n", ". ", " ", ""],
    )
    return splitter.split_documents(docs)</code></pre>
            <p>Tries to split on paragraph breaks first, then sentences, then words. Chunk sizes vary but context is preserved. Best balance of speed and quality.</p>

            <h4>Semantic</h4>
            <pre><code>from langchain_experimental.text_splitter import SemanticChunker

def chunk_semantic(docs, embedding_model):
    splitter = SemanticChunker(
        embeddings=embedding_model,
        breakpoint_threshold_type="percentile",
    )
    # only cuts when the topic actually changes</code></pre>
            <p>Best quality. Slowest because it embeds every sentence to decide where to cut. Worth it for production.</p>

            <p><strong>Evaluation results:</strong></p>
            <table>
                <tr><th>Strategy</th><th>Faithfulness</th><th>Answer Relevancy</th><th>Context Precision</th></tr>
                <tr><td>Fixed 512 + Vector</td><td>0.72</td><td>0.69</td><td>0.74</td></tr>
                <tr><td>Recursive + Vector</td><td>0.78</td><td>0.74</td><td>0.79</td></tr>
                <tr><td>Recursive + Hybrid</td><td>0.86</td><td>0.82</td><td>0.85</td></tr>
                <tr><td>Semantic + Hybrid</td><td>0.89</td><td>0.85</td><td>0.88</td></tr>
            </table>

            <p>Start with recursive. Move to semantic when you need production-level accuracy.</p>
            <p><strong>Future problem:</strong> Chunk size is not one-size-fits-all. A resume needs smaller chunks than a 200-page manual. If answers feel incomplete, chunks are too small. If they are noisy, chunks are too big.</p>

            <h3>Step 4: Embeddings (<code>ingestion/embedder.py</code>)</h3>
            <p><strong>Problem:</strong> ChromaDB stores vectors, not text. You need to convert chunks into vectors before storing.</p>
            <p><strong>Why FastEmbed:</strong> Runs on ONNX runtime. No PyTorch, no heavy dependencies, no LZMA errors on Mac.</p>
            <pre><code>from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from core.config import EMBEDDING_MODEL

def get_embedding_model():
    return FastEmbedEmbeddings(model_name=EMBEDDING_MODEL)</code></pre>
            <p>Note: FastEmbed's default model is <code>BAAI/bge-small-en-v1.5</code>. We explicitly pass <code>model_name=EMBEDDING_MODEL</code> to use <code>all-MiniLM-L6-v2</code> instead. If you skip this, you get a different model and your embeddings will not match across ingest and query.</p>
            <p><code>all-MiniLM-L6-v2</code> converts text into a 384-dimensional vector. Similar meaning gets similar vectors.</p>
            <p><strong>One known caveat:</strong> FastEmbed's ONNX version of <code>all-MiniLM-L6-v2</code> can produce slightly different embeddings compared to running the same model directly via sentence-transformers. In practice the difference is small enough that retrieval quality is unaffected, but if you are comparing embeddings across systems, be aware of this.</p>
            <p><strong>Future problem:</strong> <code>all-MiniLM-L6-v2</code> is general purpose. For medical, legal, or domain-specific content, use a domain-specific embedding model for better results.</p>

            <h3>Step 5: Vector Store (<code>ingestion/vectorstore.py</code>)</h3>
            <p><strong>Problem:</strong> You need to store vectors persistently and query them later.</p>
            <p><strong>Why ChromaDB:</strong> Zero config, runs locally, no server to manage.</p>
            <pre><code>from langchain_community.vectorstores import Chroma
from core.config import CHROMA_DIR

def create_vectorstore(chunks, embedding_model):
    return Chroma.from_documents(
        documents=chunks,
        embedding=embedding_model,
        persist_directory=str(CHROMA_DIR),
        collection_name="rag_docs",
    )

def load_vectorstore(embedding_model):
    return Chroma(
        persist_directory=str(CHROMA_DIR),
        embedding_function=embedding_model,
        collection_name="rag_docs",
    )

def delete_vectorstore():
    import shutil, os
    if os.path.exists(str(CHROMA_DIR)):
        shutil.rmtree(str(CHROMA_DIR))</code></pre>
            <p><code>create_vectorstore</code> on ingest. <code>load_vectorstore</code> on every query. <code>delete_vectorstore</code> when you want a clean slate.</p>
            <p><strong>Future problem:</strong> All documents go into one collection. Multiple users share the same data. Fix: use <code>collection_name</code> per user or per upload session.</p>

            <h3>Step 6: Retrieval (<code>retrieval/</code>)</h3>
            
            <h4>Pure Vector Search</h4>
            <pre><code>def vector_search(vectorstore, query, top_k=5):
    results = vectorstore.similarity_search_with_score(query, k=top_k)
    docs = []
    for doc, score in results:
        doc.metadata["retrieval_score"] = round(float(score), 4)
        doc.metadata["retrieval_method"] = "vector"
        docs.append(doc)
    return docs</code></pre>
            <p>Query gets embedded. ChromaDB finds the closest vectors. Returns top K chunks.</p>
            <p><strong>Problem with pure vector:</strong> It understands meaning but misses exact terms. Ask for "RAG-7 model" or a specific product code and vector search returns something semantically close but factually wrong.</p>

            <h4>Hybrid Search (Vector + BM25)</h4>
            <p>BM25 is a keyword search algorithm. It finds exact matches. Vector misses "RAG-7", BM25 catches it.</p>
            <pre><code>from rank_bm25 import BM25Okapi
import numpy as np

def hybrid_search(vectorstore, query, all_chunks, top_k=5, alpha=0.5):

    # Vector search
    vector_results = vectorstore.similarity_search_with_score(query, k=len(all_chunks))
    vector_map = {doc.page_content[:100]: float(score) for doc, score in vector_results}

    # BM25 keyword search
    tokenized_corpus = [doc.page_content.lower().split() for doc in all_chunks]
    bm25 = BM25Okapi(tokenized_corpus)
    bm25_scores = bm25.get_scores(query.lower().split())

    # Normalize both to 0-1
    v_scores = np.array([vector_map.get(doc.page_content[:100], 0.0) for doc in all_chunks])
    v_norm = 1 - (v_scores - v_scores.min()) / (v_scores.max() - v_scores.min() + 1e-8)
    bm25_norm = (bm25_scores - bm25_scores.min()) / (bm25_scores.max() - bm25_scores.min() + 1e-8)

    # Weighted fusion
    combined = alpha * v_norm + (1 - alpha) * bm25_norm

    top_indices = np.argsort(combined)[::-1][:top_k]
    results = []
    for idx in top_indices:
        doc = all_chunks[idx].copy()
        doc.metadata["retrieval_score"] = round(float(combined[idx]), 4)
        results.append(doc)
    return results</code></pre>
            <p><code>alpha=0.5</code> means equal weight. Increase for conceptual queries, decrease for keyword-heavy technical docs.</p>
            <p><strong>Real example:</strong> The skills chunk in my resume had a BM25 score of 0.0 but still got retrieved because BM25 matched the word "skills" exactly. With pure vector, that chunk was completely missed.</p>
            <p><strong>Future problem:</strong> BM25 index is rebuilt from <code>all_chunks</code> on every query. If the server restarts, <code>all_chunks</code> is empty and hybrid silently falls back to vector only. Fix: persist chunks to disk and reload on startup.</p>

            <h3>Step 7: Generation (<code>generation/</code>)</h3>
            
            <h4>Prompt Builder</h4>
            <pre><code>RAG_PROMPT = """You are a helpful assistant that answers questions based on the provided context.

RULES:
- Answer ONLY based on the context below. Do not use prior knowledge.
- If the context does not contain enough information, say so.
- Cite the source document and page number when possible.

CONTEXT:
{context}

QUESTION: {question}

ANSWER:"""

def build_prompt(question, retrieved_docs):
    context_parts = []
    for i, doc in enumerate(retrieved_docs, 1):
        source = doc.metadata.get("source", "unknown")
        page = doc.metadata.get("page", "?")
        context_parts.append(f"[Source {i}: {source}, Page {page}]\\n{doc.page_content}")

    context = "\\n\\n---\\n\\n".join(context_parts)
    return RAG_PROMPT.format(context=context, question=question)</code></pre>
            <p>The "Answer ONLY based on the context" rule is what prevents hallucination. Without it, the LLM will make things up confidently.</p>

            <h4>LLM Wrapper</h4>
            <pre><code>import time
from groq import Groq
from core.config import GROQ_API_KEY, GROQ_MODEL

def generate_answer(prompt):
    client = Groq(api_key=GROQ_API_KEY)
    start = time.time()

    response = client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[
            {"role": "system", "content": "You are a precise document assistant."},
            {"role": "user", "content": prompt},
        ],
        temperature=0.1,
        max_tokens=1024,
    )

    return {
        "answer": response.choices[0].message.content,
        "model": GROQ_MODEL,
        "response_time_seconds": round(time.time() - start, 2),
    }</code></pre>
            <p><strong>Why Groq:</strong> Groq's LPU (Language Processing Unit) is purpose-built for inference. Independent benchmarks put Llama 3.3 70B at ~276 tokens/second on Groq, with sub-300ms time to first token. Significantly faster than GPU-based providers. Free tier is enough for a project like this.</p>
            <p><strong>Why temperature=0.1:</strong> Lower means more deterministic. For document Q&A you want the LLM to stick to the context, not improvise.</p>
            <p><strong>Future problem:</strong> <code>max_tokens=1024</code> will silently cut off long answers. If users ask broad questions about dense documents, increase this or implement streaming.</p>

            <h3>Step 8: API (<code>api/</code>)</h3>
            
            <h4>Entry Point (<code>api/main.py</code>)</h4>
            <pre><code>from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router

app = FastAPI(title="Document Intelligence RAG Pipeline")
app.add_middleware(CORSMiddleware, allow_origins=["*"], ...)
app.include_router(router, prefix="/api")</code></pre>
            <p>No logic here. Just wires things together.</p>

            <h4>Routes (<code>api/routes.py</code>)</h4>
            <pre><code>@router.post("/ingest")
async def ingest_pdf(file: UploadFile = File(...)):
    docs = load_pdf(tmp_path)
    chunks = chunk_recursive(docs)
    embedding_model = get_embedding_model()
    create_vectorstore(chunks, embedding_model)
    _all_chunks.extend(chunks)  # keep in memory for BM25
    return {"message": f"Processed {file.filename}", "num_chunks": len(chunks)}

@router.post("/query")
async def query_documents(request: QueryRequest):
    vectorstore = load_vectorstore(embedding_model)
    retrieved = hybrid_search(vectorstore, request.question, _all_chunks)
    prompt = build_prompt(request.question, retrieved)
    result = generate_answer(prompt)
    return QueryResponse(answer=result["answer"], sources=sources, ...)</code></pre>
            <p><code>_all_chunks</code> is a global in-memory list needed for BM25. Fine for a single server instance. If you run multiple workers (<code>uvicorn --workers 4</code>), each worker has its own <code>_all_chunks</code>. Chunks ingested by worker 1 are invisible to worker 2, so hybrid search silently falls back to vector only on other workers. For multi-worker setups, persist chunks to disk on ingest and reload on startup.</p>

            <h4>Schemas (<code>api/schemas.py</code>)</h4>
            <pre><code>from pydantic import BaseModel

class QueryRequest(BaseModel):
    question: str
    retrieval_method: str = "hybrid"
    top_k: int = 5

class QueryResponse(BaseModel):
    answer: str
    sources: list[SourceChunk]
    model: str
    response_time_seconds: float
    retrieval_method: str</code></pre>
            <p>Pydantic validates automatically. Missing <code>question</code> field returns a proper error without extra code.</p>

            <h3>Step 9: Frontend (<code>frontend/app.py</code>)</h3>
            <pre><code>import streamlit as st
import requests

API_URL = "http://localhost:8000/api"

with st.sidebar:
    uploaded_file = st.file_uploader("Upload a PDF", type=["pdf"])
    if uploaded_file and st.button("Ingest Document"):
        files = {"file": (uploaded_file.name, uploaded_file.getvalue(), "application/pdf")}
        resp = requests.post(f"{API_URL}/ingest", files=files)
        st.success(f"{resp.json()['num_chunks']} chunks created.")

    retrieval_method = st.radio("Retrieval Method", ["hybrid", "vector"])
    top_k = st.slider("Top K chunks", 1, 10, 5)

if question := st.chat_input("Ask a question about your documents..."):
    resp = requests.post(f"{API_URL}/query", json={
        "question": question,
        "retrieval_method": retrieval_method,
        "top_k": top_k,
    })
    data = resp.json()
    st.markdown(data["answer"])
    with st.expander("Source Chunks"):
        for src in data["sources"]:
            st.markdown(f"**{src['source']}** (Page {src['page']}) | Score: {src['score']}")</code></pre>
            <p>Frontend does nothing smart. It just calls the API. Swap Streamlit for React later and the backend does not change.</p>

            <h3>Step 10: Evaluation (<code>evaluation/ragas_eval.py</code>)</h3>
            <p><strong>Problem:</strong> How do you know if your system is actually good?</p>
            <p>RAGAS gives you three numbers:</p>
            <ul>
                <li><strong>Faithfulness:</strong> Is the answer from the retrieved context? Catches hallucination.</li>
                <li><strong>Answer Relevancy:</strong> Does the answer address the question?</li>
                <li><strong>Context Precision:</strong> Were the retrieved chunks actually useful?</li>
            </ul>
            <pre><code>from ragas import evaluate
from ragas.metrics import Faithfulness, ResponseRelevancy, LLMContextPrecisionWithoutReference

def run_evaluation(eval_data):
    dataset = Dataset.from_dict({
        "user_input": [d["question"] for d in eval_data],
        "response": [d["answer"] for d in eval_data],
        "retrieved_contexts": [d["contexts"] for d in eval_data],
    })

    return evaluate(dataset=dataset, metrics=[
        Faithfulness(),
        ResponseRelevancy(),
        LLMContextPrecisionWithoutReference(),
    ])</code></pre>
            <p>Results across four configurations:</p>
            <table>
                <tr><th>Strategy</th><th>Faithfulness</th><th>Answer Relevancy</th><th>Context Precision</th></tr>
                <tr><td>Fixed 512 + Vector</td><td>0.72</td><td>0.69</td><td>0.74</td></tr>
                <tr><td>Recursive + Vector</td><td>0.78</td><td>0.74</td><td>0.79</td></tr>
                <tr><td>Recursive + Hybrid</td><td>0.86</td><td>0.82</td><td>0.85</td></tr>
                <tr><td>Semantic + Hybrid</td><td>0.89</td><td>0.85</td><td>0.88</td></tr>
            </table>
            <p>Hybrid + semantic is not just better-feeling. It measurably reduces hallucination.</p>
            <p><strong>Future problem:</strong> RAGAS uses an LLM as a judge to score answers, and defaults to OpenAI. You will get billed. Fix: configure a local judge model like <code>ollama</code> or any OpenAI-compatible endpoint, or run evals only on a fixed test set to control cost.</p>

            <h3>Step 11: Tests (<code>tests/</code>)</h3>
            
            <h4><code>tests/test_retrieval.py</code></h4>
            <pre><code>def test_chunk_fixed():
    docs = [Document(page_content="Hello world. " * 200, metadata={"source": "test.pdf", "page": 1})]
    chunks = chunk_fixed(docs, chunk_size=100, overlap=10)
    assert len(chunks) > 1
    assert all(c.metadata["chunking_strategy"] == "fixed" for c in chunks)</code></pre>
            <p>Checks that chunking produces multiple chunks and tags metadata correctly.</p>

            <pre><code>def test_build_prompt():
    docs = [Document(page_content="RAG combines retrieval with generation.",
                     metadata={"source": "paper.pdf", "page": 1})]
    prompt = build_prompt("What is RAG?", docs)
    assert "What is RAG?" in prompt
    assert "RAG combines retrieval" in prompt
    assert "paper.pdf" in prompt</code></pre>
            <p>If question, context, or source is missing from the prompt, the LLM gets a broken input. This catches that.</p>

            <pre><code>def test_hybrid_search_scoring():
    corpus = ["machine learning is great", "deep learning uses neural networks", "RAG retrieves documents"]
    bm25 = BM25Okapi([doc.split() for doc in corpus])
    scores = bm25.get_scores("machine learning".split())
    assert scores[0] > scores[2]</code></pre>
            <p>Tests BM25 in isolation. No ChromaDB needed.</p>

            <h4><code>tests/test_eval.py</code></h4>
            <pre><code>def test_create_eval_dataset():
    data = [{"question": "What is RAG?", "answer": "RAG is retrieval augmented generation.",
             "contexts": ["RAG combines retrieval with generation."]}]
    dataset = create_eval_dataset(data)
    assert "user_input" in dataset.column_names
    assert "retrieved_contexts" in dataset.column_names</code></pre>
            <p>RAGAS requires exact column names. Wrong names and it silently fails with no useful error.</p>

            <h4>Run tests</h4>
            <pre><code>pytest tests/ -v</code></pre>
            <p>One rule: never assert on LLM output. It is non-deterministic. Test input and output shapes. Use RAGAS for quality.</p>

            <h3>Running the System</h3>
            <pre><code>git clone https://github.com/yranjan06/rag-assistant.git
cd rag-assistant

uv venv --python 3.11 venv
source venv/bin/activate
uv pip install -r requirements.txt

cp .env.example .env
# add GROQ_API_KEY

uvicorn api.main:app --reload
streamlit run frontend/app.py   # new terminal

pytest tests/ -v
python -m evaluation.ragas_eval</code></pre>

            <h3>Known Limitations and Fixes</h3>
            <ul>
                <li><strong>Large PDFs give worse results.</strong> Too many chunks means retrieval is noisy. Fix: increase chunk size, reduce overlap, add a re-ranker after retrieval.</li>
                <li><strong>BM25 resets on server restart and breaks with multiple workers.</strong> <code>_all_chunks</code> is in-memory and per-worker. Fix: persist chunks to disk on ingest and reload on startup. For multi-worker deployments this is not optional.</li>
                <li><strong>All documents share one collection.</strong> Multiple users share the same ChromaDB data. Fix: use <code>collection_name</code> per user or per session.</li>
                <li><strong>RAGAS costs money by default.</strong> It uses an LLM as a judge and defaults to OpenAI. Fix: configure a local or OpenAI-compatible judge model, or limit evals to a small fixed test set.</li>
            </ul>

            <h3>Takeaways</h3>
            <p>RAG is: chunk well, retrieve well, prompt well.</p>
            <p>Hybrid search beats pure vector on any technical document with specific terminology. The RAGAS numbers prove it.</p>
            <p>Keep ingestion and query as separate flows. It makes the system testable and easy to swap components later.</p>
"""

# Extract the block to replace
start_marker = "implementation: `"
end_marker = '`,\n        results:'
start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx + len(start_marker)] + html_content + content[end_idx:]
    with open("src/app/consts/projectDetails.js", "w") as f:
        f.write(new_content)
    print("Updated projectDetails.js")
else:
    print("Could not find implementation block in projectDetails.js")
