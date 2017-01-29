"use strict";
const path = require('path');
let envPath = path.join(__dirname, '../config/gladius_config/.env');
require('dotenv').config({path: envPath});

const port = process.env.APP_PORT_HTTP || 3000;

const server = require('../core/server');

server.start(port);