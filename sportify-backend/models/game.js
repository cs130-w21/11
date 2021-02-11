const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('game', {
        sport: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        // TODO: Modify to use coordinates
        location: {
            allowNull: false,
            type: DataTypes.STRING
        },
        max_group_size: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        skill_level: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        comments: {
            type: DataTypes.STRING
        }
    })
}