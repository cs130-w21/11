const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('game', {
        sport: {
            type: DataTypes.INTEGER
        },
        location: {
            type: DataTypes.STRING
        },
        max_group_size: {
            type: DataTypes.INTEGER
        },
        skill_level: {
            type: DataTypes.INTEGER
        },
        comments: {
            type: DataTypes.STRING
        }
    })
}