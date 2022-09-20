const socketController = (socket) =>{
    console.log('Cliente conectado: ', socket.id);
    socket.on('disconnect', ()=>{
    });

    socket.on('send-msg', (payload, callback)=>{
        const id = '123456'
        callback({id, fecha: new Date().getTime()});
        socket.broadcast.emit('send-msg', payload)
    });
}

module.exports = socketController;