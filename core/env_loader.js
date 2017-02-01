'use strict';

const path = require('path');
const envPath = path.join(__dirname, '../config/gladius_config/.env');
const required_env = require('../config/required_env.json');
class EnvLoader {

  constructor() {
    this._initLogger();
  }

  _initLogger() {
    this.logger = require('./logger');
  }

  _loadFromDotEnv() {
    require('dotenv').config({
      path: envPath,
      silent: true
    });
  }

  _validateRequiredVars() {
    let isValid = true;
    required_env.forEach((envField) => {
      if (!process.env[envField]) {
        this.logger.warn(`Missing required env variable: ${envField}`);
        isValid = false;
      }
    });
    return isValid;
  }

  load() {
    this._loadFromDotEnv();
    return this._validateRequiredVars();
  }
}

module.exports = new EnvLoader();
