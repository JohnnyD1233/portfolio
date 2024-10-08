# Express PostgreSQL Item Management

This is a simple Express.js application that manages a list of items using a PostgreSQL database. Users can add, edit, and delete items through a web interface.

## Features

- **Item Management**: Add, edit, and delete items from the list.
- **Database Integration**: Uses PostgreSQL for storing items.
- **Dynamic Rendering**: Renders item lists dynamically using EJS templating.

## Technologies Used

- Node.js
- Express
- PostgreSQL
- EJS (Embedded JavaScript templates)
- Body-parser for handling form submissions

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- PostgreSQL installed and running
- A PostgreSQL database named `World` with a table named `items` that has a column `title`.
