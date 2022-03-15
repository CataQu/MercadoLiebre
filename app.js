const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const app = express();
const cookie = require('cookie-parser');

// Configuración
app.use(cookie());
app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(methodOverride('_method'));

// Setup para el req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({secret: 'secreto', resave: false, saveUninitialized: false}));

//Middlewares
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware.js');
// const authMiddleware = require('./middlewares/authMiddleware.js');
// const guestMiddleware = require('./middlewares/guestMiddleware.js');
app.use(userLoggedMiddleware)
// app.use(guestMiddleware);
// app.use(authMiddleware);
// Rutas
const mainRouter = require('./routes/mainRouter.js');
const userRouter = require('./routes/userRouter.js');
const productsRouter = require('./routes/productsRouter.js');
// Archivo de rutas
app.use('/', mainRouter);

app.use('/user', userRouter);

app.use('/products', productsRouter);


app.listen(process.env.PORT || 3030, () => {
    console.log('Servidor corriendo correctamente en puerto 3030')
});


