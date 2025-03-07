# GraphQL Course

## Description

This project is a full-stack application that demonstrates the use of GraphQL with a React frontend and a Node.js backend. It is structured using workspaces to manage both the server and client applications efficiently.

## Project Structure

- **server**: Contains the backend application built with Node.js and Express, utilizing GraphQL for API management.
- **client**: Contains the frontend application built with React, using Apollo Client for state management and GraphQL queries.

## Technologies Used

- **Backend**: Node.js, Express, GraphQL, MongoDB, Apollo Server
- **Frontend**: React, Apollo Client, Vite
- **Development Tools**: TypeScript, ESLint, Prettier, Concurrently

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/noman-nawaz-dev/graphql-course.git
   cd graphql-course
   ```

2. Install dependencies for both server and client:

   ```bash
   npm install
   ```

3. Clean and install fresh dependencies (optional):
   ```bash
   npm run install:clean
   ```

## Usage

To run the development server for both the backend and frontend, use:

```bash
npm run dev
```

To build the project for production, run:

```bash
npm run build
```

To start the production server, use:

```bash
npm run start
```

## Scripts

- **dev**: Runs the development server for both server and client.
- **build**: Builds the project for production.
- **start**: Starts the production server.
- **clean**: Cleans the build artifacts.
- **lint**: Runs ESLint to check for code quality issues.
