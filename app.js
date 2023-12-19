
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const productRoutes = require('C:/Users/user/Documents/node/node-rest-api/api/products.js');
const orderRoutes = require('./api/routes/Orders');

mongoose.connect('mongodb+srv://user:user@node-rest-shop.giwp7cf.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: 'majority',
})
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/products', productRoutes)

app.use('/orders', orderRoutes)


module.exports = app;