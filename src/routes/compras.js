// compras.js

import express from 'express';
import connection from '../database/db.js'; // Importa la conexión a la base de datos

const router = express.Router();

// Rutas para la página de órdenes de compra
router.get('/ordenCompra', (req, res) => {
    // Consultar las órdenes de compra desde la base de datos
    connection.query('SELECT * FROM orden_de_compra ORDER BY fecha DESC', (error, results) => {
        if (error) {
            console.error('Error al obtener órdenes de compra:', error);
            res.status(500).send('Error interno del servidor');
            return;
        }
        // Renderizar la vista de órdenes de compra con los resultados obtenidos
        res.render('compras/ordenCompra', { ordenesDeCompra: results });
    });
});

// Rutas para la página de proveedores
router.get('/proveedores', (req, res) => {
    // Consultar la lista de proveedores desde la base de datos
    connection.query('SELECT * FROM proveedor ORDER BY nombre', (error, results) => {
        if (error) {
            console.error('Error al obtener la lista de proveedores:', error);
            res.status(500).send('Error interno del servidor');
            return;
        }
        // Renderizar la vista de proveedores con la lista obtenida
        res.render('compras/proveedores', { proveedores: results });
    });
});


// Ruta para manejar la solicitud del formulario de agregar proveedor
router.post('/proveedores/agregarProveedor', (req, res) => {
    const { nombre, direccion, telefono } = req.body;

    // Insertar los datos en la base de datos
    connection.query('INSERT INTO proveedor (nombre, direccion, telefono) VALUES (?, ?, ?)', [nombre, direccion, telefono], (error, result) => {
        if (error) {
            console.error('Error al insertar proveedor:', error);
            res.status(500).send('Error interno del servidor');
            return;
        }
        console.log('Proveedor agregado correctamente');
        res.redirect('/compras/proveedores'); // Redirigir de vuelta a la página de proveedores después de la inserción
    });
});

// Ruta para la página de editar proveedor
router.get('/proveedores/editar/:id', (req, res) => {
    const proveedorId = req.params.id;

    // Consultar el proveedor con el ID proporcionado desde la base de datos
    connection.query('SELECT * FROM proveedor WHERE id = ?', [proveedorId], (error, results) => {
        if (error) {
            console.error('Error al obtener el proveedor:', error);
            res.status(500).send('Error interno del servidor');
            return;
        }

        // Verificar si se encontró el proveedor
        if (results.length === 0) {
            res.status(404).send('Proveedor no encontrado');
            return;
        }

        // Renderizar la vista de editar proveedor con la información obtenida
        res.render('compras/editar-proveedor', { proveedor: results[0] });
    });
});

// Ruta para manejar la solicitud de editar proveedor
router.post('/proveedores/editar/:id', (req, res) => {
    const proveedorId = req.params.id;
    const { nombre, direccion, telefono } = req.body;

    // Actualizar los datos del proveedor en la base de datos
    connection.query('UPDATE proveedor SET nombre = ?, direccion = ?, telefono = ? WHERE id = ?', [nombre, direccion, telefono, proveedorId], (error, result) => {
        if (error) {
            console.error('Error al actualizar proveedor:', error);
            res.status(500).send('Error interno del servidor');
            return;
        }
        console.log('Proveedor actualizado correctamente');
        res.redirect('/compras/proveedores'); // Redirigir de vuelta a la página de proveedores después de la actualización
    });
});

// Ruta para manejar la solicitud de eliminar proveedor
router.post('/proveedores/eliminar/:id', (req, res) => {
    const proveedorId = req.params.id;

    // Eliminar el proveedor de la base de datos
    connection.query('DELETE FROM proveedor WHERE id = ?', [proveedorId], (error, result) => {
        if (error) {
            console.error('Error al eliminar proveedor:', error);
            res.status(500).send('Error interno del servidor');
            return;
        }
        console.log('Proveedor eliminado correctamente');
        res.redirect('/compras/proveedores'); // Redirigir de vuelta a la página de proveedores después de la eliminación
    });
});

// Ruta para la página de agregar orden de compra
router.get('/ordenCompra/agregarOrden', (req, res) => {
    // Consultar la lista de proveedores desde la base de datos
    connection.query('SELECT * FROM proveedor ORDER BY nombre', (error, results) => {
        if (error) {
            console.error('Error al obtener la lista de proveedores:', error);
            res.status(500).send('Error interno del servidor');
            return;
        }
        // Renderizar la vista de agregar orden de compra con la lista de proveedores obtenida
        res.render('compras/agregarOrden', { proveedores: results });
    });
});

// Ruta para manejar la solicitud del formulario de agregar orden de compra
router.post('/ordenCompra/agregarOrden', (req, res) => {
    const { proveedor_id, fecha, total } = req.body;

    // Insertar los datos en la base de datos
    connection.query('INSERT INTO orden_de_compra (proveedor_id, fecha, total) VALUES (?, ?, ?)', [proveedor_id, fecha, total], (error, result) => {
        if (error) {
            console.error('Error al insertar orden de compra:', error);
            res.status(500).send('Error interno del servidor');
            return;
        }
        console.log('Orden de compra agregada correctamente');
        res.redirect('/compras/ordenCompra'); // Redirigir de vuelta a la página de órdenes de compra después de la inserción
    });
});

// Ruta para manejar la solicitud del formulario de editar orden de compra
router.post('/ordenCompra/editar/:id', (req, res) => {
    const ordenId = req.params.id;
    const { proveedor_id, fecha, total } = req.body;

    // Actualizar los datos de la orden de compra en la base de datos
    connection.query('UPDATE orden_de_compra SET proveedor_id = ?, fecha = ?, total = ? WHERE id = ?', [proveedor_id, fecha, total, ordenId], (error, result) => {
        if (error) {
            console.error('Error al actualizar orden de compra:', error);
            res.status(500).send('Error interno del servidor');
            return;
        }
        console.log('Orden de compra actualizada correctamente');
        res.redirect('/compras/ordenCompra'); // Redirigir de vuelta a la página de órdenes de compra después de la actualización
    });
});

// Ruta para manejar la solicitud de eliminar orden de compra
router.post('/ordenCompra/eliminar/:id', (req, res) => {
    const ordenId = req.params.id;

    // Eliminar la orden de compra de la base de datos
    connection.query('DELETE FROM orden_de_compra WHERE id = ?', [ordenId], (error, result) => {
        if (error) {
            console.error('Error al eliminar orden de compra:', error);
            res.status(500).send('Error interno del servidor');
            return;
        }
        console.log('Orden de compra eliminada correctamente');
        res.redirect('/compras/ordenCompra'); // Redirigir de vuelta a la página de órdenes de compra después de la eliminación
    });
});

export default router;
