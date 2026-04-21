<img width="1209" height="1300" alt="image" src="https://github.com/user-attachments/assets/3c7c1faf-3d27-4552-947e-ec758f55f4fb" /><img width="1209" height="1300" alt="image" src="https://github.com/user-attachments/assets/bd6e3670-b114-4a74-9623-53e89ff665a3" />

# Eyra AI 🤖

A full-stack AI-powered web application with authentication, chat features, face analysis, and user history tracking. Built using the **MERN stack** with a modern UI and scalable architecture.

## 📌 Project Overview

Eyra is a full-stack AI assistant platform that allows users to:
- Chat with AI
- Perform face analysis
- Track conversation history
- Manage user profiles
- Explore insights and analytics

It includes a React frontend and a Node.js/Express backend connected to MongoDB.

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Tailwind CSS
- Framer Motion
- i18next
- Recharts
- Axios

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Nodemon

### Tools
- Concurrently
- dotenv

## ✨ Features

### Authentication
- Signup/Login
- JWT-based auth
- Protected routes

### AI Chat System
- AI chat interface
- Saved conversation history
- Persistent sessions

### Face Analysis
- Image upload
- AI processing

### Dashboard & Analytics
- User activity tracking
- History viewing
- Charts and insights

### Multi-language Support
- i18n integration

### Modern UI
- Responsive design
- Framer Motion animations
- Component-based structure

## ⚙️ How It Works

1. User logs in or registers  
2. JWT token is created and stored  
3. Frontend sends requests via Axios  
4. Backend handles API requests  
5. MongoDB stores users, chats, and results  
6. AI responses are returned to frontend  

## 🚀 How to Run Locally

### Clone Repository
git clone https://github.com/JashanjitKaur007/eyra.git
cd eyra

### Install Root Dependencies
npm install

### Backend Setup
cd backend
npm install

Create `.env`:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:
npm run dev

### Frontend Setup
cd frontend
npm install
npm run dev

### Run Both Together
npm run dev

Backend: http://localhost:5000  
Frontend: http://localhost:5173  

## 📁 Project Structure

eyra/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── App.jsx
│
├── package.json
└── README.md

## 📸 Screenshots

Add screenshots here later.

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first.

## 📜 License

MIT License

## 👨‍💻 Author

Jashanjit Kaur  
GitHub: https://github.com/JashanjitKaur007
