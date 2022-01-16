const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const app = express();

// Configuración
app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(methodOverride('_method'));

// Setup para el req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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


