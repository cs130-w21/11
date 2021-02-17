const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('schedule', {
        start_date: {
            allowNull: false,
            type: DataTypes.DATE
        },
        // start hour of the game/availability
        start_time: {
            allowNull: false,
            type: DataTypes.TIME
        },
        // end hour of the game/availability
        end_time: {
            allowNull: false,
            type: DataTypes.TIME
        },
        // types are "available" and "game"
        type: {
            allowNull: false,
            type: DataTypes.STRING
        }
    })
}