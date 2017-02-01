'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/users', (req, res) => {
  res.json(JSON.parse('{"user": "sseltzer"}'));
});

module.exports = router;
