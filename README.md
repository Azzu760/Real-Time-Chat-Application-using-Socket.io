# Real-Time Chat Application

A real-time chat application built with **React + Vite** for the frontend, **Node.js & Express** for the backend, and **Socket.IO** for real-time messaging. The app uses **MongoDB** as the database.

## Features

- Real-time messaging with **Socket.IO**
- User authentication (Sign up & Login)
- Online status indicators
- Notifications for new messages
- Profile management
- Responsive UI with **TailwindCSS**
- Secure JWT authentication

## Project Structure

```
chat-app/
├── client/    # Frontend (React + Vite)
├── server/    # Backend (Node.js + Express)
└── socket/    # WebSocket server (Socket.IO)
```

## Tech Stack

### Frontend (client/)

- **React + Vite**
- **TailwindCSS** for styling
- **React Router** for navigation

### Backend (server/)

- **Node.js & Express**
- **MongoDB + Mongoose**
- **JWT** for authentication

### WebSocket (socket/)

- **Socket.IO** for real-time chat

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or later)
- **MongoDB**
- **Vite CLI** (for React frontend)

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/chat-app.git
cd chat-app
```

### 2. Setup Backend

```sh
cd server
npm install
npm start  # Runs on PORT 5000
```

### 3. Setup WebSocket Server

```sh
cd ../socket
npm install
npm start  # Runs on PORT 5001
```

### 4. Setup Frontend

```sh
cd ../client
npm install
npm run dev  # Runs on PORT 5173
```

## Environment Variables

Create a **.env** file in the `server/` and `client/` directories and add the necessary environment variables.

#### Server (.env)

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

#### Client (.env)

```
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5001
```

## Usage

1. Register/Login to the chat app.
2. Start a conversation with other users.
3. Get real-time notifications for new messages.
4. Customize your profile and settings.

## Deployment

To deploy the application, consider using:

- **Frontend**: Vercel, Netlify
- **Backend**: Heroku, Render
- **Database**: MongoDB Atlas

## License

MIT License

## Contributors

- **Your Name** (@yourusername)

Feel free to contribute by submitting pull requests! 🚀

