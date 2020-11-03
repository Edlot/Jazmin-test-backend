const express = require("express");
const security = require('../Security/verifier');
const router = express.Router();
const mysqlConnection = require('../config/connect');

router.get('/clientes/:id/facturas', security, (req, res) => {
    let idcliente = req.params.id
    mysqlConnection.query(`SELECT f.id, f.cliente_id, f.creado, f.empleado_id, f.estado, cl.nit, cl.nombre FROM facturas AS f INNER JOIN clientes AS cl ON cl.id = f.cliente_id WHERE cl.id = ${idcliente}`,
        (err, rows, field) => {
            if (!err) {
                res.status(200).send(rows)
            }
            else {
                res.status(500).send(err)
            }
        });
});

router.get('/empleados/:id/facturas', security, (req, res) => {
    let idempleado = req.params.id;
    mysqlConnection.query(`SELECT f.id, f.cliente_id, f.creado, f.empleado_id, f.estado, em.codigo, em.nombre FROM facturas AS f INNER JOIN empleados AS em ON f.empleado_id = em.id WHERE em.id = ${idempleado}`,
        (err, rows, field) => {
            if (!err) {
                res.status(200).send(rows);
            }
            else {
                res.status(500).send(err);
            }
        });
});

router.get('/facturas/:id', security, (req, res) => {
    let id = req.params.id;
    mysqlConnection.query(`SELECT * FROM facturas WHERE id = ${id}`,
        (err, rows, field) => {
            if (!err) {
                res.status(200).send(rows);
            }
            else {
                res.status(500).send(err);
            }
        });
});

router.post('/facturas', security, (req, res) => {
    let body = req.body;
    mysqlConnection.query(`INSERT INTO facturas (cliente_id, creado, empleado_id, estado) VALUES (${body.cliente_id}, '${body.creado}', ${body.empleado_id}, '${body.estado}')`,
        (err, rows, field) => {
            if (!err) {
                res.json({ status: 'POST FACTURAS' });
            }
            else {
                res.status(500).send(err);
            }
        });
});

router.put('/facturas/:id', security, (req, res) => {
    let id = req.params.id;
    let body = req.body;
    mysqlConnection.query(`UPDATE facturas SET cliente_id = ${body.cliente_id}, creado = '${body.creado}', empleado_id = ${body.empleado_id}, estado ='${body.estado}' WHERE id = ${id}`,
        (err, rows, field) => {
            if (!err) {
                res.json({ status: 'PUT FACTURAS' });
            }
            else {
                res.status(500).send(err);
            }
        });
});

router.patch('/facturas/:id', security, (req, res) => {
    let id = req.params.id;
    let body = req.body;
    mysqlConnection.query(`UPDATE facturas SET estado = '${body.estado}' WHERE facturas.id = ${id}`,
        (err, rows, field) => {
            if (!err) {
                res.json({ status: 'PATCH FACTURAS' });
            }
            else {
                res.status(500).send(err);
            }
        });
});

router.delete('/facturas/:id', security, (req, res) => {
    let id = req.params.id;
    mysqlConnection.query(`UPDATE facturas SET estado = 'ANULADA' WHERE facturas.id = ${id}`,
        (err, rows, field) => {
            if (!err) {
                res.json({ status: 'DELETE FACTURAS' });
            }
            else {
                res.status(500).send(err);
            }
        });
});
module.exports = router;
