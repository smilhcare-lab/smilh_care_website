# 🏥 Smilh-Care

> An intelligent healthcare assistant platform powered by RAG (Retrieval-Augmented Generation), built with a Python backend and React frontend — fully containerized for seamless deployment.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running with Docker](#running-with-docker)
- [Contributing](#contributing)

---

## 🌟 Overview

**Smilh-Care** is a full-stack healthcare web application featuring:

- 🤖 **AI-powered chat** using a RAG pipeline over a custom medical knowledge base
- 📬 **Contact & communication** services integrated with email and Supabase
- ⚡ **Fast, modern UI** built with React + Vite
- 🔒 **Secure & scalable** architecture served through an Nginx reverse proxy
- 🐳 **Fully Dockerized** for both development and production environments

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, Vite, JSX |
| **Backend** | Python, FastAPI |
| **AI / RAG** | LangChain / custom RAG pipeline |
| **Database** | Supabase |
| **Web Server** | Nginx |
| **Containerization** | Docker, Docker Compose |

---

## 📁 Project Structure

```
smilh-care/
├── backend/                        # 🐍 Python-based Backend
│   ├── app/
│   │   ├── routes/                 # API Endpoints (Chat, Contact, etc.)
│   │   ├── services/               # Business logic (RAG, Supabase, Email)
│   │   ├── utils/                  # Helper functions
│   │   ├── config.py               # Configuration management
│   │   └── main.py                 # Application entry point
│   ├── rag/
│   │   └── knowledge_base/         # Documents and data for RAG
│   ├── tests/                      # Backend test suites
│   ├── .env.example                # Template for environment variables
│   ├── Dockerfile                  # Backend containerization
│   └── requirements.txt            # Python dependencies
│
├── frontend/                       # ⚛️  React (Vite) Frontend
│   ├── public/                     # Static assets
│   ├── src/                        # Source code
│   │   ├── assets/                 # Images and styles
│   │   ├── App.jsx                 # Main application component
│   │   └── main.jsx                # Frontend entry point
│   ├── package.json                # Frontend dependencies
│   └── vite.config.js              # Vite configuration
│
├── nginx/                          # 🌐 Web Server Configuration
│   └── nginx.conf                  # Nginx reverse proxy setup
│
├── docker-compose.yml              # 🚀 Production deployment configuration
├── docker-compose.dev.yml          # 🔧 Development environment configuration
└── README.md                       # 📖 Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) `>= 18` *(for local frontend development)*
- [Python](https://www.python.org/) `>= 3.10` *(for local backend development)*

### Clone the Repository

```bash
git clone https://github.com/your-username/smilh-care.git
cd smilh-care
```

---

## 🔐 Environment Variables

Copy the example environment file and fill in your credentials:

```bash
cp backend/.env.example backend/.env
```

| Variable | Description |
|---|---|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_KEY` | Supabase API key |
| `OPENAI_API_KEY` | API key for the AI/LLM provider |
| `EMAIL_HOST` | SMTP host for email service |
| `EMAIL_PORT` | SMTP port |
| `EMAIL_USER` | Sender email address |
| `EMAIL_PASSWORD` | Email account password |

---

## 🐳 Running with Docker

### Production

```bash
docker-compose up --build
```

### Development

```bash
docker-compose -f docker-compose.dev.yml up --build
```

The app will be available at **`http://localhost`** (proxied via Nginx).

---

### Running Locally (Without Docker)

**Backend:**

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Testing

```bash
cd backend
pytest tests/
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  Made with ❤️ by the Smilh-Care Team
</div>
