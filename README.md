# KAZATest API

This is a Express.js-based REST API for user authentication and management. It includes features for user signup, login, and authentication using JSON Web Tokens (JWT).

## Features

- **User Signup**: Create a new user with email, username, fullname, and password.
- **User Login**: Authenticate a user and return a JWT token.
- **Authentication Middleware**: Protect routes using JWT-based authentication.

---

## Prerequisites

- **Node.js**: Ensure you have Node.js installed (v20.x or higher).
- **PostgreSQL**: A PostgreSQL database is required for storing user data.
- **Docker**: (Recommended) Use Docker for containerized test.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aouniR/kazatest.git
   cd KAZATest
   npm install && npm start
   ```

2. For containerized test:
    ```bash
    docker-compose up --build
    ```
