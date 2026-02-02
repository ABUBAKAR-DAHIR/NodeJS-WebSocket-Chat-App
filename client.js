const WebSocket = require('ws');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const socket = new WebSocket("http://localhost:8000");
let username = ""
let friends = [];
let inChat = false

socket.on("open", () => {
    rl.question("Enter your name: ", (name) => {
        username = name;
        socket.send(JSON.stringify({
            type: "register",
            username
        }))
    })
})

socket.on("message", (data) => {
    const msg = JSON.parse(data.toString());

    if(msg.type === "users"){
        showUsers(msg)
        if(friends.length === 0) {
            console.log("No connected Users\n")
            return
        }
        if(!inChat) room()
    }

    if(msg.type === "message"){
        console.log(`\n${msg.from}: ${msg.text}`);
    }
})

function showUsers(msg){
    friends = []
    let count = 0;
    console.log(`Connected Users: `);
    msg.users.forEach(user => {
        if(user != username){
            console.log(`${++count}: ${user}`)
            friends.push(user)
        }
    });
}

function room(){
    inChat = true
    rl.question("Select a friend to chat with: ", (friendNum) => {
        const friendName = friends[friendNum-1]
        if(!friendName) {
            console.log("Invalid Friend selected, please select a friend again!\n");
            inChat = false
            return
        }
        console.log(`\n\nChatting with ---${friendName}---\n\n`);
        console.log("type 'done!!!' to exit the chat room.\n ");
        
        chat(friendName)
    })
}

function chat(friend){
    rl.question("You: ", (message) => {
        if(message === "done!!!") {
            console.log("Chat room ended!\n");
            inChat = false
            return;
        }
        socket.send(JSON.stringify({
            type: "message",
            to: friend,
            text: message
        }))
        chat(friend)
    })
}

// mongodb+srv://abu112abu112abu112_db_user:PjtRSsagt9m9ShEy@cluster0.fume3jw.mongodb.net/