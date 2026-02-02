const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 8000});
const clients = new Map();

console.log("The server is running on http://localhost:8000");
wss.on("connection", (socket) => {
    console.log("New Connection!");

    socket.on("message", (data) => {
        const msg = JSON.parse(data.toString());

        if(msg.type === "register"){
            clients.set(socket, msg.username);
            clients.forEach((username, clientSocket) => {
                clientSocket.send(JSON.stringify({
                    type: "users",
                    users: [...clients.values()]
                }))
            })
        }

        if(msg.type === "message"){
            for(let [clientSocket, username] of clients.entries()){
                if(msg.to === username){
                    clientSocket.send(JSON.stringify({
                        type: "message",
                        from: clients.get(socket),
                        text: msg.text
                    }))
                }
            }
        }


    })
})

wss.on("close", () => {
    clients.delete(clients.get(socket));
    console.log("Disconnected! ",clients.get(socket));
})