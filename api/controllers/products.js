
const mongoose = require('mongoose')
const Product = require('C:/Users/user/Documents/node/node-rest-api/api/models/product.js');

exports.products_get_all=(req, res, next) => {
    Product.find().select("name price _id productImage").exec().then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    id: doc._id,
                    productImage: doc.productImage,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + doc._id
                    }
                }
            })
        }
        //if(docs.length>=0){
        res.status(200).json(response);
        // }        else{
        //     res.status(404).json({
        //         message:'no products found'
        //     })
        // }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    })
}

exports.products_create_product=(req, res, next) => {
    console.log(req.file)
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'created product',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + result._id
                    }
                }
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
}

exports.products_get_product=(req, res, next) => {
    const id = req.params.productID;
    Product.findById(id).select("name price _id productImage").exec().then(doc => {
        console.log("from database", doc);
        if (doc) {
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/'
                }
            });
        }
        else {
            res.status(404).json({
                message: 'product not found with given ID'
            })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    })
}


exports.products_update_product= (req, res, next) => {
    const id = req.params.productID;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({ _id: id }, { $set: updateOps }).exec().then(result => {
        console.log(result);
        res.status(200).json({
            message: "Product updated",
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products/' + id
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    })
}


exports.products_delete=(req, res, next) => {
    const id = req.params.productID;
    Product.deleteOne({ _id: id }).exec().then(result => {
        res.status(200).json({
            message: "product deleted",
            request: {
                type: "POST",
                url: "http://localhost:3000/products",
                data: {
                    name: 'String',
                    price: 'Number'
                }
            },
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    })
}