
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const productRoutes = require('C:/Users/user/Documents/node/node-rest-api/api/products.js');
const orderRoutes = require('./api/routes/Orders');
const userRoutes=require('C:/Users/user/Documents/node/node-rest-api/api/routes/user.js');
mongoose.connect('mongodb+srv://user:user@node-rest-shop.giwp7cf.mongodb.net/?retryWrites=true&w=majority', {
    
    retryWrites: true,
    w: 'majority',
})
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });

app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/products', productRoutes)

app.use('/orders', orderRoutes)
app.use('/user',userRoutes)

//will reach this line denoting earlier routes werent working 
app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
})

//this will handle all kinds of error also above error as it is been passed into next
//sends response having error status code and error message
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;