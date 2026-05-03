import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Flask
    SECRET_KEY = os.getenv("FLASK_SECRET_KEY", "dev-secret-key")
    DEBUG = os.getenv("FLASK_DEBUG", "False").lower() == "true"
    
    # Supabase
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")
    
    # Resend
    RESEND_API_KEY = os.getenv("RESEND_API_KEY")
    EMAIL_FROM = os.getenv("EMAIL_FROM", "onboarding@resend.dev")
    EMAIL_TO = os.getenv("EMAIL_TO", "smilhcare@gmail.com")
    
    # Ollama
    OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")

    @staticmethod
    def validate():
        required = ["SUPABASE_URL", "SUPABASE_KEY", "RESEND_API_KEY"]
        missing = [var for var in required if not getattr(Config, var)]
        if missing:
            raise ValueError(f"Missing required environment variables: {', '.join(missing)}")
