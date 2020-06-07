var socket = require('socket.io-client');

let client = socket.connect('https://live-up.herokuapp.com/', { reconnection: true });

client.emit('session_start_click', JSON.stringify({ sessionId: '12345678' }))

client.on('session_started', (data)=>{
    console.log(data);  
})