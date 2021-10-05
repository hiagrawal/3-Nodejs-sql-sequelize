const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// const db = require('./util/database');

const sequelize = require('./util/database');
const Product = require('./models/product');
const User  = require('./models/user');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));


// const adminData = require('./routes/admin');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//since we created a pool which returns a promise so we can use then and catch to access the same
// db.execute('SELECT * FROM products')
// .then(result => {
//     console.log(result); //it returns in an nested array so we can get the first element by result[0]
//     console.log(result[0]);
// })
// .catch(err => {
//     console.log(err);
// });

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//We are defining associations this way between Product and User which internally sets foreign key that we define manually in sql
//We can define optional paramters but that is not necessary
//we are defining constraints and onDelete which indicates if user is deleted and it's corresponding products should also be deleted
//can see all this associations and options here: https://sequelize.org/master/manual/assocs.html
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);


//sequelize.sync syncs all models (that we create using sequelize.define) with the database by creating tables
//since server is up and product table has already been created so to delete the same and create new tables products and users 
//which has associates, we use force true. This will never be needed in production. 
//this will now also create one more column 'userId' in producttables table as a foreign key

// sequelize
// .sync({force: true}) //force should not be run  all time else it will delete all data and tables and recreate them
// .then(result => {
//     //console.log(result);
//     app.listen(3000); //listen to server only when we are able to connect to db
// })
// .catch(err =>{
//     console.log(err);
// });

//we are creating a dummy user when server starts that is on npm start
//on first run, it will not find user and create one and on subsequent starts, it will have a user
sequelize
.sync() //force should not be run  all time else it will delete all data and tables and recreate them
.then(result => {
    return User.findByPk(1);
})
.then(user => {
    if(!user){
        User.create({name: 'Hina', email: 'test@test.com'})
    }
    return user;
})
.then(user => {
    console.log(user);
    app.listen(3000); //start server only when created/found a user
})
.catch(err =>{
    console.log(err);
});

// app.listen(3000);
