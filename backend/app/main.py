import logging
from flask import Flask, jsonify
from flask_cors import CORS
from app.config import Config

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    from app.routes.contact import contact_bp
    from app.routes.chat import chat_bp
    app.register_blueprint(contact_bp)
    app.register_blueprint(chat_bp)

    @app.route('/health')
    def health():
        return jsonify({'status': 'ok', 'message': 'Smilh Care Backend is running.'}), 200

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({'error': 'Not Found'}), 404

    @app.errorhandler(500)
    def server_error(e):
        return jsonify({'error': 'Internal Server Error'}), 500

    return app


app = create_app()

if __name__ == '__main__':
    try:
        Config.validate()
        logger.info("Configuration validated successfully.")
    except ValueError as e:
        logger.error(f"Configuration error: {e}")

    app.run(host='0.0.0.0', port=5000, debug=Config.DEBUG)
