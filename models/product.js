
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
    constructor(title){
        this.title = title
    }

    save(){
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