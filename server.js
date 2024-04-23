require('dotenv').config()
const express = require('express');
const app = express();
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const PORT = process.env.PORT || 2220
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo')

//  Connect to MongoDB database using Mongoose
mongoose.connect('mongodb://localhost/pizza')
const connection = mongoose.connection;
// Event listener
connection.once('open', () => {
    console.log('Database connected...');
});

connection.on('error',(err) => {
    console.log('Connection failed...')
});

// Session store

let mongoStore = new MongoDbStore({
    mongoUrl: 'mongodb://localhost/pizza', // Update with your MongoDB connection string
    collectionName: 'sessions', // Specify your collection name
    mongooseConnection: mongoose.connection // Optional
});

// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store:  mongoStore,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24}, // 24 hours 
}))

app.use(flash())

// Assets
app.use(express.static('public'))

//  Body parser for url encoded  data
app.use(express.urlencoded({ extended: false }))

app.use(express.json())

// Global middleware
app.use((req,res,next)=>{
    res.locals.session = req.session
    next()
})


//   Use EJS to set template engine
app.use(expressLayout)
app.set('views', path.join( __dirname , '/resources/views'))
app.set('view engine', 'ejs');

// module importing for routes from web.js
require('./routes/web')(app)



app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})