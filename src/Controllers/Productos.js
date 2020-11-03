const express = require("express");
const security = require('../Security/verifier');
const router = express.Router();
const mysqlConnection = require('../config/connect');

router.get('/productos', security, (req, res) => {
    mysqlConnection.query('SELECT * FROM productos',
        (err, rows, field) => {
            if (!err) {
                res.status(200).send(rows)
            }
            else {
                res.status(500).send(err)
            }
        });
});

router.get('/productos/:id', security, (req, res) => {
    let id = req.params.id
    mysqlConnection.query(`SELECT * FROM productos WHERE id = ${id}`,
        (err, rows, field) => {
            if (!err) {
                res.status(200).send(rows)
            }
            else {
                res.status(500).send(err)
            }
        });
});

router.post('/productos', security, (req, res) => {
    let body = req.body;
    mysqlConnection.query(`INSERT INTO productos (nombre, precio, creado_por) VALUES ('${body.nombre}', ${body.precio},'${body.creado_por}')`,
        (err, rows, field) => {
            if (!err) {
                res.json({status: 'POST PRODUCTOS'});
            }
            else {
                res.status(500).send(err)
            }
        });
});

router.put('/productos/:id', security, (req, res) => {
    let id = req.params.id
    let body = req.body;
    mysqlConnection.query(`UPDATE productos SET creado_por = '${body.creado_por}', nombre = '${body.nombre}', precio = ${body.precio} WHERE id = ${id}`,
        (err, rows, field) => {
            if (!err) {
                res.json({status: 'PUT PRODUCTOS'});
            }
            else {
                res.status(500).send(err)
            }
        });
});

router.delete('/productos/:id', security, (req, res) => {
    let id = req.params.id
    mysqlConnection.query(`DELETE FROM productos WHERE id = ${id}`,
        (err, rows, field) => {
            if (!err) {
                res.json({status: 'DELETE PRODUCTOS'});
            }
            else {
                res.status(500).send(err)
            }
        });
});
module.exports = router;