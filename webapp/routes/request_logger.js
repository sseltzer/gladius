"use strict";

const util = require('util');
const express = require('express');
const router = express.Router();

router.all('/*', (req, res, next) => {
  req.app.locals.logger.info(util.format('REQ GLOBAL - %s %s %s', req.url, JSON.stringify(req.params), JSON.stringify(req.query)));
  next();
});

module.exports = router;
