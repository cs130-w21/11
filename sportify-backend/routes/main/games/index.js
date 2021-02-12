const express = require('express');
const sequelize =  require('../../../utils/sequelize/index');
MainGamesRouter = express.Router();

// Get filtered games from db
MainGamesRouter.get('/getGames', async (req, res) => {
    const game = sequelize.models.game; 
    try {
        const sport = req.query.sport;
        const location = req.query.location;
        const max_group_size = req.query.max_group_size;
        const skill_level = req.query.skill_level;
        var options = {where: {}};
        if(sport) {
            options.where.sport = sport;
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

// Create a new game posting
MainGamesRouter.post('/createGame', async (req, res) => {
    const game = sequelize.models.game; 
    try {
        const Game = await game.create(req.body);
        return res.status(200).json({Game});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// Update a game posting
MainGamesRouter.put('/updateGame/:id', async (req, res) => {
    const game = sequelize.models.game; 
    try {
        const id = req.params.id;
        const [rowsUpdated, [Game]] = await game.update(req.body, {returning: true, where: {id:id}});
        return res.status(200).json({Game});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// Delete a game posting by id
MainGamesRouter.post('/deleteGame/:id', async (req, res) => {
    const game = sequelize.models.game;
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