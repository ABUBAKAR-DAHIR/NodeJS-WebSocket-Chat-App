# 💬 Terminal WebSocket Chat Application

A real-time **terminal-based chat application** built using **Node.js** and **native WebSockets** (no Socket.IO).  
This project demonstrates how real-time communication works using raw WebSockets and a CLI interface.

---

## 💪 Tech Stack

- Node.js
- WebSocket (`ws`)
- readline (built-in Node.js module)
- JavaScript (ES6+)

---

## ✨ Features

- Real-time one-to-one messaging
- Multiple clients via terminal
- Live connected users list
- Username-based identification
- Prevents chatting with yourself
- Dynamic user list updates when new users join
- Simple chat room selection
- Exit chat with `done!!!`
- No frontend, no browser — pure terminal

---

## 📁 Project Structure

```bash

├── server.js
├── client.js
├── .gitignore
└── README.md

```


---

## 🧠 Architecture Overview

- The server uses a `Map<WebSocket, username>` to track connected users
- When a user registers, the server broadcasts the updated user list to all clients
- Messages are routed only to the selected recipient
- The client uses `readline` to simulate a chat UI in the terminal
- Clients can only select other connected users (never themselves)

---

## 🛠️ Setup & Installation

### Prerequisites

- Node.js (v18+ recommended)
- Javascript (ES6)

### Install Dependencies

```bash
npm install ws

(readline is included with Node.js)
```

## ▶️ Running the Application
### Start the WebSocket Server

```bash
node server.js
```

### Start Clients (Open Multiple Terminals)

```bash
node client.js
```

## 💬 How the Chat Works

- User enters a username  
- Server registers the user  
- Server broadcasts all connected users  
- Client selects a user to chat with  
- Messages are exchanged in real time  
- Type `done!!!` to exit the chat room  

---

## ⚠️ Limitations

- No authentication  
- No message history  
- No group chats  
- Terminal-based UI only  

---

## 🌱 Possible Improvements

- Database support (MongoDB)  
- Chat history  
- Group chats  
- Typing indicators  
- Online/offline status  
- Browser-based frontend  

## 👤 Author

Built by **Abubakar Dahir Hassan** 

## 📄 License

MIT License
