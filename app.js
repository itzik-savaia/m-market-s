var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var morgan = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var fileUpload = require('express-fileupload')

mongoose.connect(
    process.env.MONGODB_URI,
    // 'mongodb+srv://itziksavaia:itzik4580@cluster0-zrrsh.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        try {
            console.log('The Mongoose connection is ready');
        } catch (error) {
            console.log(`catch ${error}, err${err}`);
        }
    })
var allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};
var index = require('./routes/index');
var product_Router = require('./routes/product');
var users_Router = require('./routes/users');
var roles_Router = require('./routes/roles');
var category_Router = require('./routes/category');
var subcategory_Router = require('./routes/subcategory');
var cart_Router = require('./routes/cart');
var item_Router = require('./routes/item');
var order_Router = require('./routes/order');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(allowCrossDomain);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    tempFileDir: '/png/' + '/pdf/' + '/jpg/' + '/gif/' + '/svg/'
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/', index);
app.use('/product', product_Router);
app.use('/users', users_Router);
app.use('/roles', roles_Router);
app.use('/category', category_Router);
app.use('/subcategory', subcategory_Router);
app.use('/cart', cart_Router);
app.use('/item', item_Router);
app.use('/order', order_Router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;