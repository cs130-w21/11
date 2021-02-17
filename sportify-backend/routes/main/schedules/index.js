const express = require('express');
const sequelize =  require('../../../utils/sequelize/index');
const Op = sequelize.Op;
MainSchedulesRouter = express.Router();

// Get a user's schedule for a particular week
MainSchedulesRouter.get('./getSchedule', async(req, res) => {
    const schedule = sequelize.models.schedule; 
    try {
        const start_date = req.query.start_date;
        const userId = req.query.userId;
        var options = {where: {}};

        const location = req.query.location;
        const max_group_size = req.query.max_group_size;
        const skill_level = req.query.skill_level;
        
        // Not too sure about this right now...
        // start_date should be between start_date from request and start_date + 7 days 
        if(start_date) {
            options.where.date = {
                [Op.between]: [start_date, new Date(start_date.getTime() + 7 * 24 * 60 * 60 * 1000)]
            }
        }

        // TODO: Modify this to use geometry and filter by a radius
        if(location) {
            options.where.location = location;
        }
        if(max_group_size) {
            options.where.max_group_size = max_group_size;
        }
        if(skill_level) {
            options.where.skill_level = skill_level;
        }
        game.findAll(options).then(game => res.json(game));
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

