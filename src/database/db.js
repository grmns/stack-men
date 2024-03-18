// Importar el paquete mysql2
import mysql from 'mysql2';

// Crear una conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'grmn',
    password: 'grmn72463758',
    database: 'stack'
});

// Conectar a la base de datos
connection.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
        return;
    }
    console.log('Conexión a la base de datos establecida');
});

// Exportar la conexión para que pueda ser utilizada en otros archivos
export default connection;
