const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const checkAuth=require('C:/Users/user/Documents/node/node-rest-api/api/middleware/check-auth.js')

const Order=require('C:/Users/user/Documents/node/node-rest-api/api/models/order.js');
const Product=require('C:/Users/user/Documents/node/node-rest-api/api/models/product.js');

router.get('/',checkAuth,(req,res,next)=>{
    Order.find()
    .select("product quantity _id")
    .exec()
    .then(docs=>{
        res.status(200).json({
            count:docs.length,
            orders: docs.map(doc=>{
                return{
                    product:doc.product,
                    quantity:doc.quantity,
                    id:doc._id,
                    request:{
                        type:'GET',
                        url:'http://localhost:3000/orders/'+doc._id
                    }
                }
            })
        })
    })
    .catch(err=>{
         res.status(500).json({error:err})
    });    
})
router.post('/',checkAuth,(req,res,next)=>{
    Product.findById(req.body.productID)
    .then(product=>{
        if(!product){
            res.status(404).json({
                message:'product not found'
            })
        }
        const order=new Order({
        _id:new mongoose.Types.ObjectId(),
        quantity:req.body.quantity,
        productID:req.body.productID        
    });
    return order.save()
    }).then(result=>{
        console.log(result);
        res.status(201).json({
            message:"order stored",
            createdOrder:{
                _id:result._id,
                product:result.product,
                quantity:result.quantity
            },
            request:{
                type:"GET",
                url:"http://localhost:3000/orders/"+result._id
            }
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err})
    });
    });

router.get('/:orderID',checkAuth,(req,res,next)=>{
    Order.findById(req.params.orderID)
    .exec()
    .then(order=>{
        if(!order){
            return res.status(404).json({
                message:'order not found'
            })
        }
        res.status(200).json({
            order:order,
            request:{
                type:'GET',
                url:'http://localhost:3000/orders/'
            }
        })
    })
    .catch(err=>{
         res.status(500).json({error:err})
    })
})
router.delete('/:orderID',checkAuth,(req,res,next)=>{
    Order.deleteOne({ _id:req.params.orderID })
    .exec()
    .then(result=>{
        res.status(200).json({
            message:"order deleted",
            request:{
                type:"POST",
                url:"http://localhost:3000/orders",
                body: {
                    productID:'String',
                    quantity:'Number'
                }
            },
        });
    })
    .catch(err=>{
         res.status(500).json({error:err})
    });
})

module.exports=router