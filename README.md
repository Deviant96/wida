# Invoice Management System

This is an Invoice Management System built using React.js for the frontend, Node.js and Express for the backend, and MySQL as the database. The application allows you to create, view, and manage invoices.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Environment Variables](#environment-variables)

## Prerequisites

- Node.js (>=14.x)
- npm or yarn
- MySQL

## Installation

### Backend

1. Clone the repository:

    ```bash
    git clone https://github.com/Deviant96/wida.git
    cd wida/backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

  3. Set up the database:
      - Create a MySQL database for development and testing.
      - Update the .env.development and .env.test files with your database credentials.

### Frontend

1. Navigate to the frontend directory:

    ```bash
    cd ../frontend
    ```
2. Install dependencies:

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

## Running the Application
### Backend

1. Start the backend server:

    ```bash
    npm run dev
    ```

    or

    ```bash
    yarn dev
    ```

    The server will start on http://localhost:5000.

### Frontend

1. Start the frontend development server:

    ```bash
    npm run dev
    ```

    or

    ```bash
    yarn dev
    ```

    The frontend will start on http://localhost:3000.

## Testing
### Backend

1. Ensure your test database is set up and the .env.test file is configured.

2. Run the tests:

    ```bash
    npm test
    ```

    or

    ```bash
    yarn test
    ```

## Environment Variables
### Backend

Create a .env.development file in the backend directory with the following variables:

```makefile
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
```

Create a .env.test file in the backend directory with the following variables:

```makefile
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_test_database_name
```

### Frontend
 \-
