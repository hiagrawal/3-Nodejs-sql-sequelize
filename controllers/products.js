
//const products = [];
const Product = require('../models/product');

exports.getAddProductPage = (req, res, next) => {
    res.render('add-product' , {pageTitle:'Add Product', path:'addProduct', productsCSS: true, formsCSS: true, activeProduct: true});
};

exports.addProduct = (req, res, next) => {
    //products.push({title:req.body.title});
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
  }

exports.showProducts = (req, res, next) => {
    // const products = Product.fetchAll();
    // res.render('shop' , {prods:products, pageTitle:'My Shop', path:'shop',hasProducts: products.length>0, activeShop:true, productsCSS: true});  
    Product.fetchAll((products) => {
      res.render('shop' , {
        prods:products, 
        pageTitle:'My Shop', 
        path:'shop',
        hasProducts: products.length>0, 
        activeShop:true, 
        productsCSS: true
      })
    });
}