const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {


    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.authPath = '/auth'
        this.usersPath = '/api/users';

        // Conexion a BD
        this.conectarDB();

        // MIDDLEWARES
        this.middlewares();

        // ROUTES
        this.routes();
    }
    
    async conectarDB(){
        await dbConection();
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

        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.usersPath, require('../routes/users.routes'));

    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Server listenin on http://localhost:${this.port}`);
        })
    }

}


module.exports = Server;