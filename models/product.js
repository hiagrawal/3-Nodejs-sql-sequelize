
/*const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const fileNameWithPath = path.join(__dirname, '..', 'data' , 'products.json');

const getProductsFromFile = cb => {
    fs.readFile(fileNameWithPath, (err, fileContent) => {
        console.log(err);
        if(err){
            cb([]);
        }
        cb(JSON.parse(fileContent));
    })
}

module.exports = class Product{
    constructor(id, title, imageUrl, price, description){
        this.id = id;
        this.title = title,
        this.imageUrl = imageUrl,
        this.price = price,
        this.description = description
    }

    save(){
        getProductsFromFile((products) => {
            console.log("id", this.id);
            if(this.id){
                const existingProductIndex = products.findIndex(product => product.id === this.id);
                products[existingProductIndex] = this; 
            }
            else{
                this.id = Math.random().toString();
                products.push(this);
            }
            
            fs.writeFile(fileNameWithPath, JSON.stringify(products), (err) =>{
               console.log(err);
            })
        })
    }

    static delete(id){
        getProductsFromFile(products => {
            const product = products.find(product => product.id === id);
            const updatedProducts = products.filter(p => p.id !== id);
            fs.writeFile(fileNameWithPath, JSON.stringify(updatedProducts), (err) =>{
                if(!err){
                    Cart.deleteFromCart(id, product.price)
                }
             })
        })
    }
    
    static fetchAll(cb){
        getProductsFromFile(cb);
    }

    //so here findById is accepting paramId as paramter in id field and async function as paramter in productCb paramter(product callback) 
    //and will call that productCb async function when it will have the value of product
    //and to get the vallue of product, it is calling getProductsFromFile function to get the list of products
    //and will pass another async function as param to getProductsFromFile that needs to be exceuted when it will have value of products
    static findById(id, productCb){
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            productCb(product);
        })
    }

}*/

//Callback function concept
//usually from a function, we return a value so we can get that value when calling that function

//for ex:
// function abc {
//     return "abc";
// }

//var value = abc();
//so value will get abc
//and we can do value.length or any other operations

//but if function is asynchronous that is returning the value
// function abc {
//    some async function which is taking time (like read, write operations) {
//       return "abc";
//     }
// }

//our code will call the function and keep executing to the next line and hence will get value as undefined
//var value = abc();
// value.length
//and so if we do any operations on value, it will start throwing exception as value is undefined

//In such scenarios, where we want some code to be executed only when we get the response, we can use callback functions concept
//(note, it's not good to use async await in such scenarios as it will stop the execution only and process will be in memory 
//and if multiple users are on the server then it becomes even worse)

//To achieve this, we can pass that specific code inside an anonymous function (referred to as callback function) 
//while calling the function which is asynchronous so async function will now accept that callback function as param 
//and call that anonymous function when it will finish executing and will have a response
//so that anonymous callback function will now have a resposne

//so...

//so calling this abc function which has some asynchronous code and passing anonymous function as a param
//abc((value) => {
// value.length   
//});

//so callbackFunction has anonymous function as param
// function abc(callbackFunction) {
//    some async function which is taking time (like read, write operations) {
//       callbackFunction("abc"); //and now calling the anonymous function and passing paramter abc so value will get abc
//     }
// }

//so we write a callback function and function needs to be called to get exceuted so will execute the callback function 
//when we get the response and to call that function, will have to pass as a param

//When connected with database: fetching and retrieving from database

const db = require('../util/database');

const Cart = require('./cart');

module.exports = class Product{
    constructor(id, title, imageUrl, price, description){
        this.id = id;
        this.title = title,
        this.imageUrl = imageUrl,
        this.price = price,
        this.description = description
    }

    save(){
       //These question marks are used as a security pattern to avoid users to enter special data
       //No Need to add id as it will be auto generated
       return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)', 
            [this.title, this.price, this.imageUrl, this.description]
       );
    }

    static delete(id){
       
    }
    
    static fetchAll(){
        return db.execute('SELECT * FROM products'); //Executing this query will return a promise
    }

    static findById(id){
        return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
    }

}
