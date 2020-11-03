const express = require("express");
const security = require('../Security/verifier');
const router = express.Router();
const mysqlConnection = require('../config/connect');

router.get('/facturas/:id/productos', security, (req, res) => {
    let idfactura = req.params.id
    mysqlConnection.query(`SELECT pf.id, pf.factura_id, f.empleado_id, f.cliente_id, pf.producto_id, p.nombre, p.precio, pf.cantidad, pf.subtotal, f.estado FROM productos_facturas AS pf INNER JOIN facturas as f ON pf.factura_id = f.id INNER JOIN productos AS p ON pf.producto_id = p.id WHERE f.id = ${idfactura}`,
        (err, rows, field) => {
            if (!err) {
                res.status(200).send(rows)
            }
            else {
                res.status(500).send(err)
            }
        });
});

router.post('/facturas/:id/detalle', security, (req, res) => {
    let body = req.body;
    mysqlConnection.query(`INSERT INTO productos_facturas (cantidad, creado_por, factura_id, producto_id, subtotal) VALUES (${body.cantidad}, '${body.creado_por}', ${body.factura_id},'${body.producto_id}',${body.subtotal})`,
        (err, rows, field) => {
            if (!err) {
                res.json({ status: 'POST PRODUCTOS_FACTURAS' });
            }
            else {
                res.status(500).send(err)
            }
        });
});

router.delete('/facturas/:id/detalle/id_producto', security, (req, res) => {
    let id = req.params.id
    mysqlConnection.query(`DELETE FROM productos_facturas WHERE id = ${id}`,
        (err, rows, field) => {
            if (!err) {
                res.json({ status: 'DELETE PRODUCTOS_FACTURAS' });
            }
            else {
                res.status(500).send(err)
            }
        });
});

module.exports = router;