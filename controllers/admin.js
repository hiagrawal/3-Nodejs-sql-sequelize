
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
    //when using file storage
    //const product = new Product(null, title, imageUrl, price, description);
    // product.save();
    // res.redirect('/');

    //When using mysql database
    // const product = new Product(null, title, imageUrl, price, description);
    // product.save()
    // .then(() => {
    //     res.redirect('/');
    // })
    // .catch(err => console.log(err));

    //When using sequelize
    //create will craete a record in database and will return a promise
    Product.create({
        title:title,
        price:price,
        imageUrl:imageUrl,
        description:description
    }).then(result => {
        //console.log(result);
        console.log('Craeted Product');
    }).catch(err => {
        console.log(err);
    })


}

//checking editMode doesn't make any sense here as we are already calling this method when user clicks on edit
//this is just a usecase to show how to access query params
//http://localhost:3000/admin/edit-product/12345?edit=true 
exports.getEditProductPage = (req, res, next) => {
    const edit = req.query.edit;
    console.log('edit' + edit);
    if(!edit){
        return res.redirect('/');
    }
    const productId = req.params.productId;

    // Product.findById(productId, (product) => {
    //     if(!product){
    //         return res.redirect('/');
    //     }
    //     res.render('admin/edit-product' , {
    //         pageTitle:'Edit Product', 
    //         path:'admin/edit-product', //since no such path exists so no link will be highlighted
    //         editMode: edit,
    //         product:product
    //     });
    // }) 
    
    //using sequelize
    Product.findByPk(productId)
    .then(product => {
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product' , {
            pageTitle:'Edit Product', 
            path:'admin/edit-product', //since no such path exists so no link will be highlighted
            editMode: edit,
            product:product
        });
    })
    .catch(err => console.log(err));

};

exports.editProduct = (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    // const product = new Product(id, title, imageUrl, price, description);
    // product.save();
    // res.redirect('admin/products');

    //using sequelize
    //to edit, first we will have to find that product in database and save that again
     //save method is again given by sequelize which saves the updated value if it exists and will create one new record if not exists
    //save again gives us back a promise so we have use product.save().then().catch() to do other operations but to avoid nesting
    //we can return it there and use then further which will be called once it success and common catch at the bottom will catch errors
    //of both the then scenarios
    Product.findByPk(id)
    .then(product => {
        product.title = title;
        product.price = price;
        product.description = description;
        product.imageUrl = imageUrl;
        return product.save(); 
    })
    .then(result => {
        console.log("Updated Product");
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));

}

exports.getProducts= (req, res, next) => {
    // Product.fetchAll((products) => {
    //     res.render('admin/products' , {
    //       prods:products, 
    //       pageTitle:'Admin Products', 
    //       path:'admin/products'
    //     })
    //   });

     //using sequelize
      Product.findAll()
      .then(products => {
            res.render('admin/products' , {
            prods:products, 
            pageTitle:'Admin Products', 
            path:'admin/products'
            })
       })
      .catch(err => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
    const id = req.body.id;
    Product.delete(id);
    res.redirect('/admin/products');
}