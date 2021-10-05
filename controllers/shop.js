
//const products = [];
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.showProducts = (req, res, next) => {
    // const products = Product.fetchAll();
    // res.render('shop' , {prods:products, pageTitle:'My Shop', path:'shop',hasProducts: products.length>0, activeShop:true, productsCSS: true});  
    
    // Product.fetchAll((products) => {
    //   res.render('shop/product-list' , {
    //     prods:products, 
    //     pageTitle:'All Products', 
    //     path:'products'
    //   })
    // });

    // Product.fetchAll()
    // .then(([rows]) => {
    //   res.render('shop/product-list' , {
    //         prods:rows, 
    //         pageTitle:'All Products', 
    //         path:'products'
    //       })
    // })
    // .catch(err => console.log(err));

    Product.findAll()
    .then(products => {
      res.render('shop/product-list' , {
        prods:products, 
        pageTitle:'All Products', 
        path:'products'
      })
    })
    .catch(err => {
      console.log(err);
    });

}

exports.showProductDetails = (req, res, next) => {
    const prodId = req.params.productId; //this productId will be the same name which is passed in shop route

    //findById is passing prodId paramter and a async function which needs to be called when it gets value of product
    // Product.findById(prodId, (product) => {
    //   console.log(product);
    //   res.render('shop/product-detail' , {
    //     product:product, 
    //     pageTitle:product.title, 
    //     path:'products'
    //   })
    // });
    //res.redirect('/');

    //when working with mysql
    // Product.findById(prodId)
    // .then(([product]) => {
    //   console.log(product);
    //   res.render('shop/product-detail' , {
    //     product:product[0], 
    //     pageTitle:product.title, 
    //     path:'products'
    //   })
    // })
    // .catch(err => console.log(err));

    //when working with sequelize. findAll, findById are all predefined methods in sequelize which we can directly use
    // Product.findByPk(prodId)
    // .then(product => {
    //   console.log(product);
    //   res.render('shop/product-detail' , {
    //     product:product, 
    //     pageTitle:product.title, 
    //     path:'products'
    //   })
    // })
    // .catch(err => console.log(err));

    //Although we dont need to use findAll here but just a usecase to show how to use 'where' clause
    //it returns an array of objects even if there is single value returned
    Product.findAll({where: {id: prodId}})
    .then(products => {
      console.log(products);
      res.render('shop/product-detail' , {
        product:products[0], 
        pageTitle:products[0].title, 
        path:'products'
      })
    })
    .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
  //when working with fs
  // Product.fetchAll((products) => {
  //   res.render('shop/index' , {
  //     prods:products, 
  //     pageTitle:'My Shop', 
  //     path:'shop'
  //   })
  // });

  //when working with mysql
  // Product.fetchAll()
  // .then(([rows, fieldData]) => {
  //   res.render('shop/index' , {
  //         prods:rows, 
  //         pageTitle:'My Shop', 
  //         path:'shop'
  //       })
  // })
  // .catch(err => console.log(err));

  //when working with sequelize
  Product.findAll()
  .then(products => {
    res.render('shop/index' , {
      prods:products, 
      pageTitle:'My Shop', 
      path:'shop'
    })
  })
  .catch(err => {
    console.log(err);
  });
}

//trying to get cart items and cart items products details with the id
//[ {productData: {"id":"0.38416663730150136","title":"Book 1","imageUrl":"https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png","price":"10.00","description":" Book 1 Description"},
//    qty:1]
exports.getCart = (req, res, next) => {

  //when using file system
  // Cart.getCartItems((cartItems) =>{
  //     Product.fetchAll((products) => {
  //       const cartProducts = [];
  //       for(var product of cartItems.products){
  //         var updatedCartProduct = products.find(p => p.id === product.id);
  //         cartProducts.push({productData:updatedCartProduct, qty: product.qty})
  //       }
  //       res.render('shop/cart' , {
  //         pageTitle:'Your Cart', 
  //         path:'cart',
  //         cartItems: cartProducts
  //       })
  //     })
  //   })  

  //when using sequelize
  req.user.getCart()
  .then(cart => {
    return cart.getProductTables();
  })
  .then(products => {
    res.render('shop/cart' , {
      pageTitle:'Your Cart', 
      path:'cart',
      cartItems: products
    })
  })
  .catch(err => console.log(err));
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);

  Product.findById(prodId, (product) => {
    console.log(product);
    Cart.addToCart(prodId, product.price);
    res.redirect('/cart');
  });
}

exports.deleteCartProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    console.log(product);
    Cart.deleteFromCart(prodId, product.price);
    res.redirect('/cart');
  });
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