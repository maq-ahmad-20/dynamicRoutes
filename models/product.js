const fs = require('fs');
const path = require('path');
const Cart = require('../models/cart')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price, id) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = id;
  }

  save() {



    getProductsFromFile(products => {
      if (this.id) {

        const existProdIndex = products.findIndex(prod => prod.id === this.id);
        const updatedProduct = [...products];
        updatedProduct[existProdIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProduct), err => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static fetchById(id, cb) {
    getProductsFromFile((products) => {
      const prod = products.find((prod) => {
        return prod.id === id
      });
      cb(prod);
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static deleteproductbyID(id) {

    getProductsFromFile((products) => {
      const product = products.find(p => p.id === id)
      const remainingProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(remainingProducts), (err) => {
                  
      })

    })
  }

}
