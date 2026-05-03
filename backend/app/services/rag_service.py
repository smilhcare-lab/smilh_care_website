import os
import logging
from dotenv import load_dotenv
from langchain_cohere import CohereEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import FAISS

load_dotenv()
logger = logging.getLogger(__name__)

_retriever = None


def get_retriever():
    global _retriever
    if _retriever is not None:
        return _retriever

    api_key = os.getenv("COHERE_API_KEY")
    data_path = os.getenv("RAG_DATA_PATH", "rag/data.txt")

    embedding = CohereEmbeddings(
        model="embed-multilingual-v3.0",
        cohere_api_key=api_key
    )

    splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=20)
    loader = TextLoader(data_path, encoding="utf-8")
    doc = loader.load()
    chunks = splitter.split_documents(doc)
    logger.info(f"RAG: Loaded {len(chunks)} chunks from {data_path}")

    vector = FAISS.from_documents(chunks, embedding)
    _retriever = vector.as_retriever(search_kwargs={"k": 3})
    logger.info("RAG: FAISS vector store ready")

    return _retriever
