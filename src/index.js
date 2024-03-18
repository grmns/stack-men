// Importar express y otros módulos necesarios
import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Importar las rutas de ventas y compras
import ventasRoutes from './routes/ventas.js'; // Rutas de ventas
import comprasRoutes from './routes/compras.js'; // Rutas de compras

console.log ('Tecsup - Hola mundo!');

// Inicialización de la aplicación
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));
app.engine('.hbs', engine({ 
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs' 
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Rutas
// Ruta principal
app.get('/', (req, res) => {
    res.render('index');
});

// Rutas de ventas
app.use('/ventas', ventasRoutes); // Utiliza las rutas de ventas

// Rutas de compras
app.use('/compras', comprasRoutes); // Utiliza las rutas de compras

// Archivos públicos
app.use(express.static(join(__dirname, 'public')));

// Iniciar el servidor
app.listen(app.get('port'), () => 
    console.log('Servidor en puerto', app.get('port'))
);
