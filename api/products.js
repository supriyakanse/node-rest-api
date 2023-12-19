const express=require('express');
const router=express.Router();

const mongoose=require('mongoose')
const Product=require('C:/Users/user/Documents/node/node-rest-api/api/models/product.js');

router.get('/',(req,res,next)=>{
    Product.find().exec().then(docs=>{
        console.log(docs);
        //if(docs.length>=0){
            res.status(200).json(docs);
       // }        else{
       //     res.status(404).json({
       //         message:'no products found'
       //     })
       // }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({error:err})
    })
});

router.post('/',(req,res,next)=>{
    const product= new Product({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
    });
    product
    .save()
    .then(result=>{
        console.log(result);
        res.status(201).json({
            message:'works with post req to /products',
            createdProduct:result
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({error:err})
    })
    });
router.get('/:productID',(req,res,next)=>{
    const id=req.params.productID;
    Product.findById(id).exec().then(doc=>{
        console.log("from database",doc);
        if(doc){
            res.status(200).json(doc);
        }
        else{
            res.status(404).json({
                message:'product not found with given ID'
            })
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({error:err})
    })
 });

 router.patch('/:productID',(req,res,next)=>{
    const id = req.params.productID;
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;
    }
    Product.updateOne({ _id: id },{ $set: updateOps}).exec().then(result=>{
        console.log(result);
        res.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({error:err})
    })
})

router.delete('/:productID',(req,res,next)=>{
    const id = req.params.productID;
    Product.deleteOne({ _id:id }).exec().then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    })
})

module.exports=router
