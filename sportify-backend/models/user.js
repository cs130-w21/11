const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('user', {
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                // We require usernames to have length of at least 3, and
                // only use letters, numbers and underscores.
                is: /^\w{3,}$/
            }
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        location: {
            type: DataTypes.GEOGRAPHY('Point', 4326) // srid for degrees
        },
        age: {
            type: DataTypes.INTEGER
        },
        gender: {
            type: DataTypes.STRING,
            validate: { isIn: {
                    args: [['M', 'F', 'O']],
                    msg: "Must be male, female, or other"
                }
            }
        },
        sport: {
            type: DataTypes.INTEGER
        },
        skill_level: {
            type: DataTypes.INTEGER,
            validate: { min: 1, max: 10 }
        },
        about_me: {
            type: DataTypes.STRING
        }
    })
}