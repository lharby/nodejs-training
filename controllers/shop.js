const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/product-list', { 
                products: products,
                pageTitle: 'All products',
                path: '/products',
            });
        })
        .catch(err => console.log(err))
};

exports.getProduct = (req, res, next) => {
    const productID = req.params.productID;
    Product.findByPk(productID)
        .then((product) => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            });
        })
        .catch(err => console.log(err));
};

exports.getIndexPage = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/index', { 
                products: products,
                pageTitle: 'Shop',
                path: '/',
            });
        })
        .catch(err => console.log(err))
};

exports.getCart = (req, res, next) => {
    Cart.getProducts(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({productData: product, quantity: cartProductData.quantity});
                }
            }
            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/cart',
                products: cartProducts
            });
        });
    });
};

exports.postCart = (req, res, next) => {
    const productID = req.body.productID;
    Product.findByID(productID, (product) => {
        Cart.addProduct(productID, product.price);
    });
    console.log(productID);
    res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
    const productID = req.body.productID;
    Product.findByID(productID, product => {
        Cart.deleteProduct(productID, product.price);
        res.redirect('/cart');
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders',
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
    });
};