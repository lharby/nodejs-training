const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([rows]) => {
            res.render('shop/product-list', { 
                products: rows,
                pageTitle: 'All products',
                path: '/products',
            });
        })
        .catch(err => { console.log(err)});
};

exports.getProduct = (req, res, next) => {
    const productID = req.params.productID;
    Product.findByID(productID)
        .then(([product]) => {
            res.render('shop/product-detail', {
                product: product[0],
                pageTitle: product.title,
                path: '/products'
            });
        })
        .catch(err => console.log(err));
};

exports.getIndexPage = (req, res, next) => {
    Product.fetchAll()
    .then(([rows]) => {
        res.render('shop/index', { 
            products: rows,
            pageTitle: 'Shop',
            path: '/',
        });
    })
    .catch(err => { console.log(err)});
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