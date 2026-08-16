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

All APIs use the `POST` method.

### Health Check
- `POST /api/v1/health`

### Authentication
- `POST /api/v1/auth/register` - Register a new admin
- `POST /api/v1/auth/login` - Login admin

### Admins (Protected)
- `POST /api/v1/admins/get-all` - Get all admins
- `POST /api/v1/admins/get-profile` - Get current admin profile

### Customers (Protected)
- `POST /api/v1/customers/create` - Create a new customer
- `POST /api/v1/customers/get-all` - Get all customers
- `POST /api/v1/customers/get/:id` - Get a customer by ID
- `POST /api/v1/customers/update/:id` - Update a customer
- `POST /api/v1/customers/delete/:id` - Delete a customer

### Products (Protected)
- `POST /api/v1/products/create` - Create a new product (supports multipart/form-data for images)
- `POST /api/v1/products/get-all` - Get all products
- `POST /api/v1/products/get/:id` - Get a product by ID
- `POST /api/v1/products/update/:id` - Update a product (supports multipart/form-data for images)
- `POST /api/v1/products/delete/:id` - Delete a product

### Contact Us
- `POST /api/v1/contact-us/create` - Submit a contact request (Public)
- `POST /api/v1/contact-us/get-all` - Get all submissions (Protected)
- `POST /api/v1/contact-us/get/:id` - Get submission by ID (Protected)
- `POST /api/v1/contact-us/update-status/:id` - Update submission status (Protected)
- `POST /api/v1/contact-us/delete/:id` - Delete a submission (Protected)

### Testimonials
- `POST /api/v1/testimonials/create` - Submit a testimonial (Public)
- `POST /api/v1/testimonials/get-all` - Get all testimonials (Protected)
- `POST /api/v1/testimonials/get/:id` - Get testimonial by ID (Protected)
- `POST /api/v1/testimonials/update-status/:id` - Update testimonial status (Protected)
- `POST /api/v1/testimonials/delete/:id` - Delete a testimonial (Protected)

## Architecture

```
Client -> Route -> Auth/Validation Middleware -> Controller -> Service -> Model -> Database -> Global Success/Error Response
```
