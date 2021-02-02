const express = require('express');
const sequelize =  require('../../../utils/sequelize/index');
MainGamesRouter = express.Router();

// Get all games in db
MainGamesRouter.get('/getGames', async (req, res) => {
    const game = sequelize.models.game; 
    try {
        game.findAll().then(game => res.json(game));
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