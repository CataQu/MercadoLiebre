const express = require('express');
const path = require('path');


const app = express();

// Configuración
app.use(express.static('public'));
app.set('view engine', 'ejs')
// Rutas
const mainRouter = require('./routes/mainRouter.js');
const userRouter = require('./routes/userRouter.js')
// Archivo de rutas
app.use('/', mainRouter);

app.use('/user', userRouter);


app.listen(process.env.PORT || 3030, () => {
    console.log('Servidor corriendo correctamente en puerto 3030')
});


