const Sequelize =  require('sequelize');

function SetUpDB() {

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
        }
    });

    //Check if connection was successful
    async function run() {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
    run().catch(error => console.log(error.stack));

    //Define models 
    const modelDefiners = [
        require('../../models/user'),
        require('../../models/game')
    ]
    for (const modelDefiner of modelDefiners) {
        modelDefiner(sequelize);
    }

    //Define Associations:
    const {game, user} = sequelize.models;
    game.belongsToMany(user, {through: 'userGames'})

    //Creates Tables in DB if they don't exist
    sequelize.sync()
    return sequelize
}

module.exports =  SetUpDB;