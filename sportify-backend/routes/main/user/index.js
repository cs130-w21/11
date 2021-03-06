const express = require('express');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const sequelize = require('../../../utils/sequelize/index');
const bcrypt = require('bcrypt');
const cors = require('cors');
const user = require('../../../models/user');

MainAuthRouter = express.Router();
MainAuthRouter.all('*', cors());

const signingSecret = process.env.JWT_SECRET || 'superSecretString';
const User = sequelize.models.user

MainAuthRouter.post("/signup", async (req, res) => {
    const {username, email, password} = req.body

    // use client side validation and send non-empty username/email/password to backend
    if (password.length < 8) {
        return res.json({
            message: 'Invalid password. Must have at least 8 characters.'
        })
    }

    console.log("hashing")
    //hash password before storing it
    req.body.password = await bcrypt.hash(password, 10);
    //create jwt token
    let token = jwt.sign({ username, email }, signingSecret, { expiresIn: "10 days" });

    console.log("adding to db")
    //add user to db
    try {
        await User.create(req.body).then(addedUser =>{
            console.log('User', username, 'added successfully!')
            return res.status(200).json({
                message: 'Signup Successful!',
                username: addedUser.username,
                id: addedUser.id,
                token: token
            })
        })
    } catch (err) {
        if (err.message.includes('duplicate') && err.message.includes('username')) {
            return res.json({
                message: 'Username taken. Create a different username.'
            })
        } else if (err.message.includes('duplicate') && err.message.includes('email')) {
            return res.json({
                message: 'Email already in use. Use a different one.'
            })
        }
        return res.json({
            message: err.message
        })
    }
});

MainAuthRouter.post('/signin', async (req, res) => {

    const { username, password } = req.body
    let token
    let user
    try {
        user = await User.findOne({ where: { username: username } })
        let hashedPassword = user.password
        let result = await bcrypt.compare(password, hashedPassword)
        if (!result) {
            res.status(401).json({ message: "Invalid Username or Password" })
        }
        let email = user.email
        token = jwt.sign({ username, email }, signingSecret, { expiresIn: "10 days" });
    }
    catch (err) {
        res.status(401).json({ message: "Invalid Username or Password" })
    }
    return res.status(200).json({
        message: 'Signin successful',
        username: user.username,
        id: user.id,
        token
    })
});

