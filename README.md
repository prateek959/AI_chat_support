# AI Chat Support

An AI-powered customer support chatbot for e-commerce websites, built with a React frontend and Node.js backend using Google's Gemini AI.

## Features

- Real-time chat interface with AI support agent
- Session-based conversation history
- E-commerce focused responses (orders, payments, refunds, delivery, etc.)
- Responsive design with Tailwind CSS
- Persistent chat sessions using localStorage

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose for data storage
- **Google Gemini AI** for intelligent responses
- **CORS** for cross-origin requests

### Frontend
- **React** with Vite for fast development
- **Tailwind CSS** for styling
- **ESLint** for code linting

## Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- Google Gemini API key

## Installation

1. **Clone the repository:**
   ```bash
   git clone [<repository-url>](https://github.com/prateek959/AI_chat_support)
   cd ai-chat-support
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory:
   ```
   PORT=3003
   MONGODB_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   ```

## Usage

1. **Start the Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   The server will run on `http://localhost:3003`

2. **Start the Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

3. Open your browser and navigate to the frontend URL to start chatting with the AI support agent.

## Live Demo

- **Frontend:** [https://comforting-tapioca-860aa8.netlify.app/](https://comforting-tapioca-860aa8.netlify.app/)
- **Backend API:** [https://ai-chat-support-k9wf.onrender.com](https://ai-chat-support-k9wf.onrender.com)

## API Endpoints

### POST /chat/message
Send a user message and receive an AI response.

**Request Body:**
```json
{
  "sessionId": "string",
  "message": "string"
}
```

**Response:**
```json
{
  "reply": "string",
  "sessionId": "string"
}
```

### POST /chat/history
Retrieve chat history for a session.

**Request Body:**
```json
{
  "sessionId": "string"
}
```

**Response:**
```json
{
  "data": [
    {
      "sender": "user",
      "text": "string"
    },
    {
      "sender": "ai",
      "text": "string"
    }
  ]
}
```

## Project Structure

```
ai-chat-support/
├── backend/
│   ├── connection/
│   │   └── db.connect.js
│   ├── controller/
│   │   └── message.controller.js
│   ├── middleware/
│   │   └── error.middleware.js
│   ├── model/
│   │   └── message.schema.js
│   ├── routes/
│   │   └── message.route.js
│   ├── service/
│   │   └── gemini.service.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   │   └── Chat.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.</content>
<parameter name="filePath">c:\Users\Prate\OneDrive\Desktop\my project\SPUR\AI_chat_support\README.md
