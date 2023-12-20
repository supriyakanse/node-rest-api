const express = require('express');
const router = express.Router();
const multer = require('multer')
const ProductsController=require("C:/Users/user/Documents/node/node-rest-api/api/controllers/products.js")
const checkAuth=require('C:/Users/user/Documents/node/node-rest-api/api/middleware/check-auth.js')
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
const mongoose = require('mongoose')
const Product = require('C:/Users/user/Documents/node/node-rest-api/api/models/product.js');

router.get('/', ProductsController.products_get_all);

router.post('/', checkAuth,upload.single('productImage'), ProductsController.products_create_product);
router.get('/:productID', ProductsController.products_get_product);

router.patch('/:productID',checkAuth,ProductsController.products_update_product)

router.delete('/:productID', checkAuth,ProductsController.products_delete)

module.exports = router
