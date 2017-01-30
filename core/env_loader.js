"use strict";

const path = require('path');
const envPath = path.join(__dirname, '../config/gladius_config/.env');

class EnvLoader {

  constructor() {
    this._initLogger();
  }

  _initLogger() {
    this.logger = require('./logger');
  }

  _loadFromDotEnv() {
    require('dotenv').config({path: envPath, silent: true});
    return false;
  }

  _loadFromEnvVars() {
    return false;
  }

  load() {
    return this._loadFromDotEnv() || this._loadFromEnvVars() || false;
  }
}

module.exports = new EnvLoader();
