const Sequielize = require('sequelize');

const sequelize = require('../utils/database');

const CartItem = sequelize.define('cartItem', {
    id: {
        type: Sequielize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequielize.INTEGER
});

module.exports = CartItem;