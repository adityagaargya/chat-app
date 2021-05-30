const chatForm = document.getElementById('chat-form')
const chatMessage = document.querySelector('.chat-messages');

const socket = io();

socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    //Scroll Down
    chatMessage.scrollTop = chatMessage.scrollHeight;
})

//Message Submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Get message text
    const msg = e.target.elements.msg.value;

    //Emit message to server
    socket.emit('chatMessage', msg)

    // Clear message
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
})


// Outputmessage to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML =  '<p class = "meta">' + message.username +  " " + message.time +  '</p>' +  message.text  
    document.querySelector(".chat-messages").append(div)
}