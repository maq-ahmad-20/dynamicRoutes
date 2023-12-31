


const Sequelize = require('sequelize');

const sequalise = require('../util/database');


const Cart = sequalise.define('cart', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})

module.exports = Cart;