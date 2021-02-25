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
            type: DataTypes.GEOMETRY('Point')
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
        sports: {
            type: DataTypes.ARRAY(DataTypes.INTEGER)
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