const express = require('express');
const path = require('path');
import { engine } from 'express-handlebars';
const methodOverride =require('method-override');
const session =require('express-session');
const flash = require('connect-flash');
const passport =require('passport')
///////Initializations///////
const app = express();
require('./database');//Conexio con la bd de mongoose
require('./config/passport');
///////setting///////
app.set('port', process.env.PORT || 3030)

app.engine(
    ".hbs",
    engine({
      defaultLayout: "main",//Archivo principal(plantilla principal: color de fondo,footer,header...)
      layoutsDir: path.join(app.get("views"), "layouts"),//obtenemos la carpeta view i lo concatenamos con la carpeta layouts
      partialsDir: path.join(app.get("views"), "partials"),// obtenemos la carpeta view i lo concatenamos con la carpeta partial
      extname: ".hbs",//todos lo archivos terminan en .hbs
    })
  );
  app.set("view engine", ".hbs");// Una vez definido, usamos como engine hbs (handlebars)
  
//////Middlewares///////
app.use(express.urlencoded({extended:false}));//recibimos los datos del usuarios user, password etc.. sin imagenes false
app.use(methodOverride('_method'));// sirve para enviar otros metodos aparte del post i get tambien el put i el delete

//authenticar al usuario temporalmente
app.use(session({
    secret:'shh,secret!',
    resave:true,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());//Enviar mensajes

//////Globar Variable////
app.use((req, res, next)=>{
  res.locals.success_msg =req.flash('success_msg');;
  res.locals.error_msg =req.flash('error_msg');
  res.locals.error =req.flash('error');
  res.locals.user = req.user || null;
  next();

})

//////Routes/////
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Static Files
app.use(express.static(path.join(__dirname, "public")));

//Server is listening

app.listen(app.get('port'),()=>{
    console.log('Sever on port', app.get('port'));
    
});


module.exports = app;
