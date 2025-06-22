# Expenso – Personal Expense Tracker

Expenso is a full-stack expense tracking application that allows users to manage and analyze their personal spending. The project integrates a Django backend with a React frontend, delivering a seamless and interactive user experience from a single server endpoint.



## Features

- Custom Django APIs with clean data validation and query optimization
- User authentication with session-based login
- Expense creation, deletion, editing, and bulk operations
- Dashboard showing weekly, monthly, and yearly spending insights
- Responsive UI with inline editing and sorting



## Tech Stack

**Backend**: Django  
**Frontend**: React  
**Database**: SQLite (easily swappable with PostgreSQL)  
**Others**: Axios 



## Project Structure
```
expenso/
├── backend/ # Django project
│ ├── models.py # Expense model
│ ├── views.py # Custom API logic
│ ├── serializers.py # Validation and transformation
│ ├── urls.py # Routes configuration
│ └── static/ # Built React frontend (npm run build)
├── frontend/ # React project source
│ ├── components/ # Expense components
│ └── services/ # Axios client
└── README.md
```

## How It Works
- React frontend is built and served via Django’s static files handling.

- All HTTP requests go through the Django server, including page rendering and API interaction.

- Session-based authentication ensures secure login and logout.

- Expenses are dynamically loaded, modified, or deleted through custom backend logic.

- Aggregated data is computed server-side and displayed in the frontend dashboard.



