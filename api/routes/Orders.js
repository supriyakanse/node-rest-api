const express=require('express')
const router=express.Router()
console.log("in orders")
router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'order fetched '
    });
    console.log("orders get")
})
router.post('/',(req,res,next)=>{
    const order={
        productID:req.body.productID,
        quantity:req.body.quantity
    };
    res.status(201).json({
        message:'order created ',
        orderCreated:order
    });
})

router.get('/:orderID',(req,res,next)=>{
    res.status(200).json({
        message:'order fetched',
        orderID:req.params.orderID
    });
})
router.delete('/:orderID',(req,res,next)=>{
    res.status(200).json({
        message:'order deleted',
        orderID:req.params.orderID
    });
})

module.exports=router