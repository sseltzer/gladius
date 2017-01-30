"use strict";
const envLoader = require('./env_loader').load();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const keystoneServer = require('../keystone/keystone_server');

class Server {

  constructor() {
    this.initLogger();
    this.initDB();
    this.initViewEngine();
    this.initExpressMiddleware();
    this.initRoutes();
  }

  initLogger() {
    app.locals.logger = require('./logger');
  }

  start(port) {
    app.listen(port, () => app.locals.logger.info('app listening on port ' + port));
    keystoneServer.start();
  }

  initViewEngine() {
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, '../views'));
  }

  initExpressMiddleware() {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
  }

  initDB() {
    mongoose.connect(process.env.APP_MONGO_URI);
  }

  initRoutes() {
    app.use('/', require('../routes/request_logger'));
    app.use('/', require('../routes/index'));
  }
}

module.exports = new Server();
