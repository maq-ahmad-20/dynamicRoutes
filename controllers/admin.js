const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false

  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  req.user.createProduct({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl
  }).then(result => res.redirect('/admin/products'))
    .catch(err => console.log(err))



};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId;
  req.user.getProducts({ where: { id: prodId } })     // gives array of db output with  note getsingle product not wprks like fetchall

    //Product.findByPk(prodId) // gives data obj
    .then((results) => {
      const result = results[0]
      if (!result) {
        return res.redirect('/')
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: result


      })
    }).catch(err => console.log(err))

};
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatedImageUrl = req.body.imageUrl
  const updatedPrice = req.body.price
  const upateddesc = req.body.description

  Product.findByPk(prodId)
    .then((result) => {
      result.title = updatedTitle,
        result.imageUrl = updatedImageUrl,
        result.price = updatedPrice,
        result.description = upateddesc
      return result.save();// or you can use update and pass the data in object
    }).then(result => {
      console.log("updated product")
      res.redirect('/admin/products')
    })

    .catch(err => console.log(err))

}

exports.getProducts = (req, res, next) => {
  //Product.findAll()

  req.user.getProducts()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      })

    }).catch(err => console.log)
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then(product => {
      return product.destroy();

    }).then(resut => {
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))





}