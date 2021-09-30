const fs = require('fs');
const path = require('path');

const fileNameWithPath = path.join(__dirname, '../', 'data' , 'cart.json');
console.log(fileNameWithPath);

module.exports = class Cart {

     static addToCart(id, price){
        //read cart file
        //analysizing if product already exists
        //if yes, then increase the qty else add the product

        console.log("inside add to cart");
        fs.readFile(fileNameWithPath, (err, fileContent) => {
            console.log("inside read file");
            let cart = {products:[], totalPrice:0};
            if(!err){
                cart = JSON.parse(fileContent);
            }
            const existingProduct = cart.products.find(product => product.id === id);
            const existingProductIndex = cart.products.findIndex(product => product.id === id);
            console.log(existingProduct);
            if(existingProduct){
                const product = cart.products[existingProductIndex];
                product.qty = product.qty + 1;
            }
            else {
                cart.products = [...cart.products, {id:id, qty:1}]
            }
            cart.totalPrice = cart.totalPrice + +price; //+price is used to convert it into number from string
            
            console.log(cart);
            fs.writeFile(fileNameWithPath, JSON.stringify(cart), (err) => {
                console.log(err);
            })
        
        })
     }

     static deleteFromCart(id, productPrice){
        fs.readFile(fileNameWithPath, (err, fileContent) => {
            if(!err){
                var cart = JSON.parse(fileContent);
            
                const existingProduct = cart.products.find(product => product.id === id);
                if(existingProduct){
                    const productQuantity = existingProduct.qty;
                    cart.totalPrice = cart.totalPrice - (productPrice * productQuantity);

                    const updatedProducts = cart.products.filter(product => product.id !== id);
                    cart.products = [...updatedProducts];

                    fs.writeFile(fileNameWithPath, JSON.stringify(cart), (err) => {
                        console.log(err);
                    })
                }
            }
           
        });

     }

     static getCartItems(cb){
        fs.readFile(fileNameWithPath, (err, fileContent) => {
            if(err){
                cb(null);
            }
            cb(JSON.parse(fileContent));
        })
     }

}