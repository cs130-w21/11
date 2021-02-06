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
        age: {
            type: DataTypes.INTEGER
        },
        sport: {
            type: DataTypes.INTEGER
        },
        about_me: {
            type: DataTypes.STRING
        }
    })
}