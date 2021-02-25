const MainRouter = require('express').Router();

// Put route handlers here
MainRouter.use('/user', require('./user'));
MainRouter.use('/games', require('./games'));
MainRouter.use('/schedules', require('./schedules'));

module.exports = MainRouter;