MainAuthRouter.get('/getUsers', async (req, res) => {
    // console.log('here')
    const user = sequelize.models.user; 
    try {
        const currentUser = req.query.currentUser;
        const username = req.query.username;
        const email = req.query.email;
        const age = req.query.age;
        const sport = req.query.sport;
        const skill_levels = req.query.skill_levels;
        const genders = req.query.genders;
        const radius = req.query.radius;
        const userLng = req.query.userLng;
        const userLat = req.query.userLat;
        var options = {where: {}, attributes:{exclude:[]}, include:[{
            model: sequelize.models.game, as: 'games', required:false, attributes: ['id', 'sport', 'comments']}]};
        if(username) {
            options.where.username = username;
        }
        if(currentUser) {
            options.where.username = {[Sequelize.Op.ne]: currentUser};
        }
        if(username && currentUser) {
            options.where.username = {[Sequelize.Op.and]: [{[Sequelize.Op.ne]: currentUser}, {[Sequelize.Op.eq]:username}]};
        }
        if(email) {
            options.where.email = email;
        }
        if(age) {
            options.where.age = {[Sequelize.Op.gte]: age};
        }
        if(sport) {
            options.where.sport = sport;
        }
        if(skill_levels) {
            const minSkillLevel = Math.min(...skill_levels);
            options.where.skill_level = {[Sequelize.Op.gte]: minSkillLevel};
        }
        if(genders) {
            options.where.gender = genders;
        }
        if(radius) {
            var lng = userLng;
            var lat = userLat;
            if(!userLng) {
                lng = -118.4452; // UCLA longitude default
            }
            if(!userLat) {
                lat = 34.0689; // UCLA latitude default
            }
            const radiusInMeters = radius*1609.34; // convert miles to meters
            options.where = Sequelize.where(
                Sequelize.fn(
                    'ST_DWithin',
                    Sequelize.col('user.location'), 
                    Sequelize.fn(
                        'ST_MakePoint', 
                        lng, 
                        lat),  
                    radiusInMeters), 
                true);
        }
        //{attributes:{exclude:['password']}}, 
        options.attributes.exclude = ['password'];
        // console.log(options);
        user.findAll(options).then(user => res.json(user));
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

MainAuthRouter.get('/getUserLocation/:id', async(req, res) => {
    const user = sequelize.models.user;
    const id = req.params.id;
    var options = {where: {id:id}, attributes: ['location']};
    try {
        user.findAll(options).then(user =>  {
            if (user[0] && user[0].location) {
                
                res.json([user[0].location.coordinates[1], user[0].location.coordinates[0]]);
            }
            else {
                res.json(null);
            }
        });
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

MainAuthRouter.get('/getProfile/:id', async(req, res) => {
    const user = sequelize.models.user;
    const id = req.params.id;
    var options = {where: {id:id}, attributes: ['age', 'gender', 'sport', 'skill_level', 'about_me']};
    try {
        let currUser =await user.findOne(options)
        return res.status(200).json(currUser)
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// Get games associated with a specific user
MainAuthRouter.get('/getUsersGames/:id', async (req, res) => {
    // console.log('here')
    const user = sequelize.models.user;
    const user_id=req.params.id
    try {
        var options = {where: {id:user_id}, attributes:{exclude:[]}, include:[{
            model: sequelize.models.game, as: 'games', required:false, attibutes: ['id', 'sport', 'comments']}]};
        options.attributes.exclude = ['password'];
        const currUser = await user.findOne(options);
        // console.log(currUser.getDataValue('games'));
        const usersGames = currUser.getDataValue('games')
        return res.status(200).send(usersGames);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

MainAuthRouter.put('/updateProfile/:id', async (req, res) => {
    const user = sequelize.models.user; 
    try {
        const lng = req.body['longitude'];
        const lat = req.body['latitude'];
        const point = {type: 'Point', coordinates: [lng,lat]};
        
        profileReq = {};
        if (req.body['username']) {
            profileReq.username = req.body['username'];
        }
        if (req.body['email']) {
            profileReq.email = req.body['email'];
        }
        if (req.body['password']) {
            // use client side validation and send non-empty username/email/password to backend
            if (req.body['password'].length < 8) {
                return res.status(500).json({
                message: 'Invalid password. Must have at least 8 characters.'
                });
            }
            console.log("hashing");
            //hash password before storing it
            req.body['password'] = await bcrypt.hash(req.body['password'], 10);
            profileReq.password = req.body['password'];
        }
        if (lat && lng) {
            profileReq.location = point;
        }
        if (req.body['gender']) {
            profileReq.gender = req.body['gender'];
        }
        if (req.body['age']) {
            profileReq.age = req.body['age'];
        }
        if (req.body['skill_level']) {
            profileReq.skill_level = req.body['skill_level'];
        }
        if (req.body['sport']) {
            profileReq.sport = req.body['sport'];
        }
        if (req.body['about_me']) {
            profileReq.about_me = req.body['about_me'];
        }
        const id = req.params.id;
        const [rowsUpdated, [User]] = await user.update(profileReq, {returning: true, where: {id:id}});
        return res.status(200).json({User});
    } catch (err) {
        if (err.message.includes('duplicate') && err.message.includes('username')) {
            return res.status(500).json({
                message: 'Username taken. Create a different username.'
            })
        } else if (err.message.includes('duplicate') && err.message.includes('email')) {
            return res.status(500).json({
                message: 'Email already in use. Use a different one.'
            })
        }
        return res.status(500).send(err.message);
    }
});

module.exports = MainAuthRouter;