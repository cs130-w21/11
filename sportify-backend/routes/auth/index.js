const express = require('express')
const jwt =  require('jsonwebtoken')
const sequelize =  require('../../utils/sequelize/index')
router = express.Router()

const signingSecret = process.env.JWT_SECRET || 'superSecretString'

router.post("/signup", async (req, res) => {
    const {username, email, password} = req.body

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

    res.status(200).json({
        message: 'Signup successful',
        username,
        email,
        password,
        token
    })

}) 

router.post('/signin', (req, res) => {

    const {username, password} = req.body

    res.status(200).json({
        message: 'Signin successful',
    })

})

module.exports = router