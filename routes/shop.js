const path = require('path');

const express = require('express');

//const adminData = require('./admin');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.showProducts);


//if we have dynamic route and some specific route lets say delete (router.get('/products/delete', shopController.deleteProduct);), 
//then that must always be before dynamic route
//as it executes top to bottom so if gets dynamic route first, it will render as per that and not exceute to the next line
router.get('/products/:productId', shopController.showProductDetails);

router.get('/cart', shopController.getCart);

//so already this get request of cart to render the page, we can have another post method to render the data
router.post('/cart', shopController.postCart);

router.post('/cart-delete-product', shopController.deleteCartProduct);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
