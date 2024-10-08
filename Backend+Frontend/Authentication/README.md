# User Authentication System

This application is a user authentication system built with Express.js, allowing users to register, log in, and authenticate using Google. It utilizes PostgreSQL for data storage and bcrypt for password hashing.

## Features

- **User Registration**: Users can register with an email and password.
- **User Login**: Users can log in with their credentials.
- **Google Authentication**: Users can log in using their Google account.
- **Secrets Page**: Only authenticated users can access the secrets page.
- **Session Management**: Utilizes session management to keep users logged in.

## Technologies Used

- Node.js
- Express
- PostgreSQL
- EJS (Embedded JavaScript templates)
- Passport.js for authentication
- bcrypt for password hashing
- dotenv for environment variable management

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- PostgreSQL installed and running
