'use strict';

const apiRoute = require('./apis');
const homeRoute = require('./home');
// const errorRoute = require('./error');

//app.set('view engine', 'ejs')

function init(server) {
  server.get('*', function (req, res, next) {
    console.log('Request was made to: ' + req.originalUrl);
    return next();
  });

  server.get('/', function (req, res) {
    res.redirect('/home');
    //res.render('index')
  });

  server.use('/spacetune', apiRoute);
  // server.use('/error', errorRoute);
}

module.exports = {
  init: init
};