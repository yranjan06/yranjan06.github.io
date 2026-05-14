import json

files = ["src/assets/locales/en.json", "src/assets/locales/de.json", "src/assets/locales/bh.json"]

for file in files:
    with open(file, "r") as f:
        data = json.load(f)
    
    if "projects" in data and isinstance(data["projects"], dict) and "realtime-booking-cdc" in data["projects"]:
        data["projects"]["rag-assistant"] = {
            "name": "RAG Assistant: Document Intelligence System",
            "description": "Production-style RAG system that ingests PDFs, stores embeddings in ChromaDB, retrieves context with Vector + BM25 search, and answers through Groq Llama 3.3."
        }
        with open(file, "w") as f:
            json.dump(data, f, indent=4, ensure_ascii=False)

