const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect("mongodb://127.0.0.1:27017/Blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

const router = require('./routes/routes');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/', router);
app.use('/create', router);
app.use('/new', router);
app.use('/login', router);
app.use('/user', router);
app.use('/viewPostsByUser', router);
app.use('/viewAllPosts', router);


app.use(function (req, res, next) {
    res.status(404).render('404.ejs');
});

app.use(function (error, req, res, next) {
    console.error(error.stack);
	
    res.status(error.status || 500).json({
        errorMessage: error.message
    });
});

module.exports = app;