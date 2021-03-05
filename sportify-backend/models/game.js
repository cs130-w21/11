const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('game', {
        sport: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        location: {
            allowNull: false,
            type: DataTypes.GEOGRAPHY('Point', 4326) //srid for degrees
        },
        time: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        current_group_size: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 1
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
        is_full: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        comments: {
            type: DataTypes.STRING
        }
    })
}