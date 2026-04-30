import logging
from supabase import create_client, Client
from app.config import Config

logger = logging.getLogger(__name__)

_supabase_client: Client = None

def get_supabase_client() -> Client:
    global _supabase_client
    if _supabase_client is None:
        if not Config.SUPABASE_URL or not Config.SUPABASE_KEY:
            raise ValueError("Supabase URL and Key must be configured.")
        _supabase_client = create_client(Config.SUPABASE_URL, Config.SUPABASE_KEY)
    return _supabase_client

def insert_contact(data: dict):
    """
    Inserts a contact record into the Supabase 'contacts' table.
    """
    try:
        client = get_supabase_client()
        
        # Ensure phone is saved as text to prevent database overflow errors
        if 'phone' in data:
            data['phone'] = str(data['phone'])
            
        response = client.table("contacts").insert(data).execute()
        
        # Supabase-py response has 'data' and 'count'
        if not response.data:
            logger.error(f"Failed to insert contact: {response}")
            raise Exception("Database insertion failed: No data returned.")
            
        return response.data
    except Exception as e:
        logger.error(f"Supabase Error: {str(e)}")
        raise e
