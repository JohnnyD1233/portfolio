 Telegram Multimedia Boutique Shop Bot

This is a Telegram bot built with Node.js designed to send multimedia content, including videos and images, for a boutique shop. It supports user interaction through inline buttons and can schedule messages to multiple chat groups.

## Features

- **Interactive Menu**: Users can choose from a variety of product categories through inline buttons.
- **Multimedia Support**: Sends videos and images with captions to specified chat groups.
- **Scheduled Messages**: Supports scheduling of multimedia messages to be sent at specified times.
- **Admin Controls**: Only specific users can trigger certain commands.

## Technologies Used

- Node.js
- Telegram Bot API
- dotenv for environment variable management
- fluent-ffmpeg for video processing
- cron for scheduling tasks

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- A Telegram account
- Your own Telegram Bot Token (created via [BotFather](https://core.telegram.org/bots#botfather))