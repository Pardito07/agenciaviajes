import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';

dotenv.config({path: 'variables.env'});


//Asignar la funcion de express a una variable
const app = express();

//Conectar la base de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch( error => console.log(error));

//Habilitar PUG
app.set('view engine', 'pug');

//Obtener la fecha actual
app.use((req, res, next) =>{
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';
    next();
});

//Habilitar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}))

//Establecer como elemento estatico nuestra carpeta public
app.use(express.static('public'));

//Agregar las rutas de las paginas
app.use('/', router);

//Correr el servidor en el puerto definido
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;
app.listen(port, host, () =>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});