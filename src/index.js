"use strict";
exports.__esModule = true;
var express = require('express');
var path = require('path');
var express_handlebars_1 = require("express-handlebars");
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
///////Initializations///////
var app = express();
require('./database'); //Conexio con la bd de mongoose
require('./config/passport');
///////setting///////
app.set('port', process.env.PORT || 3030);
app.engine(".hbs", express_handlebars_1.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs"
}));
app.set("view engine", ".hbs"); // Una vez definido, usamos como engine hbs (handlebars)
//////Middlewares///////
app.use(express.urlencoded({ extended: false })); //recibimos los datos del usuarios user, password etc.. sin imagenes false
app.use(methodOverride('_method')); // sirve para enviar otros metodos aparte del post i get tambien el put i el delete
//authenticar al usuario temporalmente
app.use(session({
    secret: 'shh,secret!',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); //Enviar mensajes
//////Globar Variable////
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    ;
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});
//////Routes/////
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));
//Static Files
app.use(express.static(path.join(__dirname, "public")));
//Server is listening
app.listen(app.get('port'), function () {
    console.log('Sever on port', app.get('port'));
});
module.exports = app;
