const express = require("express");
const security = require('../Security/verifier');
const router = express.Router();
const mysqlConnection = require('../config/connect');

router.get('/clientes', security, (req, res) => {
    mysqlConnection.query('SELECT * FROM clientes',
        (err, rows, field) => {
            if (!err) {
                res.status(200).send(rows)
            }
            else {
                res.status(500).send(err)
            }
        }
    );
});


router.get('/clientes/:id', security, (req, res) => {
    let id = req.params.id;
    mysqlConnection.query(`SELECT * FROM clientes WHERE id = ${id}`,
        (err, rows, field) => {
            if (!err) {
                res.status(200).send(rows)
            }
            else {
                res.status(500).send(err)
            }
        }
    );
});

router.post('/clientes', security, (req, res) => {
    let body = req.body;
    mysqlConnection.query(`INSERT INTO clientes (nombre, direccion, nit, creado_por) VALUES ('${body.nombre}','${body.direccion}','${body.nit}','${body.creado_por}')`,
        (err, rows, field) => {
            if (!err) {
                res.json({status: 'POST CLIENTE'});
            }
            else {
                res.status(500).send(err)
            }
        }
    );
});



router.put('/clientes/:id', security, (req, res) => {
    let id = req.params.id;
    let body = req.body;
    mysqlConnection.query(`UPDATE clientes SET creado_por = '${body.creado_por}', direccion = '${body.direccion}', nit = '${body.nit}', nombre = '${body.nombre}' WHERE id = ${id}`,
        (err, rows, field) => {
            if (!err) {
                res.json({status: 'PUT CLIENTE'});
            }
            else {
                res.status(500).send(err)
            }
        }
    );
});


router.delete('/clientes/:id', security, (req, res) => {
    let id = req.params.id
    mysqlConnection.query(`DELETE FROM clientes WHERE id = ${id}`,
        (err, rows, field) => {
            if (!err) {
                res.json({status: 'DELETE CLIENTE'});
            }
            else {
                res.status(500).send(err)
            }
        }
    );
});
module.exports = router;
