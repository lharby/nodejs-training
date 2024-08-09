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
    req.user.getCart()
        .then(cart => {
            return cart.getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        pageTitle: 'Cart',
                        path: '/cart',
                        products: products
                    });
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const productID = req.body.productID;
    let fetchedCart;
    let newQuantity = 1;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: productID }});
        })
        .then(products => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }
            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            }
            return Product.findByPk(productID)
        })
        .then(product => {
            return fetchedCart.addProduct(product, {
                through: { quantity: newQuantity }
            });
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
    const productID = req.body.productID;
    req.user.getCart()
        .then(cart => {
            return cart.getProducts({ where: { id: productID }});
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err))
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