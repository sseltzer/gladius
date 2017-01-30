"use strict";

const envLoader = require('../core/env_loader').load();

const port = process.env.APP_PORT_HTTP || 3000;

const server = require('../core/server');

server.start(port);
