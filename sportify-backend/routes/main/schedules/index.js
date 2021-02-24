const express = require('express');
const sequelize =  require('../../../utils/sequelize/index');
const Op = sequelize.Sequelize.Op;
MainSchedulesRouter = express.Router();

// Get a user's schedule for a particular week
MainSchedulesRouter.get('/getSchedule', async(req, res) => {
    const schedule = sequelize.models.schedule;
    const user = sequelize.models.user; 
    try {
        const start_date_arr = req.query.start_date.split("-");
        const userId = req.query.userId;
        const start_date = new Date(start_date_arr[0], start_date_arr[1], start_date_arr[2])
        var options = {where: {}};

        // start_date of the schedule event should be between start_date from request and start_date + 7 days 
        if(start_date) {
            options.where.start_date = {
                [Op.between]: [start_date, new Date(start_date.getTime() + 7 * 24 * 60 * 60 * 1000)]
            }
        }
        if(userId) {
            options.where.userId = userId; 
        }
        
        schedule.findAll(options).then(schedule => res.json(schedule));
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// Create an event in the user's schedule
MainSchedulesRouter.post('/createSchedule/:username', async(req, res) => {
    const schedule = sequelize.models.schedule; 
    const user = sequelize.models.user;
    const game = sequelize.models.game;
    try {
        const start_date_arr = req.body.start_date.split("-");
        const end_date_arr = req.body.end_date.split("-");
        const username = req.params.username;
        const type = req.body.type;
        const gameId = req.body.gameId;

        const Schedule = await schedule.create({
            start_date: new Date(start_date_arr[0], start_date_arr[1], start_date_arr[2], start_date_arr[3], start_date_arr[4]), 
            end_date: new Date(end_date_arr[0], end_date_arr[1], end_date_arr[2], end_date_arr[3], end_date_arr[4]),
            type: type
        });

        const User = await user.findOne({ where: { username: username } });
        Schedule.setUser(User);
        if(type == "game" && gameId) {
            const Game = await game.findOne({ where: {id: gameId} });
            Schedule.setGame(Game);
        }

        return res.status(200).json({Schedule});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = MainSchedulesRouter;
