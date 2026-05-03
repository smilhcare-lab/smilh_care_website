import json
import logging
import requests
from flask import Blueprint, request, jsonify, Response, stream_with_context
from app.services.rag_service import get_retriever

logger = logging.getLogger(__name__)

chat_bp = Blueprint('chat', __name__)

LLAMA_URL = "http://host.docker.internal:8000/v1/chat/completions"

SYSTEM_PROMPT = """Tu es l'assistant virtuel de Smilh Care, une agence spécialisée dans les services à domicile en Tunisie.
Réponds UNIQUEMENT en français naturel et professionnel.
Utilise uniquement les informations du contexte fourni pour répondre.
Sois chaleureux, empathique et professionnel — tu représentes une agence de soins à domicile.
Si la réponse n'est pas dans le contexte, dis poliment que tu ne peux pas répondre à cette question
et propose de contacter l'équipe directement via le formulaire de contact.
Ne fais jamais semblant d'avoir des informations que tu n'as pas.
Garde tes réponses concises (3-5 phrases maximum sauf si une explication détaillée est nécessaire)."""


@chat_bp.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json(silent=True)
    if not data or 'message' not in data:
        return jsonify({'error': 'Message requis'}), 400

    user_message = data['message'].strip()
    if not user_message:
        return jsonify({'error': 'Message vide'}), 400

    try:
        retriever = get_retriever()
        docs = retriever.invoke(user_message)
        context = "\n".join([d.page_content for d in docs]) if docs else ""
    except Exception as e:
        logger.error(f"RAG retrieval error: {e}")
        docs = []
        context = ""

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {
            "role": "user",
            "content": f"Contexte:\n{context}\n\nQuestion: {user_message}" if context else f"Question: {user_message}"
        }
    ]

    def generate():
        try:
            resp = requests.post(
                LLAMA_URL,
                json={
                    "model": "gemma-2b.gguf",
                    "messages": messages,
                    "max_tokens": 400,
                    "temperature": 0.2,
                    "stream": True
                },
                stream=True,
                timeout=30
            )

            for line in resp.iter_lines():
                if line:
                    decoded = line.decode("utf-8")
                    if decoded.startswith("data: ") and decoded != "data: [DONE]":
                        try:
                            chunk = json.loads(decoded[6:])
                            token = chunk["choices"][0]["delta"].get("content", "")
                            if token:
                                yield f"data: {json.dumps({'token': token})}\n\n"
                        except (json.JSONDecodeError, KeyError):
                            pass

            yield f"data: {json.dumps({'done': True, 'sources': len(docs)})}\n\n"

        except requests.exceptions.ConnectionError:
            yield f"data: {json.dumps({'error': 'Le serveur IA est momentanément indisponible.'})}\n\n"
        except requests.exceptions.Timeout:
            yield f"data: {json.dumps({'error': 'La requête a pris trop de temps. Veuillez réessayer.'})}\n\n"
        except Exception as e:
            logger.error(f"Streaming error: {e}")
            yield f"data: {json.dumps({'error': 'Une erreur est survenue. Veuillez réessayer.'})}\n\n"

    return Response(
        stream_with_context(generate()),
        mimetype='text/event-stream',
        headers={
            'Cache-Control': 'no-cache',
            'X-Accel-Buffering': 'no',
        }
    )


@chat_bp.route('/api/chat/health', methods=['GET'])
def chat_health():
    try:
        resp = requests.get("http://host.docker.internal:8000/health", timeout=3)
        llama_ok = resp.status_code == 200
    except Exception:
        llama_ok = False
    return jsonify({'llama_server': llama_ok, 'rag': True}), 200
