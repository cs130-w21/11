const express = require('express');
const sequelize =  require('../../../utils/sequelize/index');
const Op = sequelize.Sequelize.Op;
MainScheduleRouter = express.Router();

// Get a user's schedule
MainScheduleRouter.get('/getSchedule', async(req, res) => {
    const schedule = sequelize.models.schedule;
    try {
        const userId = req.query.id;
        schedule.findAll({ where: {userId: userId} }).then(schedule => res.json(schedule));
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// Create a user's schedule
MainScheduleRouter.post('/createSchedule', async(req, res) => {
    const schedule = sequelize.models.schedule; 
    try {
        const userId = req.body.id;
        const monday = req.body.monday;
        const tuesday = req.body.tuesday;
        const wednesday = req.body.wednesday;
        const thursday = req.body.thursday;
        const friday = req.body.friday;
        const saturday = req.body.saturday;
        const sunday = req.body.sunday;

        const Schedule = await schedule.create({
            userId: userId,
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            saturday: saturday,
            sunday: sunday
        });
        return res.status(200).json({Schedule});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// Update a user's schedule
MainScheduleRouter.put('/updateSchedule/:id', async(req, res) => {
    const schedule = sequelize.models.schedule; 
    try {
        const userId = req.params.id;
        const monday = req.body.monday;
        const tuesday = req.body.tuesday;
        const wednesday = req.body.wednesday;
        const thursday = req.body.thursday;
        const friday = req.body.friday;
        const saturday = req.body.saturday;
        const sunday = req.body.sunday;

        scheduleUpdate = {}
        if (monday) {
            scheduleUpdate.monday = monday;
        }
        if (tuesday) {
            scheduleUpdate.tuesday = tuesday;
        }
        if (wednesday) {
            scheduleUpdate.wednesday = wednesday;
        }
        if (thursday) {
            scheduleUpdate.thursday = thursday;
        }
        if (friday) {
            scheduleUpdate.friday = friday;
        }
        if (saturday) {
            scheduleUpdate.saturday = saturday;
        }
        if (sunday) {
            scheduleUpdate.sunday = sunday;
        }

        const [rowsUpdated, [Schedule]] = await schedule.update(scheduleUpdate, {returning: true, where: {userId: userId}});
        return res.status(200).json({Schedule});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = MainScheduleRouter;
