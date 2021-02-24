const express = require('express');
const jwt = require('jsonwebtoken');
const sequelize = require('../../../utils/sequelize/index');
const bcrypt = require('bcrypt');
const cors = require('cors')

MainAuthRouter = express.Router();
MainAuthRouter.all('*', cors());

const signingSecret = process.env.JWT_SECRET || 'superSecretString';
const User = sequelize.models.user

MainAuthRouter.post("/signup", async (req, res) => {
    const {username, email, password} = req.body
    console.log(username, email, password)

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
        await User.create(req.body)
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

    return res.status(200).json({
        message: 'Signup successful',
        username,
        email,
        token
    })
});

MainAuthRouter.post('/signin', async (req, res) => {

    const { username, password } = req.body
    let token
    try {
        const user = await User.findOne({ where: { username: username } })
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
        username,
        token
    })
});

MainAuthRouter.get('/getUsers', async (req, res) => {
    // console.log('here')
    const user = sequelize.models.user; 
    try {
        const username = req.query.username;
        const email = req.query.email;
        const age = req.query.age;
        const sports = req.query.sports
        const skill_level = req.query.skill_level
        const gender = req.query.gender
        const location = req.query.location
        var options = {where: {}, attributes:{excludes:[]}};
        if(username) {
            options.where.username = username;
        }
        if(email) {
            options.where.email = email;
        }
        if(age) {
            options.where.age = age;
        }
        if(sports) {
            options.where.sports = sports;
        }
        if(skill_level) {
            options.where.skill_level = skill_level;
        }
        if(gender) {
            options.where.gender = gender;
        }
        if(location) {
            options.where.location = location;
        }
        //{attributes:{exclude:['password']}}, 
        options.attributes.exclude = ['password'];
        // console.log(options);
        user.findAll(options).then(user => res.json(user));
        
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = MainAuthRouter;