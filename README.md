# Professional Node.js Backend

A scalable, production-ready Node.js backend project structure built with Express, Sequelize, MySQL, and JWT.

## Features

- **Express.js** API framework
- **Sequelize ORM** for MySQL database management
- **Authentication & Authorization** using JWT
- **Global Error Handling** middleware
- **Global Success Response** middleware
- **Modular Folder Structure** following the Controller-Service-Model pattern
- **Async Error Wrapper** to avoid try/catch hell
- Environment variable configuration using `dotenv`

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MySQL Server

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and configure your database credentials and JWT secret.
   ```bash
   cp .env.example .env
   ```
4. Create the MySQL database that matches your `DB_NAME` in `.env`.

### Running the App

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Health Check
- `GET /api/v1/health`

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login

### Users (Protected)
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/profile` - Get current user profile

## Architecture

```
Client -> Route -> Auth/Validation Middleware -> Controller -> Service -> Model -> Database -> Global Success/Error Response
```
