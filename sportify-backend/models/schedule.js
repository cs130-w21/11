const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('schedule', {
        userId: {
            allowNull: false,
            type: DataTypes.STRING
        },
        monday: {
            allowNull: true,
            type: DataTypes.STRING
        },
        tuesday: {
            allowNull: true,
            type: DataTypes.STRING
        },
        wednesday: {
            allowNull: true,
            type: DataTypes.STRING
        },
        thursday: {
            allowNull: true,
            type: DataTypes.STRING
        },
        friday: {
            allowNull: true,
            type: DataTypes.STRING
        },
        saturday: {
            allowNull: true,
            type: DataTypes.STRING
        },
        sunday: {
            allowNull: true,
            type: DataTypes.STRING
        }
    }, {freezeTableName: true})
}