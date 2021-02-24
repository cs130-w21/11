const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('schedule', {
        start_date: {
            allowNull: false,
            type: DataTypes.DATE
        },
        end_date: {
            allowNull: false,
            type: DataTypes.DATE
        },
        // types are "available" and "game"
        type: {
            allowNull: false,
            type: DataTypes.STRING
        }
    })
}