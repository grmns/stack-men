// ventas.js

import express from 'express';
import connection from '../database/db.js'; // Importa la conexión a la base de datos

const router = express.Router();

// Ruta para la página de Caja
router.get('/caja', (req, res) => {
    // Consultar las transacciones de la base de datos
    connection.query('SELECT * FROM TransaccionesCaja ORDER BY fecha DESC', (error, results) => {
        if (error) {
            console.error('Error al obtener transacciones:', error);
            res.status(500).send('Error interno del servidor');
            return;
        }
        // Renderizar la vista de caja con las transacciones obtenidas
        res.render('ventas/caja', { transacciones: results });
    });
});

// Ruta para manejar la solicitud del formulario de agregar transacción
router.post('/caja/agregarTransaccion', (req, res) => {
    const { concepto, monto } = req.body;

    // Insertar los datos en la base de datos
    connection.query('INSERT INTO TransaccionesCaja (concepto, monto) VALUES (?, ?)', [concepto, monto], (error, result) => {
        if (error) {
            console.error('Error al insertar transacción:', error);
            res.status(500).send('Error interno del servidor');
            return;
        }
        console.log('Transacción agregada correctamente');
        res.redirect('/ventas/caja'); // Redirigir de vuelta a la página de caja después de la inserción
    });
});

// Ruta para acceder a la página de agregar cliente
router.get('/clientes/agregarCliente', (req, res) => {
    res.render('ventas/agregarCliente');
});

// Ruta para la página de Clientes
router.get('/clientes', (req, res) => {
    // Consultar la lista de clientes desde la base de datos
    connection.query('SELECT * FROM Cliente ORDER BY apellido, nombre', (error, results) => {
        if (error) {
            console.error('Error al obtener la lista de clientes:', error);
            res.status(500).send('Error interno del servidor');
            return;
        }
        // Renderizar la vista de clientes con la lista de clientes obtenida
        res.render('ventas/clientes', { clientes: results });
    });
});

// Ruta para manejar la solicitud del formulario de agregar cliente
router.post('/clientes/agregarCliente', (req, res) => {
    const { nombre, apellido, email, telefono } = req.body;

    // Obtener la fecha y hora actual
    const fechaRegistro = new Date();

    // Insertar los datos en la base de datos
    connection.query('INSERT INTO cliente (nombre, apellido, email, telefono, fecha_registro) VALUES (?, ?, ?, ?, ?)', [nombre, apellido, email, telefono, fechaRegistro], (error, result) => {
        if (error) {
            console.error('Error al insertar cliente:', error);
            res.status(500).send('Error interno del servidor');
            return;
        }
        console.log('Cliente agregado correctamente');
        res.redirect('/ventas/clientes'); // Redirigir de vuelta a la página de clientes después de la inserción
    });
});

// Ruta para acceder a la página de editar cliente
router.get('/clientes/editar/:id', (req, res) => {
    const clienteId = req.params.id;

    // Consultar el cliente con el ID proporcionado desde la base de datos
    connection.query('SELECT * FROM Cliente WHERE id = ?', [clienteId], (error, results) => {
        if (error) {
            console.error('Error al obtener el cliente:', error);
            res.status(500).send('Error interno del servidor');
            return;
        }

        // Verificar si se encontró el cliente
        if (results.length === 0) {
            res.status(404).send('Cliente no encontrado');
            return;
        }

        // Renderizar la vista de editar cliente con la información del cliente obtenida
        res.render('ventas/editarCliente', { cliente: results[0] });
    });
});



// Ruta para manejar la solicitud de editar cliente
router.post('/clientes/editarCliente/:id', (req, res) => {
    const clienteId = req.params.id;
    const { nombre, apellido, email, telefono } = req.body;

    // Actualizar los datos del cliente en la base de datos
    connection.query('UPDATE Cliente SET nombre = ?, apellido = ?, email = ?, telefono = ? WHERE id = ?', [nombre, apellido, email, telefono, clienteId], (error, result) => {
        if (error) {
            console.error('Error al actualizar cliente:', error);
            res.status(500).send('Error interno del servidor');
            return;
        }
        console.log('Cliente actualizado correctamente');
        res.redirect('/ventas/clientes'); // Redirigir de vuelta a la página de clientes después de la actualización
    });
});

// Ruta para manejar la solicitud de eliminar un cliente
router.get('/clientes/eliminar/:id', (req, res) => {
    const clienteId = req.params.id;

    // Eliminar el cliente de la base de datos
    connection.query('DELETE FROM Cliente WHERE id = ?', [clienteId], (error, result) => {
        if (error) {
            console.error('Error al eliminar cliente:', error);
            res.status(500).send('Error interno del servidor');
            return;
        }
        console.log('Cliente eliminado correctamente');
        res.redirect('/ventas/clientes'); // Redirigir de vuelta a la página de clientes después de la eliminación
    });
});

export default router;
