import logging
import resend
from app.config import Config

logger = logging.getLogger(__name__)

if Config.RESEND_API_KEY:
    resend.api_key = Config.RESEND_API_KEY


def send_contact_email(form_data: dict):
    """
    Sends two emails:
    1. Notification to the business (existing behavior)
    2. Confirmation to the client (new)
    """
    if not Config.RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not configured. Skipping email.")
        return None

    client_name = form_data.get('name', 'Client')
    client_email = form_data.get('email', '')
    client_phone = form_data.get('phone', 'N/A')
    client_service = form_data.get('service', 'N/A')
    client_message = form_data.get('message', 'N/A')

    business_params = {
        "from": f"Smile Care <{Config.EMAIL_FROM}>",
        "to": Config.EMAIL_TO,
        "subject": f"Nouvelle demande de contact — {client_name}",
        "html": f"""
        <div style="font-family:sans-serif;color:#1B2F7E;max-width:600px;border:1px solid #eee;padding:20px;border-radius:12px;">
            <h2 style="color:#E8194B;margin-top:0;">Nouvelle demande de contact Smile Care</h2>
            <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
            <p><strong>Nom:</strong> {client_name}</p>
            <p><strong>Téléphone:</strong> {client_phone}</p>
            <p><strong>Email:</strong> {client_email if client_email else 'Non fourni'}</p>
            <p><strong>Service:</strong> {client_service}</p>
            <div style="background:#f9f9f9;padding:15px;border-radius:8px;margin-top:10px;border-left:4px solid #E8194B;">
                <strong>Message:</strong>
                <p style="white-space:pre-wrap;margin-top:5px;">{client_message}</p>
            </div>
            <p style="font-size:12px;color:#999;margin-top:20px;">
                Envoyé automatiquement depuis smilhcare.com
            </p>
        </div>
        """
    }

    confirmation_params = None
    if client_email:
        confirmation_params = {
            "from": f"Smile Care <{Config.EMAIL_FROM}>",
            "to": client_email,
            "subject": "✅ Votre demande a bien été reçue — Smile Care",
            "html": f"""
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
                <div style="background:#1B2F7E;padding:32px 24px;border-radius:12px 12px 0 0;text-align:center;">
                    <h1 style="color:white;margin:0;font-size:22px;font-weight:600;">Smile Care</h1>
                    <p style="color:rgba(255,255,255,0.7);margin:6px 0 0;font-size:14px;">Votre bien-être à domicile, notre priorité</p>
                </div>
                <div style="background:#ffffff;padding:32px 24px;border:1px solid #eee;border-top:none;">
                    <h2 style="color:#1B2F7E;margin-top:0;font-size:20px;">Bonjour {client_name} 👋</h2>
                    <p style="color:#444;line-height:1.7;">
                        Nous avons bien reçu votre demande concernant le service
                        <strong style="color:#E8194B;">{client_service}</strong>.
                    </p>
                    <p style="color:#444;line-height:1.7;">
                        Notre équipe vous recontactera <strong>dans les 24 heures</strong> au numéro
                        <strong>{client_phone}</strong> pour discuter de votre accompagnement.
                    </p>
                    <div style="background:#f9f9f9;border-left:4px solid #1B2F7E;padding:16px 20px;border-radius:0 8px 8px 0;margin:24px 0;">
                        <p style="margin:0 0 6px;font-size:13px;color:#888;text-transform:uppercase;letter-spacing:0.05em;">Récapitulatif</p>
                        <p style="margin:4px 0;font-size:14px;color:#333;"><strong>Service :</strong> {client_service}</p>
                        <p style="margin:4px 0;font-size:14px;color:#333;"><strong>Message :</strong> {client_message}</p>
                    </div>
                    <div style="background:#fff0f3;border:1px solid #ffd0da;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
                        <p style="margin:0;font-size:14px;color:#c4103a;">
                            🎁 <strong>Offre de bienvenue :</strong> Profitez de <strong>-10% sur votre première prestation</strong> en tant que nouveau client.
                        </p>
                    </div>
                    <p style="color:#444;line-height:1.7;">
                        À très bientôt,<br/>
                        <strong style="color:#1B2F7E;">L'équipe Smile Care</strong>
                    </p>
                </div>
                <div style="background:#f5f5f5;padding:16px 24px;border-radius:0 0 12px 12px;text-align:center;border:1px solid #eee;border-top:none;">
                    <p style="margin:0;font-size:12px;color:#999;">
                        Smile Care — Services à domicile · Disponible 7j/7<br/>
                        Cet email a été envoyé suite à votre demande sur smilhcare.com
                    </p>
                </div>
            </div>
            """
        }

    try:
        logger.info(f"Sending business notification for {client_name}")
        r1 = resend.Emails.send(business_params)

        r2 = None
        if confirmation_params:
            logger.info(f"Sending confirmation to client: {client_email}")
            r2 = resend.Emails.send(confirmation_params)
        else:
            logger.info("No client email provided — skipping confirmation.")

        return {"business": r1, "client": r2}

    except Exception as e:
        logger.error(f"Resend Error: {str(e)}")
        return None
