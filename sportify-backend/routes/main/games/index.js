const express = require('express');
const Sequelize = require('sequelize');
const sequelize =  require('../../../utils/sequelize/index');
MainGamesRouter = express.Router();
const game = sequelize.models.game; 

// Get filtered games from db
MainGamesRouter.get('/getGames', async (req, res) => {
    try {
        const sport = req.query.sport;
        const max_group_size = req.query.max_group_size;
        const skill_level = req.query.skill_level;
        const weeksAhead = req.query.weeksAhead;
        var options = {where: {}};
        if(sport) {
            options.where.sport = sport;
        }
        // TODO: Add filter by a radius
        if(weeksAhead) {
            var now = new Date();
            var weeksLater = new Date();
            weeksLater.setDate(weeksLater.getDate() + weeksAhead*7);
            options.where.time = {[Sequelize.Op.gt]: now, [Sequelize.Op.lt]: weeksLater}; 
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

// Create a new game posting
MainGamesRouter.post('/createGame', async (req, res) => {
    try {
        const lng = req.body['longitude'];
        const lat = req.body['latitude'];
        const dateString = req.body['dateString'];
        const datetime = new Date(dateString);
        const point = {type: 'Point', coordinates: [lng,lat]};
        
        gameReq = {
            sport: req.body['sport'],
            location: point,
            time: datetime,
            max_group_size: req.body['max_group_size'],
            skill_level: req.body['skill_level'],
            comments: req.body['comments']
        }
        const Game = await game.create(gameReq);
        return res.status(200).json({Game});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// Update a game posting
MainGamesRouter.put('/updateGame/:id', async (req, res) => { 
    try {
        const lng = req.body['longitude'];
        const lat = req.body['latitude'];
        const dateString = req.body['dateString'];
        const datetime = new Date(dateString);
        const point = {type: 'Point', coordinates: [lng,lat]};
        
        gameReq = {
            sport: req.body['sport'],
            location: point,
            time: datetime,
            max_group_size: req.body['max_group_size'],
            skill_level: req.body['skill_level'],
            comments: req.body['comments']
        }
        const id = req.params.id;
        const [rowsUpdated, [Game]] = await game.update(gameReq, {returning: true, where: {id:id}});
        return res.status(200).json({Game});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// Delete a game posting by id
MainGamesRouter.post('/deleteGame/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await game.destroy({
            where: {id: id}
        });
        if (deleted) {
            return res.status(200).send("Game deleted");
        }
        throw new Error("Game not found");
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = MainGamesRouter;