'use strict';

const keystone = require('keystone');
const config = {
  'name': 'gladius',
  'port': process.env.KS_PORT_HTTP,
  'ssl port': process.env.KS_PORT_HTTPS,
  'brand': 'gladius',

  'sass': 'public',
  'static': 'public',
  //'favicon': 'public/favicon.ico',
  'views': 'templates/views',
  'view engine': 'pug',

  //'emails': 'templates/emails',
  'mongo': process.env.CMS_MONGO_URI,
  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': process.env.KS_COOKIE_SECRET
};

class KeystoneServer {
  constructor() {
    this._initLogger();
    this._initKeystone();
  }

  _initLogger() {}

  _initKeystone() {
    keystone.init(config);
    keystone.set('cloudinary config', process.env.KS_CLOUDINARY);

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
