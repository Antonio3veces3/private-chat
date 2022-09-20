const express = require('express');
require('dotenv').config();

const cors = require('cors');
const socketController = require('../sockets/controllers');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app)
        this.io = require('socket.io')(this.server)
        this.paths = {}
        
        this.middleware();
        this.routes();

        // eventos socket.io
        this.sockets();
    }

    async connectDB() {
        await dbConnection();
    }

    middleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
        
    }

    routes() {
       
        this.app.use((req, res) => {
            res.status(404).send({
                "error": "Page not found"
            })
        })
    }

    sockets(){
        this.io.on('connection', socketController);
    }

    listener() {
        this.server.listen(this.port, () => {
            console.log('Listening on ', this.port);
        })
    }
}

module.exports = Server;