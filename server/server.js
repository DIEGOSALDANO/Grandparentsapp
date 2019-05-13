  //Declaramos variables constantes
  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const path = require('path');
  const expressSession = require('express-session');
  const exphbs = require('express-handlebars');

  //iniciar en index donde debemos loguear

  //Rutas estáticas
  app.use(express.static(path.join(__dirname, '../public')));
 
  // GET /
  app.get('/', (req, res) => {
    console.log("GET /")
 
    // Responde con la página index.html
    let pathIndex = path.join(__dirname, '../public/index.html');
    res.sendFile(pathIndex);

  });

  // JS propios
  const login = require('./login');


  // Manejo de sesión en Express.
  app.use(expressSession({
    secret: 'el capitalismo es irracional',
    resave: false,
    saveUninitialized: false
  }));

  // Middleware de body-parser para json
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  //crear las conciciones de login

  // POST /login
  app.post('/login', (req, res) => {
    
    if (req.body.user !== undefined && req.body.password !== undefined) {

      if (login.validarUsuario(req.body.user, req.body.password)) {
        // Si validó bien, guardo la sesión y voy al home
        req.session.userId = req.body.user;
        res.redirect('./home.html');
      } else {
        // Si validó mal, destruyo la sesión (por si la hubiera) y recargo página inicial
        req.session.destroy();
        res.redirect('/');
      }

    } else {
      // Lo mismo si el usuario o clave no fueron enviados
      req.session.destroy();
      res.redirect('/');
    }
    
  });

  // GET /home
  app.get('/home.html', (req, res) => {

    // Cuando quiere ir a home, valido sesión.
    if (req.session.userId !== undefined) {
      // Responde con la página home.html
      res.sendFile(path.join(__dirname, '../home.html'));
    } else {
      // Si mi usuarix tipeó "localhost:3000/home" en la barra de direcciones del navegador y
      // no tenía una sesión activa, lo redirijo a la página que tiene el login.
      res.redirect("/");
    }

  });

  // GET logout
  app.get('/logout', (req, res) => {

    // Destruyo sesión y redirijo al login.
    req.session.destroy();
    res.redirect("/");

  });


  //validar login

  //ingresar a home

  //crear rutas para botones de pestaña sidebar


  //Server iniciado en puerto 3000
  app.listen(3000, function () {
    console.log('Escuchando puerto 3000 con Express');
  });

  // Enviamos el archivo index.html

  // // Configuramos vistas con Handlebars

  // // Acá indicamos el motor, layout (base) default y carpeta de
  // // ese y otros layouts que hubiera
  // app.engine('handlebars', exphbs({
  //   defaultLayout: 'main',
  //   layoutsDir: path.join(__dirname, 'views/layout')
  // }));

  // // Acá seteamos como motor de renderizado de vistas "handlebars"
  // app.set('view engine', 'handlebars')
  // // Y acá seteamos la carpeta para las vistas
  // app.set('views', path.join(__dirname, 'views'));

  // // GET al raíz, renderiza un HTML
  // app.get('/', (req, res) => {
  //     res.render('/main');
  // });





  // // // Configuramos vistas con Handlebars

  // // // Acá indicamos el motor, layout (base) default y carpeta de
  // // // ese y otros layouts que hubiera
  // // app.engine('handlebars', exphbs({
  // //   defaultLayout: 'home.handlebars',
  // //   layoutsDir: path.join(__dirname, 'views/layout')
  // // }));
  // // // Acá seteamos como motor de renderizado de vistas "handlebars"
  // // app.set('view engine', 'handlebars')
  // // // Y acá seteamos la carpeta para las vistas
  // // app.set('views', path.join(__dirname, 'views'));


  // // // GET al raíz, renderiza un HTML
  // // app.get('/', (req, res) => {
  // //     res.redirect('/home.handlebars');
  // // });

  // // GET a home, renderiza un HTML
  // app.get('/home', (req, res) => {
  //   res.render('home', {
  //       title: 'Mi app HBS - Home'
  //   });
  