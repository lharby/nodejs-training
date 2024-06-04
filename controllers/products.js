const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
    res.render('add-product', {
        pageTitle: 'Add product',
        path: '/admin/add-product',
        productsCSS: true,
        activeProduct: true
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop', { 
            products: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
};