 Telegram Bot for Sports Updates

This is a Telegram bot built with Node.js that provides updates on various sports tournaments, sends reminders for upcoming games, and interacts with users through inline buttons. 

## Features

- **Sports Updates**: Sends scheduled messages about upcoming sports events, including Euro, Copa América, Brazilian Serie A, and MLS.
- **User Interaction**: Allows users to interact via inline keyboard buttons for various functionalities.
- **Scheduled Notifications**: Uses cron jobs to send reminders for upcoming games.
- **Admin Commands**: Provides admins with special commands for managing broadcasts.

## Technologies Used

- Node.js
- Telegram Bot API
- Axios for HTTP requests
- Cron for scheduling tasks
- dotenv for environment variable management

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- A Telegram account
- Your own Telegram Bot Token (created via [BotFather](https://core.telegram.org/bots#botfather))
- RapidAPI credentials for sports data (sign up at [RapidAPI](https://rapidapi.com/))
