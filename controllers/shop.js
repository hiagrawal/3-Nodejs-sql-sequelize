
//const products = [];
const Product = require('../models/product');

exports.showProducts = (req, res, next) => {
    // const products = Product.fetchAll();
    // res.render('shop' , {prods:products, pageTitle:'My Shop', path:'shop',hasProducts: products.length>0, activeShop:true, productsCSS: true});  
    Product.fetchAll((products) => {
      res.render('shop/product-list' , {
        prods:products, 
        pageTitle:'All Products', 
        path:'products'
      })
    });
}

exports.showProductDetails = (req, res, next) => {
    const prodId = req.params.productId; //this productId will be the same name which is passed in shop route
    //findById is passing prodId paramter and a async function which needs to be called when it gets value of product
    Product.findById(prodId, (product) => {
      console.log(product);
      res.render('shop/product-detail' , {
        product:product, 
        pageTitle:product.title, 
        path:'products'
      })
    });
    //res.redirect('/');

}

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index' , {
      prods:products, 
      pageTitle:'My Shop', 
      path:'shop'
    })
  });
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart' , {
    pageTitle:'Your Cart', 
    path:'cart'
  })
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders' , {
    pageTitle:'Your Orders', 
    path:'orders'
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout' , {
    pageTitle:'checkout', 
    path:'checkout'
  })
}