// HTML elements

let lblOnline  = document.getElementById('lblOnline');
let lblOffline = document.getElementById('lblOffline');
let txtMensaje = document.querySelector('#txtMensaje');
let btnEnviar  = document.querySelector('#btnEnviar');

const socket = io();

socket.on('connect', ()=>{
    lblOffline.style.display = "none";
    lblOnline.style.display = '';    
});

socket.on('disconnect', ()=>{
    lblOffline.style.display = "";
    lblOnline.style.display = 'none';
});

socket.on('send-msg', (payload)=>{
    console.log(payload);
})

btnEnviar.addEventListener('click', ()=>{
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }
    socket.emit('send-msg', payload, (id)=>{
        console.log('Desde el server',id);
    });
});