const Sequelize = require('sequelize')
const sequalise = require('../util/database')

const User = sequalise.define('user', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true

    },

    name: Sequelize.STRING,
    email: Sequelize.STRING
})

module.exports = User;