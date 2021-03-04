const express = require('express');
const Sequelize = require('sequelize');
const { models } = require('../../../utils/sequelize/index');
const sequelize =  require('../../../utils/sequelize/index');
MainGamesRouter = express.Router();
const game = sequelize.models.game; 

// Get filtered games from db
MainGamesRouter.get('/getGames', async (req, res) => {
    try {
        const sports = req.query.sports;
        const max_group_size = req.query.max_group_size;
        const skill_levels = req.query.skill_levels;
        const weeksAhead = req.query.weeksAhead;
        const radius = req.query.radius;
        const userLng = req.query.userLng;
        const userLat = req.query.userLat;
        var options = {where: {}, include:[{
            model: sequelize.models.user, as: 'users', required:false, attributes:{exclude:['password']}
        }]}

        if(sports) {
            options.where.sport = sports;
        }
        // TODO: Grab user latitude and longitude
        if(radius && userLat && userLng) {
            const radiusInMeters = radius*1609.34; // convert miles to meters
            options.where = Sequelize.where(
                Sequelize.fn(
                    'ST_DWithin',
                    Sequelize.col('game.location'), 
                    Sequelize.fn(
                        'ST_MakePoint', 
                        userLng, 
                        userLat),  
                    radiusInMeters), 
                true);
        }
        if(weeksAhead) {
            var now = new Date();
            var weeksLater = new Date();
            weeksLater.setDate(weeksLater.getDate() + weeksAhead*7);
            options.where.time = {[Sequelize.Op.gt]: now, [Sequelize.Op.lt]: weeksLater}; 
        }
        if(max_group_size) {
            options.where.max_group_size = {[Sequelize.Op.lt]: max_group_size};
        }
        if(skill_levels) {
            options.where.skill_level = skill_levels;
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
        const user_id = req.body['user'];

        gameReq = {
            sport: req.body['sport'],
            location: point,
            time: datetime,
            max_group_size: req.body['max_group_size'],
            skill_level: req.body['skill_level'],
            comments: req.body['comments'],
            users: user_id
        }
        const Game = await game.create(gameReq);

        const user = await models.user.findOne({
            where: {
                id:user_id
            },
        })
        // console.log(Game);
        // console.log("===")
        // console.log(user);
        if(!user){
            res.status(400).send(err.message);
        }
        user_games_info = {
            userId:user_id,
            gameId: Game.getDataValue('id'),
            name: user.getDataValue('username')
        }
        // console.log("===")
        // console.log(user_games_info)
        // console.log("===")
        const usr_gm = await models.userGames.create(user_games_info);
        // console.log(usr_gm)
        return res.status(200).json({Game, usr_gm});
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
        
        gameReq = {}
        if (req.body['sport']) {
            gameReq.sport = req.body['sport'];
        }
        if (req.body['skill_level']) {
            gameReq.skill_level = req.body['skill_level'];
        }
        if (req.body['max_group_size']) {
            gameReq.max_group_size = req.body['max_group_size'];
        }
        if (lat && lng) {
            gameReq.location = point;
        }
        if (dateString) {
            gameReq.time = datetime;
        }
        if (req.body['comments']) {
            gameReq.comments = req.body['comments'];
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