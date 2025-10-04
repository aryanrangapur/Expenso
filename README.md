# Expenso - Smart Expense Tracker

A modern, full-stack expense tracking application built with **Next.js 15** and **Django REST Framework**.

![Expenso Dashboard](https://img.shields.io/badge/Expenso-Smart%20Expense%20Tracker-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Django](https://img.shields.io/badge/Django-REST%20Framework-green)

## Features

-  **Dashboard Analytics** - Visualize spending with interactive charts
-  **Expense Management** - Add, edit, and track expenses
-  **Responsive Design** - Works perfectly on all devices  
-  **Category Tracking** - Organize expenses by categories
-  **Secure Authentication** - Token-based user authentication
-  **Monthly Reports** - View spending trends over time

## Live Demo

- **Frontend**: [https://expenso-gray.vercel.app](https://expenso-gray.vercel.app)
- **Backend API**: [https://expenso-jxyq.onrender.com/api](https://expenso-jxyq.onrender.com/api)

## Tech Stack

**Frontend:**
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS + shadcn/ui
- Recharts for data visualization
- Axios for API calls

**Backend:**
- Django REST Framework
- SQLite Database
- Token Authentication
- CORS enabled

##  Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- Git

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/expenso.git
cd expenso
```

2. **Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

4. **Open your browser**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api

##  Deployment

This project is deployed using:
- **Frontend**: Vercel
- **Backend**: Render

##  Project Structure

```
expenso/
├── frontend/          # Next.js 15 application
├── backend/           # Django REST API
└── README.md
```

##  Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

##  License

MIT License - feel free to use this project for personal or commercial purposes.

---

**Built with  by Aryan Rangapur**

*Start tracking your expenses smarter today!* 🚀