const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConection } = require('../database/config');

class Server {


    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/auth',
            buscar: '/buscar',
            users: '/api/users',
            uploads: '/api/uploads',
            categorias: '/api/categories',
            productos: '/api/productos'
        }

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
        this.app.use( express.urlencoded( {extended: false}) );

        // Carga de archivos
        this.app.use( fileUpload({ 
            useTempFiles : true, 
            tempFileDir : '/tmp/',
            createParentPath: true
        }) );

        // STATICFILES
        this.app.use( express.static('public') );

    }

    routes(){

        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.buscar, require('../routes/buscar.routes'));
        this.app.use(this.paths.users, require('../routes/users.routes'));
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
        this.app.use(this.paths.categorias, require('../routes/categories.routes'));
        this.app.use(this.paths.productos, require('../routes/productos.routes'));

    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Server listenin on http://localhost:${this.port}`);
        })
    }

}


module.exports = Server;