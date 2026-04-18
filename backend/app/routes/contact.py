import logging
from flask import Blueprint, request, jsonify
from app.services.database import insert_contact
from app.services.email import send_contact_email

logger = logging.getLogger(__name__)

contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/contact', methods=['POST'])
def contact():
    """
    Endpoint to receive and validate contact form data.
    Inserts into Supabase and sends an email notification.
    """
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Données manquantes.'}), 400

    # Validation
    required = ['name', 'phone', 'service', 'message']
    for field in required:
        if not data.get(field):
            return jsonify({'error': f'Le champ {field} est requis.'}), 400

    # Build clean record
    record = {
        'name': data['name'].strip(),
        'phone': data['phone'].strip(),
        'email': data.get('email', '').strip(),
        'service': data['service'],
        'message': data['message'].strip(),
    }

    # 1. Insert form submission into contacts table
    try:
        insert_contact(record)
    except Exception as e:
        logger.error(f"Database insertion failed: {str(e)}")
        return jsonify({'error': 'Erreur lors de l\'enregistrement de votre demande.', 'detail': str(e)}), 500

    # 2. Send email notification to client on new submission
    try:
        send_contact_email(record)
    except Exception as e:
        # Don't block user if email fails — log it
        logger.error(f"Email notification failed: {str(e)}")

    return jsonify({'message': 'Demande reçue avec succès. Notre équipe vous contactera sous 24h.'}), 200
