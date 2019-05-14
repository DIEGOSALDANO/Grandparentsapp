  //Declaramos variables constantes
  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const path = require('path');
  const expressSession = require('express-session');
  const exphbs = require('express-handlebars');

  // Handlebars por default, layout main base y 
  //  otros layouts que hubiera
  app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts')
  }));

  // Acá seteamos como motor de renderizado de vistas "handlebars"
  app.set('view engine', 'handlebars')
  // Y acá seteamos la carpeta para las vistas
  app.set('views', path.join(__dirname, '/views'));

   //iniciar loguin

  //Rutas estáticas
  app.use(express.static(path.join(__dirname, '../public')));
 
  // GET /
  app.get('/', (req, res) => {
    console.log("GET /")
 
    // Responde con la página index.html
    let pathIndex = path.join(__dirname, '../public/index.html');
    res.sendFile(pathIndex);

  });

  //condiciones de login
  
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
        res.redirect('/home');
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

  // GET logout
  app.get('/logout', (req, res) => {

    // Destruyo sesión y redirijo al login.
    req.session.destroy();
    res.redirect("/");

  });

  // GET al raíz, renderiza un HTML
  app.get('/home', (req, res) => {
    res.render('home');
  });
  
  // // GET al raíz, renderiza un HTML
  // app.get('/', (req, res) => {
  //     res.render('/main');
  // });

  // // GET al raíz, renderiza un HTML
  // app.get('/main', (req, res) => {
  //   res.render('/prueba');
  // });

  // GET a pacientes, renderiza pacientes.handlebars
  app.get('/pacientes', (req, res) => {
    res.render('pacientes');
  });

  //Get de calendario
  app.get('/calendario', function (req, res) {
  res.render('calendario');
  });

  //Get de estadisticas
  app.get('/estadisticas', function (req, res) {
  res.render('estadisticas');
  });
  
  //Get de estadisticas
  app.get('/caja', function (req, res) {
    res.render('caja');
    });

    //Server iniciado en puerto 3000
  app.listen(3000, function () {
    console.log('Escuchando puerto 3000 con Express');
  });
  