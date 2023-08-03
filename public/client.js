const socket = io();

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

// login details
const loginSection = document.getElementsByClassName('section-login');
const inputName = document.getElementById('input');
const btnLogin = document.getElementById('btn-login')

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}
form.addEventListener('submit',(e)=>{
// to avoid page reloading
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = ''
})
// Ask new user for his mame and let server know
btnLogin.addEventListener('click',(e)=>{
    const bro = true;
    const name = inputName.value;
    // loginSection.classList.add(hide); 
    console.log(name)
    socket.emit('new-user-joined', name);
    inputName.value = '' 

});
// socket ko emit karo ek event 'new-user-joined' k name se
// const name = prompt('enter name');
// console.log(name)

// socket.emit('new-user-joined', name);

// if new user joined
socket.on('user-joined', name =>{
    append(`${name} joined the chat`,'right');
});

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`,'left');
});

socket.on('left', name =>{
    append(`${name} left the chat`, 'right')
});