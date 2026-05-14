with open("src/app/consts/projectDetails.js", "r") as f:
    text = f.read()

replacement = """    "rag-assistant": {
        overview: "A RAG system from first principles where users can upload PDFs and ask questions using hybrid search (Vector + BM25) and Groq Llama 3.3.",
        problemStatement: "Context windows have limits. A 500-page manual will not fit. Every new conversation starts fresh, requiring re-upload. If data is sensitive, you cannot send it to OpenAI or Anthropic at all. RAG solves this by building the system over your documents on your infrastructure.",
        architecture: `
            <h4>Data Flow</h4>
            <ol>
                <li><strong>Ingestion (upload time):</strong> PDF → Loader → Chunker → Embedder → ChromaDB</li>
                <li><strong>Query (question time):</strong> Question → FastAPI → Hybrid Search → Prompt Builder → Groq LLM → Answer</li>
            </ol>
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

            <h3>Step 3: Chunking (<code>ingestion/chunker.py</code>)</h3>
            <p><strong>Problem:</strong> You cannot dump an entire document into an LLM. Context windows are limited. And even if they were not, LLMs lose focus on large inputs.</p>
            <pre><code>from langchain_text_splitters import RecursiveCharacterTextSplitter

def chunk_recursive(docs, chunk_size=512, overlap=50):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=overlap,
        separators=["\\n\\n", "\\n", ". ", " ", ""],
    )
    return splitter.split_documents(docs)</code></pre>

            <h3>Step 4: Embeddings (<code>ingestion/embedder.py</code>)</h3>
            <p><strong>Problem:</strong> ChromaDB stores vectors, not text. You need to convert chunks into vectors before storing.</p>
            <pre><code>from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from core.config import EMBEDDING_MODEL

def get_embedding_model():
    return FastEmbedEmbeddings(model_name=EMBEDDING_MODEL)</code></pre>

            <h3>Step 5: Vector Store (<code>ingestion/vectorstore.py</code>)</h3>
            <p><strong>Problem:</strong> You need to store vectors persistently and query them later.</p>
            <pre><code>from langchain_community.vectorstores import Chroma
from core.config import CHROMA_DIR

def create_vectorstore(chunks, embedding_model):
    return Chroma.from_documents(
        documents=chunks,
        embedding=embedding_model,
        persist_directory=str(CHROMA_DIR),
        collection_name="rag_docs",
    )</code></pre>

            <h3>Step 6: Retrieval (<code>retrieval/</code>)</h3>
            <p><strong>Hybrid Search (Vector + BM25):</strong> BM25 is a keyword search algorithm. It finds exact matches. Vector misses "RAG-7", BM25 catches it.</p>
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

    # Normalize both to 0-1 and apply Weighted fusion
    combined = alpha * v_norm + (1 - alpha) * bm25_norm
    # ... returns results</code></pre>

            <h3>Step 7: Generation (<code>generation/</code>)</h3>
            <pre><code>import time
from groq import Groq
from core.config import GROQ_API_KEY, GROQ_MODEL

def generate_answer(prompt):
    client = Groq(api_key=GROQ_API_KEY)
    response = client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[
            {"role": "system", "content": "You are a precise document assistant."},
            {"role": "user", "content": prompt},
        ],
        temperature=0.1,
        max_tokens=1024,
    )
    return response.choices[0].message.content</code></pre>

            <h3>Step 8 & 9: API and Frontend</h3>
            <p>The backend routes ingest PDFs with FastAPI, dropping them into Chroma. A Streamlit frontend displays a clean chat where users can toggle between Hybrid and Pure Vector search and adjust top_k chunk thresholds.</p>

            <h3>Step 10: Evaluation (<code>evaluation/ragas_eval.py</code>)</h3>
            <p>RAGAS evaluates three core principles: Faithfulness, Answer Relevancy, and Context Precision. We established that Hybrid + Semantic evaluation measurably reduces hallucination vs Fixed chunking.</p>
        `,
        results: "Hybrid + semantic chunking measurably reduces hallucination. The system achieves 0.89 Faithfulness, 0.85 Answer Relevancy, and 0.88 Context Precision.",
        githubLink: "https://github.com/yranjan06/rag-assistant"
    },
"""

text = text.replace("const projectDetails = {", "const projectDetails = {\n" + replacement)
with open("src/app/consts/projectDetails.js", "w") as f:
    f.write(text)
