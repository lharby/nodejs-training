const Sequielize = require('sequelize');

const sequelize = require('../utils/database');

const Cart = sequelize.define('cart', {
    id: {
        type: Sequielize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Cart;