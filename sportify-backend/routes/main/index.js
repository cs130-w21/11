const MainRouter = require('express').Router();

// Put route handlers here
MainRouter.use('/auth', require('./auth'));
MainRouter.use('/games', require('./games'));

module.exports = MainRouter;