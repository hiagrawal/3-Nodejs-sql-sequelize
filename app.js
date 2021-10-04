const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// const db = require('./util/database');

const sequelize = require('./util/database');

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

//sequelize.sync syncs all models (that we create using sequelize.define) with the database by creating tables
sequelize.sync()
.then(result => {
    //console.log(result);
    app.listen(3000); //listen to server only when we are able to connect to db
})
.catch(err =>{
    console.log(err);
});

// app.listen(3000);
