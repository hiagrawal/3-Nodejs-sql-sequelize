const path = require('path');

const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProductPage);

// /admin/add-product => POST
router.post('/add-product', adminController.addProduct);

//what we get after ':' is request param and after '?' is query param
//ex: /admin/edit-product/12345?editMode="true" 
//so we can access 12345 using req.params and editMode using req.query
router.get('/edit-product/:productId', adminController.getEditProductPage);

router.post('/edit-product', adminController.editProduct);

router.post('/delete-product', adminController.deleteProduct);

router.get('/products', adminController.getProducts);

module.exports = router;
