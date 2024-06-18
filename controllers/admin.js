const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.getEditProduct = (req, res) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const productID = req.params.productID;
    Product.findByID(productID, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    });
};

exports.postEditProduct = (req, res, next) => {
    const productID = req.body.productID;
    const updatedTitle = req.body.title;
    const updatedImageURL = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;
    const updatedProduct = new Product(
        productID,
        updatedTitle,
        updatedImageURL,
        updatedDescription,
        updatedPrice
    );
    console.log(updatedProduct);
    updatedProduct.save();
    res.redirect('/admin/products');
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    res.redirect('/');
};

exports.postDeleteProduct = (req, res, next) => {
    const productID = req.body.productID;
    Product.deleteById(productID);
    res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', { 
            products: products,
            pageTitle: 'Admin products',
            path: '/admin/products',
        });
    });
};