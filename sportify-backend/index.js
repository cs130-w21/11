const express = require("express");
const path = require("path");
const pg = require('pg')

const app = express();
const port = process.env.PORT || "8000";

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.status(200).send("Welcome to Sportify");
});

const { Sequelize } = require('sequelize')
// db_url = process.env.DB_CONNNECTION_URL || 'postgres://ahkzddesngriuf:e8ec8427f0f51ce1503d59b00f00ed228ecc33945bd9b1b50f5d0a7035bac42d@ec2-50-19-247-157.compute-1.amazonaws.com:5432/d5vvatptuuuv2b'

const sequelize = new Sequelize('d5vvatptuuuv2b', 'ahkzddesngriuf', 'e8ec8427f0f51ce1503d59b00f00ed228ecc33945bd9b1b50f5d0a7035bac42d', {
    host: 'ec2-50-19-247-157.compute-1.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

async function run() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

run().catch(error => console.log(error.stack));

const modelDefiners = [
    require('./models/user'),
    require('./models/game')
]

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}