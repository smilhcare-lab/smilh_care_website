import logging
import resend
from app.config import Config

logger = logging.getLogger(__name__)

# Initialize Resend API Key
if Config.RESEND_API_KEY:
    resend.api_key = Config.RESEND_API_KEY

def send_contact_email(form_data: dict):
    """
    Sends a notification email to the client on new contact form submission.
    """
    if not Config.RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not configured. Skipping email.")
        return None

    # Construct the email parameters
    # Note: 'from' must be 'onboarding@resend.dev' until you verify a domain on Resend
    params = {
        "from": f"Smilh Care <{Config.EMAIL_FROM}>",
        "to": Config.EMAIL_TO,
        "subject": f"Nouvelle demande de contact — {form_data.get('name', 'Inconnu')}",
        "html": f"""
            <div style="font-family: sans-serif; color: #1B2F7E; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 12px;">
                <h2 style="color: #E8194B; margin-top: 0;">Nouvelle demande de contact Smilh Care</h2>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <p><strong>Nom:</strong> {form_data.get('name', 'N/A')}</p>
                <p><strong>Téléphone:</strong> {form_data.get('phone', 'N/A')}</p>
                <p><strong>Email:</strong> {form_data.get('email', 'Non fourni')}</p>
                <p><strong>Service:</strong> {form_data.get('service', 'N/A')}</p>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 10px; border-left: 4px solid #E8194B;">
                    <strong>Message:</strong><br/>
                    <p style="white-space: pre-wrap; margin-top: 5px;">{form_data.get('message', 'N/A')}</p>
                </div>
                <p style="font-size: 12px; color: #999; margin-top: 20px;">
                    Cet email a été envoyé automatiquement depuis le site Smilh Care.
                </p>
            </div>
        """
    }

    try:
        logger.info(f"Sending contact email for {form_data.get('name')}")
        r = resend.Emails.send(params)
        return r
    except Exception as e:
        logger.error(f"Resend Error: {str(e)}")
        # We don't re-raise here to prevent blocking the main request flow
        # but in a production app, you might want to retry or use a task queue
        return None
