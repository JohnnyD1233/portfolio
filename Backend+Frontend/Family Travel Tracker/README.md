# Country Tracker Application

This is an Express.js application that allows users to track countries they have visited. Users can add countries, delete them, and manage their profiles with different colors associated with each user.

## Features

- **User Management**: Create and manage users with unique colors.
- **Country Tracking**: Add countries to a user's visited list, check existing countries, and delete them as needed.
- **Database Interaction**: Store user data and visited countries using PostgreSQL.
- **Dynamic Rendering**: Uses EJS templating to render the main page based on user actions.

## Technologies Used

- Node.js
- Express
- PostgreSQL (with pg module)
- EJS (Embedded JavaScript templates)
- dotenv for environment variable management
- Body-parser for handling form submissions

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- PostgreSQL installed and running
- Create a database named `your_database_name` and set up the following tables:
  ```sql
  CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      color VARCHAR(30) NOT NULL
  );

  CREATE TABLE countries (
      country_code VARCHAR(3) PRIMARY KEY,
      country_name VARCHAR(100) NOT NULL
  );

  CREATE TABLE visited_countries (
      user_id INTEGER REFERENCES users(id),
      country_code VARCHAR(3) REFERENCES countries(country_code),
      PRIMARY KEY (user_id, country_code)
  );