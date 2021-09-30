
const Product = require('../models/product');

exports.getAddProductPage = (req, res, next) => {
    res.render('admin/add-product' , {
        pageTitle:'Add Product', 
        path:'admin/add-product'
    });
};

exports.addProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, price, description);
    product.save();
    res.redirect('/');
}

//checking editMode doesn't make any sense here as we are already calling this method when user clicks on edit
//this is just a usecase to show how to access query params
//http://localhost:3000/admin/edit-product/12345?edit=true 
exports.getEditProductPage = (req, res, next) => {
    const edit = req.query.edit;
    console.log('edit' + edit);
    const productId = req.params.productId;
    Product.findById(productId, (product) => {
        res.render('admin/edit-product' , {
            pageTitle:'Edit Product', 
            path:'admin/edit-product', //since no such path exists so no link will be highlighted
            editMode: edit,
            product:product
        });
    })    
};

exports.editProduct = (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(id, title, imageUrl, price, description);
    product.save();
    res.redirect('/');
}

exports.getProducts= (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products' , {
          prods:products, 
          pageTitle:'Admin Products', 
          path:'admin/products'
        })
      });
};