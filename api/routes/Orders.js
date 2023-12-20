const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const checkAuth=require('C:/Users/user/Documents/node/node-rest-api/api/middleware/check-auth.js')

const Order=require('C:/Users/user/Documents/node/node-rest-api/api/models/order.js');
const OrdersController=require("C:/Users/user/Documents/node/node-rest-api/api/controllers/orders.js")
const Product=require('C:/Users/user/Documents/node/node-rest-api/api/models/product.js');

router.get('/',checkAuth,OrdersController.orders_get_all)
router.post('/',checkAuth,OrdersController.orders_create_order);

router.get('/:orderID',checkAuth,OrdersController.orders_get_order)
router.delete('/:orderID',checkAuth,OrdersController.orders_delete_order)

module.exports=router