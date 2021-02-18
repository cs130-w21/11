const express = require('express');
const jwt = require('jsonwebtoken');
const sequelize = require('../../../utils/sequelize/index');
const cors = require('cors');

MainAuthRouter = express.Router();

MainAuthRouter.all('*', cors());

const signingSecret = process.env.JWT_SECRET || 'superSecretString';

MainAuthRouter.post("/signup", async (req, res) => {
    const [username, email, password] = req.body
    console.log(req.body)


    // use client side validation and send non-empty username/email/password to backend
    if (password.length < 8) {
        return res.json({
            message: 'Invalid password. Must have at least 8 characters.'
        })
    }


    let token = jwt.sign({ username, email }, signingSecret, { expiresIn: "10 days" });



    const user = sequelize.models.user



    try {
        await user.create(req.body)
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


    res.setHeader("Access-Control-Allow-Origin", '*')
    res.status(200).json({
        message: 'Signup successful',
        username,
        email,
        password,
        token
    })
});

MainAuthRouter.post('/signin', async (req, res) => {

    const [username, password] = req.body


    const user = sequelize.models.user

    try {
        await user.get(req.body)
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


    res.setHeader("Access-Control-Allow-Origin", '*')
    res.status(200).json({
        message: 'Signin successful',
    })

});

module.exports = MainAuthRouter;