const { Sequelize } = require('sequelize');

//Create new DB Connection
const sequelize = new Sequelize('d5vvatptuuuv2b', 'ahkzddesngriuf', 'e8ec8427f0f51ce1503d59b00f00ed228ecc33945bd9b1b50f5d0a7035bac42d', {
    host: 'ec2-50-19-247-157.compute-1.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
});

//Define models 
const modelDefiners = [
    require('../../models/user'),
    require('../../models/game'),
    require('../../models/schedule')
]
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

//Define Associations:
const { game, user, schedule } = sequelize.models;
game.belongsToMany(user, { through: 'userGames' })
schedule.belongsTo(game)
schedule.belongsTo(user)

module.exports = sequelize;