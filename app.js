const Server = require('./models/server');

require('dotenv').config();

const server = require('./models/server');

const app = new Server();

app.listen();