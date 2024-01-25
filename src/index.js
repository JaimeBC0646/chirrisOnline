/*CONFIGURACIÓN BÁSICA (Express)*/

import express from 'express';
import { engine } from 'express-handlebars';
import morgan from 'morgan';
import {join, dirname} from 'path';
import { fileURLToPath } from 'url';
import productosRoutes from './routes/productos.routes.js';
import login_registroRoutes from './routes/login-registro.routes.js';



//INITIALIZATION
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));



//SETTINGS  - (motor d plantillas)
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout:'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');



//MIDLEWARE- (peticiones HTTP que llegan al server)
app.use(morgan('dev')); //Error #404
app.use(express.urlencoded({extended: true}));
app.use(express.json());


//ROUTES
app.get('/', (req, res)=>{
    res.render('index')
});

app.get('/login', (req, res)=>{
    res.render('login-registro/login')
});

app.get('/registro', (req, res)=>{
    res.render('login-registro/registro')
});


app.get('/registrarCliente', (req, res)=>{
    res.render('login-registro/registro')
});



app.get('/promo', (req, res)=>{
    res.render('promociones')
});

app.get('/', (req, res)=>{
    res.render('index')
});


app.use(productosRoutes);
app.use(login_registroRoutes);




//PUBLIC FILES - (todo los archivos encontrados en la carpeta public podran ser accesibles)
app.use(express.static(join(__dirname, 'public')));






//MANEJO DE ERRORES

/* Provocar Error 400 */
app.get('/simError400', (req, res, next) => {
    const parametroEsperado = req.query.parametroEsperado;

    if (!parametroEsperado) {
        // Si el parámetro esperado no está presente, provocar error 400
        const error = new Error('Falta el parámetro esperado');
        error.status = 400;
        next(error);
    } else {
        // Continuar con la lógica normal si el parámetro está presente
        res.send('Operación exitosa');
    }
});

/* Provocar Error 500 */
app.get('/simError500', (req, res, next) => {
    try {
        throw new Error('Error #500 simulado');
    } catch (error) {
        //Pasa el error al siguiente middleware
        next(error);
    }
});


/* Manejar Error 404 */
app.use((req, res) => {
    /*Vista de Error 404 en caso de no encontrar alguna ruta especificada*/
    res.status(404).render('errorViews/error404');
});

/* Manejar Error 400 */
app.use((err, req, res, next) => {
    if (err.status === 400) {
        /*Vista de Error 400 en caso de no obtener un parametro esperado*/
        res.status(400).render('errorViews/error400');
    } else {
        // Pasar el error al siguiente middleware si no es un error 400
        next(err);
    }
});

/* Manejar Error 500 */
app.use((err, req, res, next) => {
    /*Vista de Error 404 en caso de no sufrir un error interno en el servidor*/
    console.error(err.stack);
    res.status(500).render('errorViews/error500');
});






//RUN SERVER - inicia el servidor y se muestra en el navegador
  /*npm run dev*/
app.listen(app.get('port'), ()=>
    console.log('Server listening on port', app.get('port')));