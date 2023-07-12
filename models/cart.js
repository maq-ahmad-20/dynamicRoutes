const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);



module.exports = class Cart {

    static addProduct(id, productPrice) {
        fs.readFile(p, (err, data) => {
            let cart = { products: [], totalPrice: 0 }
            if (!err) {
                cart = JSON.parse(data)
            }
            let existingProdIndex = cart.products.findIndex(prod => prod.id === id)
            let existingProd = cart.products[existingProdIndex];
            let updatedProd;
            if (existingProd) {
                updatedProd = { ...existingProd };
                updatedProd.qty = updatedProd.qty + 1;
                cart.products = [...cart.products]
                cart.products[existingProdIndex] = updatedProd
            } else {
                updatedProd = { id: id, qty: 1 }
                cart.products = [...cart.products, updatedProd]
            }

            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            })

        })



    }



}