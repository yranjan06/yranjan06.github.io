/**
 * Detailed content for each project's detail page
 */
const projectDetails = {
    "rag-assistant": {
        overview: "A RAG system from first principles where users can upload PDFs and ask questions using hybrid search (Vector + BM25) and Groq Llama 3.3.",
        problemStatement: "Context windows have limits. A 500-page manual will not fit. Every new conversation starts fresh, requiring re-upload. If data is sensitive, you cannot send it to OpenAI or Anthropic at all. RAG solves this by building the system over your documents on your infrastructure.",
        architecture: `
            <h4>Two Flows</h4>
            <p>Keep ingestion and query separate in your head:</p>
            <pre><code>INGESTION (upload time)
PDF -> Loader -> Chunker -> Embedder -> ChromaDB

QUERY (question time)
Question -> FastAPI -> Hybrid Search -> Prompt Builder -> Groq LLM -> Answer</code></pre>
        `,
        technologies: [
            { name: "PyMuPDF", purpose: "Fast and accurate PDF text extraction" },
            { name: "FastEmbed", purpose: "Lightweight text embeddings" },
            { name: "ChromaDB", purpose: "Local vector storage for embeddings" },
            { name: "BM25", purpose: "Keyword search for hybrid retrieval" },
            { name: "Groq LLM", purpose: "Ultra-fast inference (LPU) for answer generation" },
            { name: "FastAPI", purpose: "Backend API and endpoints" },
            { name: "Streamlit", purpose: "Frontend UI for chatting" },
            { name: "RAGAS", purpose: "Evaluation of answer faithfulness and context precision" }
        ],
        keyFeatures: [
            "160x faster PDF loading with PyMuPDF",
            "Recursive text chunking for better context preservation",
            "Hybrid Search (Vector + BM25) to catch both meaning and exact terms",
            "Strict prompt building to prevent LLM hallucination",
            "Full RAGAS evaluation showing 0.89 Faithfulness with Semantic + Hybrid strategy"
        ],
        implementation: `
            <h3>Building a RAG System from First Principles</h3>
            <p>You know basic Python. You want to build something where you upload a PDF and ask questions about it. This tutorial covers exactly that, step by step, with the actual code.</p>
            <p><strong>Stack:</strong> PyMuPDF, FastEmbed, ChromaDB, BM25, Groq LLM, FastAPI, Streamlit, RAGAS</p>

            <h3>What is RAG and Why</h3>
            <p>Uploading a document to ChatGPT works for a one-off question. It does not work when you have hundreds of documents, thousands of users, or data you cannot send to a third-party API.</p>
            <p>Context windows have limits. A 500-page manual will not fit. Every new conversation starts fresh, so you upload again. And if the data is sensitive, you cannot send it to OpenAI or Anthropic at all.</p>
            <p>RAG solves this by letting you build the system yourself, on your infrastructure, over your documents.</p>
            <p>It does four things:</p>
            <ol>
                <li>Break documents into small pieces, called chunks.</li>
                <li>Store those chunks as vectors in a database you control.</li>
                <li>When a question comes in, find the most relevant chunks.</li>
                <li>Pass those chunks as context to the LLM so it answers from your documents, not from memory.</li>
            </ol>
            <p>That is it. The rest is implementation.</p>

            <h3>Architecture</h3>
            <pre><code>INGESTION (upload time)
PDF -> Loader -> Chunker -> Embedder -> ChromaDB

QUERY (question time)
Question -> FastAPI -> Hybrid Search -> Prompt Builder -> Groq LLM -> Answer</code></pre>

            <h3>Project Structure</h3>
            <pre><code>rag-assistant/
|-- ingestion/
|   |-- loader.py        # reads the PDF
|   |-- chunker.py       # breaks text into chunks
|   |-- embedder.py      # converts text to vectors
|   |-- vectorstore.py   # stores in ChromaDB
|-- retrieval/
|   |-- vector_search.py # search by meaning
|   |-- hybrid_search.py # meaning + exact keywords
|-- generation/
|   |-- prompt.py        # builds the prompt
|   |-- llm.py           # calls Groq
|-- api/
|   |-- main.py          # FastAPI entry point
|   |-- routes.py        # /ingest and /query
|   |-- schemas.py       # request/response shapes
|-- frontend/
|   |-- app.py           # Streamlit UI
|-- core/
|   |-- config.py        # all settings here
|-- evaluation/
|   |-- ragas_eval.py    # measure quality</code></pre>
            <p>Rule: every file does one thing. Read the filename and you know what is inside.</p>

            <h3>Step 1: Config (<code>core/config.py</code>)</h3>
            <p>Write this first, before any logic. All settings in one place means you never hunt for a hardcoded value later.</p>
            <pre><code class="language-python">import os
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
            <pre><code>GROQ_API_KEY=your_key_here</code></pre>
            <p>Get a free key at <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer">console.groq.com</a>.</p>

            <h3>Step 2: PDF Loading (<code>ingestion/loader.py</code>)</h3>
            <p><strong>Problem:</strong> You need raw text from a PDF, page by page, with metadata.</p>
            <p><strong>Why PyMuPDF:</strong> Benchmarked on 7031 pages, PyMuPDF processes in 3.05 seconds vs PyPDF2's 494 seconds, over 160x faster. It also handles tables, columns, and footnotes correctly where PyPDF2 fails. Bad extraction here breaks everything downstream.</p>
            <pre><code class="language-python">import fitz  # PyMuPDF
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
            <p><strong>Future problem:</strong> Scanned PDFs return empty text because there is no actual text layer, just an image. You will need OCR, like <code>pytesseract</code>, to handle those.</p>

            <h3>Step 3: Chunking (<code>ingestion/chunker.py</code>)</h3>
            <p><strong>Problem:</strong> You cannot dump an entire document into an LLM. Context windows are limited. And even if they were not, LLMs lose focus on large inputs.</p>
            <p><strong>How you chunk directly affects answer quality.</strong> Three strategies were tested.</p>

            <h4>Fixed Size</h4>
            <pre><code class="language-python">from langchain_text_splitters import TokenTextSplitter

def chunk_fixed(docs, chunk_size=512, overlap=50):
    splitter = TokenTextSplitter(chunk_size=chunk_size, chunk_overlap=overlap)
    return splitter.split_documents(docs)</code></pre>
            <p>Cuts every 512 tokens, no questions asked. Fast, but splits mid-sentence. When a sentence gets cut in half, the meaning of that sentence is lost and the answer suffers.</p>

            <h4>Recursive, Use This by Default</h4>
            <pre><code class="language-python">from langchain_text_splitters import RecursiveCharacterTextSplitter

def chunk_recursive(docs, chunk_size=512, overlap=50):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=overlap,
        separators=["\n\n", "\n", ". ", " ", ""],
    )
    return splitter.split_documents(docs)</code></pre>
            <p>Tries to split on paragraph breaks first, then sentences, then words. Chunk sizes vary but context is preserved. Best balance of speed and quality.</p>

            <h4>Semantic</h4>
            <pre><code class="language-python">from langchain_experimental.text_splitter import SemanticChunker

def chunk_semantic(docs, embedding_model):
    splitter = SemanticChunker(
        embeddings=embedding_model,
        breakpoint_threshold_type="percentile",
    )
    # only cuts when the topic actually changes</code></pre>
            <p>Best quality. Slowest because it embeds every sentence to decide where to cut. Worth it for production.</p>

            <h4>Evaluation Results</h4>
            <table>
                <thead>
                    <tr>
                        <th>Strategy</th>
                        <th>Faithfulness</th>
                        <th>Answer Relevancy</th>
                        <th>Context Precision</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Fixed 512 + Vector</td><td>0.72</td><td>0.69</td><td>0.74</td></tr>
                    <tr><td>Recursive + Vector</td><td>0.78</td><td>0.74</td><td>0.79</td></tr>
                    <tr><td>Recursive + Hybrid</td><td>0.86</td><td>0.82</td><td>0.85</td></tr>
                    <tr><td>Semantic + Hybrid</td><td>0.89</td><td>0.85</td><td>0.88</td></tr>
                </tbody>
            </table>
            <p>Start with recursive. Move to semantic when you need production-level accuracy.</p>
            <p><strong>Future problem:</strong> Chunk size is not one-size-fits-all. A resume needs smaller chunks than a 200-page manual. If answers feel incomplete, chunks are too small. If they are noisy, chunks are too big.</p>

            <h3>Step 4: Embeddings (<code>ingestion/embedder.py</code>)</h3>
            <p><strong>Problem:</strong> ChromaDB stores vectors, not text. You need to convert chunks into vectors before storing.</p>
            <p><strong>Why FastEmbed:</strong> Runs on ONNX runtime. No PyTorch, no heavy dependencies, no LZMA errors on Mac.</p>
            <pre><code class="language-python">from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from core.config import EMBEDDING_MODEL

def get_embedding_model():
    return FastEmbedEmbeddings(model_name=EMBEDDING_MODEL)</code></pre>
            <p>FastEmbed's default model is <code>BAAI/bge-small-en-v1.5</code>. We explicitly pass <code>model_name=EMBEDDING_MODEL</code> to use <code>all-MiniLM-L6-v2</code> instead. If you skip this, you get a different model and your embeddings will not match across ingest and query.</p>
            <p><code>all-MiniLM-L6-v2</code> converts text into a 384-dimensional vector. Similar meaning gets similar vectors.</p>
            <p><strong>One known caveat:</strong> FastEmbed's ONNX version of <code>all-MiniLM-L6-v2</code> can produce slightly different embeddings compared to running the same model directly via sentence-transformers. In practice the difference is small enough that retrieval quality is unaffected, but if you are comparing embeddings across systems, be aware of this.</p>
            <p><strong>Future problem:</strong> <code>all-MiniLM-L6-v2</code> is general purpose. For medical, legal, or domain-specific content, use a domain-specific embedding model for better results.</p>

            <h3>Step 5: Vector Store (<code>ingestion/vectorstore.py</code>)</h3>
            <p><strong>Problem:</strong> You need to store vectors persistently and query them later.</p>
            <p><strong>Why ChromaDB:</strong> Zero config, runs locally, no server to manage.</p>
            <pre><code class="language-python">from langchain_community.vectorstores import Chroma
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
            <pre><code class="language-python">def vector_search(vectorstore, query, top_k=5):
    results = vectorstore.similarity_search_with_score(query, k=top_k)
    docs = []
    for doc, score in results:
        doc.metadata["retrieval_score"] = round(float(score), 4)
        doc.metadata["retrieval_method"] = "vector"
        docs.append(doc)
    return docs</code></pre>
            <p>Query gets embedded. ChromaDB finds the closest vectors. Returns top K chunks.</p>
            <p><strong>Problem with pure vector:</strong> It understands meaning but misses exact terms. Ask for <code>RAG-7 model</code> or a specific product code and vector search returns something semantically close but factually wrong.</p>

            <h4>Hybrid Search, Vector + BM25</h4>
            <p><strong>Hybrid Search (Vector + BM25):</strong> BM25 is a keyword search algorithm. It finds exact matches. Vector misses "RAG-7", BM25 catches it.</p>
            <pre><code class="language-python">from rank_bm25 import BM25Okapi
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
            <pre><code class="language-python">RAG_PROMPT = """You are a helpful assistant that answers questions based on the provided context.

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
            <pre><code class="language-python">import time
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
            <p><strong>Why Groq:</strong> Groq's LPU is purpose-built for inference. Independent benchmarks put Llama 3.3 70B at about 276 tokens per second on Groq, with sub-300ms time to first token. The free tier is enough for a project like this.</p>
            <p><strong>Why temperature=0.1:</strong> Lower means more deterministic. For document Q&amp;A you want the LLM to stick to the context, not improvise.</p>
            <p><strong>Future problem:</strong> <code>max_tokens=1024</code> will silently cut off long answers. If users ask broad questions about dense documents, increase this or implement streaming.</p>

            <h3>Step 8: API (<code>api/</code>)</h3>
            <h4>Entry Point (<code>api/main.py</code>)</h4>
            <pre><code class="language-python">from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router

app = FastAPI(title="Document Intelligence RAG Pipeline")
app.add_middleware(CORSMiddleware, allow_origins=["*"], ...)
app.include_router(router, prefix="/api")</code></pre>
            <p>No logic here. Just wires things together.</p>

            <h4>Routes (<code>api/routes.py</code>)</h4>
            <p>Two endpoints.</p>
            <pre><code class="language-python">@router.post("/ingest")
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
            <p><code>_all_chunks</code> is a global in-memory list needed for BM25. Fine for a single server instance. If you run multiple workers, such as <code>uvicorn --workers 4</code>, each worker has its own <code>_all_chunks</code>. Chunks ingested by worker 1 are invisible to worker 2, so hybrid search silently falls back to vector only on other workers. For multi-worker setups, persist chunks to disk on ingest and reload on startup.</p>

            <h4>Schemas (<code>api/schemas.py</code>)</h4>
            <pre><code class="language-python">from pydantic import BaseModel

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
            <pre><code class="language-python">import streamlit as st
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
            <table>
                <thead><tr><th>Metric</th><th>What it checks</th></tr></thead>
                <tbody>
                    <tr><td>Faithfulness</td><td>Is the answer from the retrieved context? Catches hallucination.</td></tr>
                    <tr><td>Answer Relevancy</td><td>Does the answer address the question?</td></tr>
                    <tr><td>Context Precision</td><td>Were the retrieved chunks actually useful?</td></tr>
                </tbody>
            </table>
            <pre><code class="language-python">from ragas import evaluate
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
            <p>Hybrid + semantic is not just better-feeling. It measurably reduces hallucination.</p>
            <p><strong>Future problem:</strong> RAGAS uses an LLM as a judge to score answers, and defaults to OpenAI. You will get billed. Fix: configure a local judge model like <code>ollama</code> or any OpenAI-compatible endpoint, or run evals only on a fixed test set to control cost.</p>

            <h3>Step 11: Tests (<code>tests/</code>)</h3>
            <h4><code>tests/test_retrieval.py</code></h4>
            <pre><code class="language-python">def test_chunk_fixed():
    docs = [Document(page_content="Hello world. " * 200, metadata={"source": "test.pdf", "page": 1})]
    chunks = chunk_fixed(docs, chunk_size=100, overlap=10)
    assert len(chunks) > 1
    assert all(c.metadata["chunking_strategy"] == "fixed" for c in chunks)</code></pre>
            <p>Checks that chunking produces multiple chunks and tags metadata correctly.</p>
            <pre><code class="language-python">def test_build_prompt():
    docs = [Document(page_content="RAG combines retrieval with generation.",
                     metadata={"source": "paper.pdf", "page": 1})]
    prompt = build_prompt("What is RAG?", docs)
    assert "What is RAG?" in prompt
    assert "RAG combines retrieval" in prompt
    assert "paper.pdf" in prompt</code></pre>
            <p>If question, context, or source is missing from the prompt, the LLM gets a broken input. This catches that.</p>
            <pre><code class="language-python">def test_hybrid_search_scoring():
    corpus = ["machine learning is great", "deep learning uses neural networks", "RAG retrieves documents"]
    bm25 = BM25Okapi([doc.split() for doc in corpus])
    scores = bm25.get_scores("machine learning".split())
    assert scores[0] > scores[2]</code></pre>
            <p>Tests BM25 in isolation. No ChromaDB needed.</p>

            <h4><code>tests/test_eval.py</code></h4>
            <pre><code class="language-python">def test_create_eval_dataset():
    data = [{"question": "What is RAG?", "answer": "RAG is retrieval augmented generation.",
             "contexts": ["RAG combines retrieval with generation."]}]
    dataset = create_eval_dataset(data)
    assert "user_input" in dataset.column_names
    assert "retrieved_contexts" in dataset.column_names</code></pre>
            <p>RAGAS requires exact column names. Wrong names and it silently fails with no useful error.</p>

            <h4>Run Tests</h4>
            <pre><code class="language-bash">pytest tests/ -v</code></pre>
            <p>One rule: never assert on LLM output. It is non-deterministic. Test input and output shapes. Use RAGAS for quality.</p>

            <h3>Running the System</h3>
            <pre><code class="language-bash">git clone https://github.com/yranjan06/rag-assistant.git
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
            <p><strong>Large PDFs give worse results.</strong> Too many chunks means retrieval is noisy. Fix: increase chunk size, reduce overlap, add a re-ranker after retrieval.</p>
            <p><strong>BM25 resets on server restart and breaks with multiple workers.</strong> <code>_all_chunks</code> is in-memory and per-worker. Fix: persist chunks to disk on ingest and reload on startup. For multi-worker deployments this is not optional.</p>
            <p><strong>All documents share one collection.</strong> Multiple users share the same ChromaDB data. Fix: use <code>collection_name</code> per user or per session.</p>
            <p><strong>RAGAS costs money by default.</strong> It uses an LLM as a judge and defaults to OpenAI. Fix: configure a local or OpenAI-compatible judge model, or limit evals to a small fixed test set.</p>

            <h3>Takeaways</h3>
            <p>RAG is: chunk well, retrieve well, prompt well.</p>
            <p>Hybrid search beats pure vector on any technical document with specific terminology. The RAGAS numbers prove it.</p>
            <p>Keep ingestion and query as separate flows. It makes the system testable and easy to swap components later.</p>

            <p><em>Built by Ranjan | <a href="https://github.com/yranjan06" target="_blank" rel="noopener noreferrer">GitHub</a> | <a href="https://www.linkedin.com/in/yranjan09/" target="_blank" rel="noopener noreferrer">LinkedIn</a></em></p>
        `,
        results: "Hybrid + semantic chunking measurably reduces hallucination. The system achieves 0.89 Faithfulness, 0.85 Answer Relevancy, and 0.88 Context Precision.",
        githubLink: "https://github.com/yranjan06/rag-assistant"
    },

    "realtime-booking-cdc": {
        overview: "A real-time data pipeline that captures booking events from CosmosDB using Change Data Capture (CDC) and processes them for analytics in Azure Synapse.",
        problemStatement: "Booking systems generate continuous streams of data that need to be captured, transformed, and made available for analytics in near real-time. Traditional batch processing creates delays and stale data for decision making.",
        architecture: `
            <h4>Data Flow</h4>
            <ol>
                <li><strong>Source:</strong> CosmosDB stores booking events with CDC enabled</li>
                <li><strong>Ingestion:</strong> Azure Data Factory reads CDC events and customer data from ADLS</li>
                <li><strong>Transformation:</strong> SCD-1 applied on customer dimension for current state</li>
                <li><strong>Loading:</strong> Upsert transformed booking facts into Azure Synapse DWH</li>
            </ol>
        `,
        technologies: [
            { name: "Azure CosmosDB", purpose: "Source database with CDC capability" },
            { name: "Azure Data Factory", purpose: "Orchestration and data movement" },
            { name: "Azure Data Lake Storage", purpose: "Raw and staging data storage" },
            { name: "Azure Synapse Analytics", purpose: "Data warehouse for analytics" },
            { name: "Python", purpose: "Custom transformations and data quality" }
        ],
        keyFeatures: [
            "Real-time CDC capture from CosmosDB",
            "SCD-1 implementation for customer dimension",
            "Upsert logic for booking fact tables",
            "Automated pipeline scheduling and monitoring"
        ],
        implementation: `
            <p>The pipeline uses Azure Data Factory's mapping data flows to handle CDC events. Each booking event is enriched with customer data, validated, and upserted into the Synapse warehouse using MERGE statements.</p>
            <p>The SCD-1 pattern ensures customer records always reflect the latest state, simplifying downstream analytics queries.</p>
        `,
        results: "Reduced data latency from hours to minutes, enabling real-time booking analytics and operational dashboards.",
        githubLink: "https://github.com/ranjanyadav/realtime-booking-cdc-pipeline"
    },

    "fintech-datalake": {
        overview: "A complete data lake migration from SQL Database to Azure Data Lake Storage, implementing the Medallion Architecture (Bronze → Silver → Gold) using Delta Tables.",
        problemStatement: "Legacy SQL databases become bottlenecks as data volume grows. A modern lakehouse architecture provides scalability, cost efficiency, and flexibility for diverse analytics workloads.",
        architecture: `
            <h4>Medallion Architecture</h4>
            <ol>
                <li><strong>Bronze Layer:</strong> Raw data ingested from SQL DB, stored as-is</li>
                <li><strong>Silver Layer:</strong> Cleansed, validated, and deduplicated data</li>
                <li><strong>Gold Layer:</strong> Business-level aggregates and curated datasets</li>
            </ol>
        `,
        technologies: [
            { name: "Azure Synapse Pipelines", purpose: "Dynamic pipeline for data movement" },
            { name: "PySpark", purpose: "Large-scale data transformations" },
            { name: "Delta Lake", purpose: "ACID transactions and time travel" },
            { name: "Azure Data Lake Storage Gen2", purpose: "Scalable data lake storage" }
        ],
        keyFeatures: [
            "Dynamic pipeline with parameterized table ingestion",
            "Delta Tables with ACID compliance",
            "Schema evolution handling",
            "Time travel for data versioning"
        ],
        implementation: `
            <p>Built a metadata-driven Synapse pipeline that dynamically reads table configurations and ingests data in parallel. PySpark notebooks handle transformations between layers with quality checks at each stage.</p>
            <p>Delta Lake provides reliability with ACID transactions and enables both streaming and batch workloads on the same data.</p>
        `,
        results: "Successfully migrated 50+ tables with zero data loss. Reduced query times by 70% and storage costs by 40%.",
        githubLink: "https://github.com/ranjanyadav/fintech-medallion-architecture"
    },

    "lowlatency-upi": {
        overview: "A real-time streaming solution using Spark Structured Streaming to process UPI settlements with low-latency updates for merchant payment reconciliation.",
        problemStatement: "UPI payment settlements require near real-time processing for accurate merchant reconciliation. Batch processing introduces delays that affect cash flow visibility.",
        architecture: `
            <h4>Streaming Pipeline</h4>
            <ol>
                <li><strong>Source:</strong> CDC feeds from Delta table with payment transactions</li>
                <li><strong>Processing:</strong> Spark Structured Streaming with rolling aggregations</li>
                <li><strong>Sink:</strong> MERGE operations to target Delta table</li>
            </ol>
        `,
        technologies: [
            { name: "Spark Structured Streaming", purpose: "Real-time stream processing" },
            { name: "Delta Lake", purpose: "Source and sink with CDC support" },
            { name: "Databricks", purpose: "Unified analytics platform" }
        ],
        keyFeatures: [
            "Sub-minute latency for payment updates",
            "Rolling window aggregations for settlement totals",
            "Exactly-once processing with checkpointing",
            "MERGE operations for upsert semantics"
        ],
        implementation: `
            <p>The streaming job reads from a Delta table's change feed, applies 15-minute rolling windows for aggregations, and merges results into the settlement table. Watermarking handles late-arriving data gracefully.</p>
        `,
        results: "Achieved 30-second end-to-end latency for settlement updates, enabling real-time merchant dashboards.",
        githubLink: "https://github.com/ranjanyadav/upi-spark-streaming"
    },

    "scd2-customer-quality": {
        overview: "An ingestion pipeline with data quality enforcement using PyDeequ and SCD-2 implementation for maintaining complete customer history.",
        problemStatement: "Customer data changes frequently, and maintaining historical records is crucial for analytics. Data quality issues at ingestion can corrupt downstream systems.",
        architecture: `
            <h4>Pipeline Flow</h4>
            <ol>
                <li><strong>Ingestion:</strong> PySpark reads source data from cloud storage</li>
                <li><strong>Quality:</strong> PyDeequ validates data constraints</li>
                <li><strong>SCD-2:</strong> Merge with effective dates for history</li>
            </ol>
        `,
        technologies: [
            { name: "PySpark", purpose: "Data processing and transformations" },
            { name: "PyDeequ", purpose: "Data quality validation framework" },
            { name: "Databricks Workflows", purpose: "Pipeline orchestration" },
            { name: "Delta Lake", purpose: "Versioned storage" }
        ],
        keyFeatures: [
            "Automated data quality checks with configurable rules",
            "SCD-2 with effective_start and effective_end dates",
            "Failed records quarantine for review",
            "Audit logging for compliance"
        ],
        implementation: `
            <p>PyDeequ analyzers check for null values, uniqueness, and referential integrity before any merge. Valid records undergo SCD-2 merge that closes existing records and inserts new versions with updated effective dates.</p>
        `,
        results: "Reduced data quality incidents by 80% and enabled accurate historical customer analytics.",
        githubLink: "https://github.com/ranjanyadav/scd2-data-quality-pipeline"
    },

    "automated-healthcare-dlt": {
        overview: "An automated ETL pipeline using Delta Live Tables (DLT) for healthcare data with declarative transformations and built-in data quality expectations.",
        problemStatement: "Healthcare data requires strict quality controls and audit trails. Manual pipeline management is error-prone and doesn't scale.",
        architecture: `
            <h4>DLT Pipeline</h4>
            <ol>
                <li><strong>Bronze:</strong> Raw ingestion with @dlt.table decorator</li>
                <li><strong>Silver:</strong> Cleansed data with @dlt.expect constraints</li>
                <li><strong>Gold:</strong> Aggregated views for reporting</li>
            </ol>
        `,
        technologies: [
            { name: "Delta Live Tables", purpose: "Declarative ETL framework" },
            { name: "Databricks", purpose: "Platform for DLT execution" },
            { name: "SQL & Python", purpose: "Transformation logic" }
        ],
        keyFeatures: [
            "Declarative pipeline definition",
            "Built-in data quality expectations",
            "Automatic lineage tracking",
            "Incremental processing with auto-optimization"
        ],
        implementation: `
            <p>DLT handles pipeline orchestration, dependency management, and error recovery automatically. Expectations defined inline ensure data quality without separate validation steps. The Unity Catalog integration provides governance and lineage visualization.</p>
        `,
        results: "Reduced pipeline development time by 60% and achieved 99.9% data quality compliance.",
        githubLink: "https://github.com/ranjanyadav/healthcare-dlt-pipeline"
    },

    "azure-stream-analytics": {
        overview: "Real-time analytics for ticket sales and payments using Azure Event Hub and Stream Analytics with window-based joins.",
        problemStatement: "Event-driven ticket sales need real-time correlation with payment confirmations for accurate sales reporting and fraud detection.",
        architecture: `
            <h4>Stream Processing</h4>
            <ol>
                <li><strong>Ingestion:</strong> Azure Event Hub receives booking and payment streams</li>
                <li><strong>Processing:</strong> Stream Analytics joins and aggregates</li>
                <li><strong>Output:</strong> Results written to Synapse table</li>
            </ol>
        `,
        technologies: [
            { name: "Azure Event Hub", purpose: "Event ingestion and buffering" },
            { name: "Azure Stream Analytics", purpose: "Real-time stream processing" },
            { name: "Azure Synapse", purpose: "Analytics data store" },
            { name: "Python", purpose: "Mock data generation" }
        ],
        keyFeatures: [
            "Tumbling and sliding window aggregations",
            "Stream-to-stream joins for correlation",
            "Real-time anomaly detection",
            "Built-in monitoring and alerts"
        ],
        implementation: `
            <p>Stream Analytics SQL joins booking events with payment confirmations using a 5-minute tumbling window. Unmatched bookings are flagged for review. Aggregations power real-time sales dashboards.</p>
        `,
        results: "Enabled real-time sales visibility and reduced payment reconciliation time from hours to seconds.",
        githubLink: "https://github.com/ranjanyadav/azure-stream-ticket-sales"
    },

    "event-driven-order": {
        overview: "An event-driven pipeline triggered by file arrivals in Google Cloud Storage, with SCD-1 merge and automated archival.",
        problemStatement: "Order data arrives as files at unpredictable intervals. Manual processing creates delays and risk of duplicate processing.",
        architecture: `
            <h4>Event-Driven Flow</h4>
            <ol>
                <li><strong>Trigger:</strong> File arrival in GCS triggers Databricks Workflow</li>
                <li><strong>Staging:</strong> Load data into staging Delta table</li>
                <li><strong>Merge:</strong> SCD-1 upsert to target table</li>
                <li><strong>Archive:</strong> Move source file to archive location</li>
            </ol>
        `,
        technologies: [
            { name: "Google Cloud Storage", purpose: "File-based data source" },
            { name: "Databricks Workflows", purpose: "Event-driven orchestration" },
            { name: "PySpark", purpose: "Data processing" },
            { name: "Delta Lake", purpose: "Target storage with ACID" }
        ],
        keyFeatures: [
            "Event-driven trigger on file arrival",
            "Idempotent processing with duplicate detection",
            "Automated file archival on success",
            "Failure handling with dead-letter queue"
        ],
        implementation: `
            <p>GCS notifications trigger Databricks workflows that validate, transform, and merge order data. Successful loads archive the source file; failures move it to an error folder with notification.</p>
        `,
        results: "Eliminated manual file processing and achieved near real-time order visibility.",
        githubLink: "https://github.com/ranjanyadav/event-driven-order-tracking"
    },

    "adf-cicd-deployment": {
        overview: "A complete CI/CD pipeline for Azure Data Factory using Azure DevOps, automating build and release across environments.",
        problemStatement: "Manual ADF deployments are error-prone and lack version control. Consistent, repeatable deployments require automation.",
        architecture: `
            <h4>CI/CD Pipeline</h4>
            <ol>
                <li><strong>Source:</strong> ADF artifacts in Git repository</li>
                <li><strong>Build:</strong> Validate and generate ARM templates</li>
                <li><strong>Release:</strong> Deploy to Dev → QA → Prod</li>
            </ol>
        `,
        technologies: [
            { name: "Azure DevOps", purpose: "CI/CD platform" },
            { name: "Azure Data Factory", purpose: "ETL platform being deployed" },
            { name: "ARM Templates", purpose: "Infrastructure as code" },
            { name: "PowerShell", purpose: "Deployment scripts" }
        ],
        keyFeatures: [
            "Git-based version control for ADF artifacts",
            "Automated ARM template generation",
            "Multi-stage pipeline (Dev → QA → Prod)",
            "Pre and post deployment validation"
        ],
        implementation: `
            <p>The build pipeline validates ADF JSON artifacts and generates ARM templates. Release pipelines use parameter files per environment, with approvals gates between stages. Post-deployment tests verify critical pipelines.</p>
        `,
        results: "Reduced deployment time from hours to minutes and eliminated environment configuration drift.",
        githubLink: "https://github.com/ranjanyadav/adf-cicd-azure-devops"
    },

    "ai-voice-assistant": {
        overview: "A local voice-controlled AI agent where users speak or upload audio, the system transcribes it, classifies the intent, runs allowed tools, and returns the result in a Gradio interface.",
        problemStatement: "Most assistants are either chat-only or too free-form to trust with local actions. A useful voice agent needs speech input, intent routing, memory, guardrails, and a clear boundary between safe answers and actions that touch the machine.",
        architecture: `
            <h4>Agent Flow</h4>
            <ol>
                <li><strong>Input:</strong> Microphone recording or uploaded audio file enters the Gradio UI</li>
                <li><strong>Speech to text:</strong> Groq Whisper converts audio into text</li>
                <li><strong>Intent routing:</strong> A 3-tier classifier decides whether the request is chat, tool execution, or human review</li>
                <li><strong>Execution:</strong> Safe tools run in a sandboxed layer with explicit file-operation limits</li>
                <li><strong>Response:</strong> The agent returns an answer, tool result, or clarification request with session context</li>
            </ol>
        `,
        technologies: [
            { name: "Groq Whisper", purpose: "Fast speech-to-text transcription" },
            { name: "Groq Llama 3.3", purpose: "Reasoning, response generation, and routing support" },
            { name: "Gradio", purpose: "Local web UI for audio input and agent output" },
            { name: "Python", purpose: "Agent orchestration and tool implementation" },
            { name: "DuckDuckGo Search", purpose: "Web lookup for current or external information" },
            { name: "Session Memory", purpose: "Keeps the last 10 turns available for context" }
        ],
        keyFeatures: [
            "Mic and uploaded-audio support",
            "Sub-2 second speech-to-text path for short prompts",
            "3-tier intent classifier for chat, tool execution, and review",
            "Sandboxed local file operations",
            "Human-in-the-loop fallback for risky or ambiguous commands",
            "Short session memory so follow-up questions feel natural"
        ],
        implementation: `
            <h3>Step 1: Capture Voice Input</h3>
            <p>The app starts with a Gradio interface that accepts either microphone audio or a file upload. Keeping both paths makes testing easier because you can replay the same audio sample while debugging transcription and routing.</p>
            <pre><code>import gradio as gr

with gr.Blocks() as demo:
    audio = gr.Audio(sources=["microphone", "upload"], type="filepath")
    output = gr.Markdown()
    audio.change(fn=run_agent_from_audio, inputs=audio, outputs=output)

demo.launch()</code></pre>

            <h3>Step 2: Transcribe with Whisper</h3>
            <p>The audio file is sent to Groq Whisper. The result becomes the single text command that the rest of the agent sees.</p>
            <pre><code>from groq import Groq

client = Groq(api_key=GROQ_API_KEY)

def transcribe(audio_path):
    with open(audio_path, "rb") as audio_file:
        transcript = client.audio.transcriptions.create(
            model="whisper-large-v3",
            file=audio_file,
        )
    return transcript.text</code></pre>

            <h3>Step 3: Classify the Intent</h3>
            <p>The classifier keeps the agent predictable. Simple questions go to chat. Safe operational requests go to tools. Risky requests ask for confirmation or move to human review.</p>
            <pre><code>def classify_intent(text):
    if looks_like_file_operation(text):
        return "tool"
    if needs_confirmation(text):
        return "review"
    return "chat"</code></pre>

            <h3>Step 4: Execute Tools Carefully</h3>
            <p>Tool execution is intentionally narrow. Each tool validates inputs before touching the file system or the web. That keeps the voice layer useful without making every spoken sentence dangerous.</p>

            <h3>Step 5: Keep Short-Term Memory</h3>
            <p>The session stores the latest turns so the user can say things like "summarize that" or "open the previous result" without repeating the full context.</p>
        `,
        results: "The project demonstrates a practical voice-agent loop: speech input, fast transcription, intent classification, guarded tool use, and conversational memory in one local interface.",
        githubLink: "https://github.com/yranjan06/ai-voice-assistant"
    },

    "webghosting-mcp": {
        overview: "A Go-based MCP server that wraps Playwright so AI agents can browse live websites, inspect page state, manage tabs, extract data, and operate through a voice-controlled wrapper.",
        problemStatement: "LLMs cannot reliably use dynamic websites from text alone. Real browser automation needs DOM perception, tab state, page actions, extraction tools, and anti-brittleness patterns exposed through a controlled agent interface.",
        architecture: `
            <h4>Browser Agent Flow</h4>
            <ol>
                <li><strong>MCP client:</strong> An AI agent calls browser tools through the Model Context Protocol</li>
                <li><strong>Go server:</strong> The MCP server validates the requested action and routes it to a browser tool</li>
                <li><strong>Playwright layer:</strong> Browser pages, tabs, selectors, screenshots, and extraction tasks run in Chromium</li>
                <li><strong>Stealth layer:</strong> Browser context is hardened with scripts that reduce obvious automation signals</li>
                <li><strong>Result:</strong> The server returns structured DOM data, page state, extracted JSON, or action status</li>
            </ol>
        `,
        technologies: [
            { name: "Go", purpose: "Fast MCP server and tool routing" },
            { name: "Playwright", purpose: "Browser automation, page actions, screenshots, and selectors" },
            { name: "MCP", purpose: "Tool protocol used by AI agents" },
            { name: "Sarvam Voice", purpose: "Voice wrapper for controlling browser actions" },
            { name: "Stealth Scripts", purpose: "Browser-context adjustments for less brittle automation" },
            { name: "JSON Extraction", purpose: "Structured outputs from live web pages" }
        ],
        keyFeatures: [
            "34 MCP tools exposed to AI agents",
            "22 stealth scripts for browser-context hardening",
            "Multi-tab browser management",
            "DOM perception and structured extraction",
            "Voice-controlled browsing wrapper",
            "3-tier execution model for safer automation"
        ],
        implementation: `
            <h3>Step 1: Start an MCP Server</h3>
            <p>The server exposes browser capabilities as named tools. Each tool has a narrow schema so the agent must send structured input instead of arbitrary browser code.</p>
            <pre><code>type ToolRequest struct {
    Name string         \`json:"name"\`
    Args map[string]any \`json:"args"\`
}

func dispatchTool(req ToolRequest) (any, error) {
    switch req.Name {
    case "browser_navigate":
        return browser.Navigate(req.Args)
    case "browser_extract_json":
        return browser.ExtractJSON(req.Args)
    default:
        return nil, fmt.Errorf("unknown tool: %s", req.Name)
    }
}</code></pre>

            <h3>Step 2: Wrap Playwright Actions</h3>
            <p>Navigation, clicking, typing, screenshots, and DOM reads are wrapped as separate actions. This makes the browser controllable by an LLM while keeping the execution layer testable.</p>
            <pre><code>func (b *Browser) Navigate(args map[string]any) (PageState, error) {
    url := args["url"].(string)
    page := b.ActivePage()
    if _, err := page.Goto(url); err != nil {
        return PageState{}, err
    }
    return b.ReadState(page)
}</code></pre>

            <h3>Step 3: Return Page State</h3>
            <p>After every action, the server returns enough page context for the agent to decide the next step: URL, title, visible text, interactive elements, and any structured extraction result.</p>

            <h3>Step 4: Add Stealth and Tab Management</h3>
            <p>The browser context applies stealth scripts at startup and tracks tabs explicitly. The agent can open, switch, close, and inspect tabs without losing state between actions.</p>

            <h3>Step 5: Add Voice Control</h3>
            <p>The Sarvam voice wrapper turns spoken commands into tool requests. The same MCP tools remain the source of truth, so voice and text control share one execution path.</p>
        `,
        results: "The project turns browser automation into an agent-ready tool layer with structured perception, multi-tab control, extraction, and voice-driven operation.",
        githubLink: "https://github.com/yranjan06/WEBGhosting-MCP"
    }
};

export function getProjectDetails(projectId) {
    return projectDetails[projectId] || null;
}

export function getAllProjectIds() {
    return Object.keys(projectDetails);
}

export default projectDetails;
