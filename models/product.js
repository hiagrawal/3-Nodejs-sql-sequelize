
const fs = require('fs');
const path = require('path');

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
    constructor(title, imageUrl, price, description){
        this.title = title,
        this.imageUrl = imageUrl,
        this.price = price,
        this.description = description
    }

    save(){
        this.id = Math.random().toString();
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(fileNameWithPath, JSON.stringify(products), (err) =>{
               console.log(err);
            })
        })
    }
    
    static fetchAll(cb){
        getProductsFromFile(cb);
    }

}