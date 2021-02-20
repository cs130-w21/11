const express = require('express');
const jwt =  require('jsonwebtoken');
const sequelize =  require('../../../utils/sequelize/index');
const bcrypt = require('bcrypt');
MainAuthRouter = express.Router();

const signingSecret = process.env.JWT_SECRET || 'superSecretString';
const User = sequelize.models.user

MainAuthRouter.post("/signup", async (req, res) => {
    const {username, email, password} = req.body

    //console.log(req.body)

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

    //const [username, password] = req.body
    const [emailBody, passwordBody] = req.body;

    console.log("Here yah, sign in");
    const user = sequelize.models.user

    /*
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
    */

   const checkResult= await Post.findOne({
      where: {
        email: emailBody,
        password: passwordBody
      }
    });

    if (checkResults!==null)
    {
        res.setHeader("Access-Control-Allow-Origin", '*')
        res.status(200).json({
            message: 'Signin successful',
            email, 
            password
        });
    }
    else
    {
         return res.json({
                message: 'Incorrect combination of email and password!'
            });
    }


    

});

module.exports = MainAuthRouter;