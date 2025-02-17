# Backend - Fullstack Ecommece Javascirpt

This is a backend application built using **Node.js** and **Express**. It includes authentication features (login and register) and CRUD operations for managing categories.

## Technologies Used:

- Node.js
- Express.js
- MongoDB (for database)
- JWT (JSON Web Token) for authentication
- Mongoose (ODM for MongoDB)

## Features:

- **Authentication**: Login and Register users with JWT.
- **CRUD Categories**: Add, retrieve, update, and delete categories.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/agungkusaeri9/Be-fullstack-ecommerce-js.git backend
   ```
2. **Install Depedencies**:

   ```bash
   cd backend
   npm install
   ```

3. **Setup your environment in .env**:

   ```bash
   PORT=3001
   DB_SERVER=127.0.0.1:27017
   DB_NAME=fullstack_ecommerce_js
   JWT_SECRET=glFaQlQp8CPjQyk0MwO34/zpPZeJvvICYSIAJYyhLxo=
   JWT_EXPIRES_IN=1h
   ```

4. **Run the application**:
   ```bash
   npm run dev
   ```

The app will run on http://localhost:3001
