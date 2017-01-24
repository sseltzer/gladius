"use strict";
const keystone = require('keystone');
require('dotenv').config({path: '/home/node/dev/gladius/webapp/.env'});

console.log(process.env.MONGO_URI);

const config = {
  'name': 'gladius',
  'port': 3010,
  'ssl port' : 3011,
  'brand': 'gladius',

  'sass': 'public',
  'static': 'public',
  //'favicon': 'public/favicon.ico',
  'views': 'templates/views',
  'view engine': 'pug',

  //'emails': 'templates/emails',
  'mongo' : "mongodb://172.17.0.1:27017/keystone",
  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret' : 'f3fa080653d4f718e43cd6479c0c530d319287198156273659489feb61e66f25ab6c34c7dd1ee29338cbad456c83da06e99759a4e814',
};

class KeystoneServer {
  constructor() {
    this._initLogger();
  }

  _initLogger() {
    keystone.init(config);
    keystone.set('cloudinary config', 'cloudinary://853846188952542:n0QZtu7ZqHGj9xVqEyKWHvyd5VM@dswx8ayf7' );

    keystone.import('models');
    keystone.set('locals', {
      _: require('lodash'),
      env: keystone.get('env'),
      utils: keystone.utils,
      editable: keystone.content.editable,
    });

    keystone.set('routes', require('./routes'));
/*
    keystone.set('email locals', {
      logo_src: '/images/logo-email.gif',
      logo_width: 194,
      logo_height: 76,
      theme: {
        email_bg: '#f9f9f9',
        link_color: '#2697de',
        buttons: {
          color: '#fff',
          background_color: '#2697de',
          border_color: '#1a7cb7',
        },
      },
    });

    keystone.set('email tests', require('./routes/emails'));
*/
    keystone.set('nav', {
      posts: ['posts', 'post-categories'],
      galleries: 'galleries',
      enquiries: 'enquiries',
      users: 'users',
    });

  }

  start() {
    keystone.start();
  }
}
module.exports = new KeystoneServer();

