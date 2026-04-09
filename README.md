# smilh_care_website
#project structure
smilh-care/
├── backend/                # Python-based Backend
│   ├── app/
│   │   ├── routes/         # API Endpoints (Chat, Contact, etc.)
│   │   ├── services/       # Business logic (RAG, Supabase, Email)
│   │   ├── utils/          # Helper functions
│   │   ├── config.py       # Configuration management
│   │   └── main.py         # Application entry point
│   ├── rag/
│   │   └── knowledge_base/ # Documents and data for RAG
│   ├── tests/              # Backend test suites
│   ├── .env.example        # Template for environment variables
│   ├── Dockerfile          # Backend containerization
│   └── requirements.txt    # Python dependencies
├── frontend/               # React (Vite) Frontend
│   ├── public/             # Static assets
│   ├── src/                # Source code
│   │   ├── assets/         # Images and styles
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Frontend entry point
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
├── nginx/                  # Web server configuration
│   └── nginx.conf          # Nginx reverse proxy setup
├── docker-compose.yml      # Production deployment configuration
├── docker-compose.dev.yml  # Development environment configuration
└── README.md               # Project documentation
