const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0};
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.quantity = updatedProduct.quantity + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, quantity: 1 };
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            cart.products = [...cart.products, updatedProduct];
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }

    static deleteProduct(id, price) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            if (!product) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.findIndex(product => product.id === id);
            const productQuantity = product.quantity;
            updatedCart.products = updatedCart.products.filter(product => product.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - price * productQuantity;

            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            });
        });
    }

    static getProducts(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (err) {
                cb(null);
            } else {
                cb(cart);
            }
        });
    }
}