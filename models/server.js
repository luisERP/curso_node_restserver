const express = require('express');
const cors = require('cors');
const usersRouter = require('../routes/users.routes');

class Server {


    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // MIDDLEWARES
        this.middlewares();

        // ROUTES
        this.routes();
    }
    middlewares(){
        
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // STATICFILES
        this.app.use( express.static('public') );
    }

    routes(){

        this.app.use(this.usersPath, require('../routes/users.routes'));

    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Server listenin on http://localhost:${this.port}`);
        })
    }

}


module.exports = Server;