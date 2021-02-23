const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('game', {
        sport: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        location: {
            allowNull: false,
            type: DataTypes.GEOMETRY('Point')
        },
        time: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        max_group_size: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        skill_level: {
            allowNull: false,
            type: DataTypes.INTEGER,
            validate: { min: 1, max: 10 }
        },
        comments: {
            type: DataTypes.STRING
        }
    })
}