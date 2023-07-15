
const Sequelize = require('sequelize');

const sequalise = require('../util/database');


const CartItem = sequalise.define('cartItem', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER
})

module.exports = CartItem;