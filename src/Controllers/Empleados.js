const express = require("express");
const security = require('../Security/verifier');
const router = express.Router();
const mysqlConnection = require('../config/connect');

router.get('/empleados', security, (req, res) => {
    mysqlConnection.query('SELECT * FROM empleados', (err, rows, field) => {
        if (!err) {
            res.status(200).send(rows)
        }
        else {
            res.status(500).send(err)
        }
    });
});

router.get('/empleados/:id', security, (req, res) => {
    let id = req.params.id
    mysqlConnection.query(`SELECT * FROM empleados WHERE id = ${id}`,
        (err, rows, field) => {
            if (!err) {
                res.status(200).send(rows)
            }
            else {
                res.status(500).send(err)
            }
        });
});

router.post('/empleados', security, (req, res) => {
    let body = req.body;
    mysqlConnection.query(`INSERT INTO empleados (nombre, codigo, salario, creado_por) VALUES ('${body.nombre}','${body.codigo}',${body.salario},'${body.creado_por}')`,
        (err, rows, field) => {
            if (!err) {
                res.json({status: 'POST EMPLEADO'});
            }
            else {
                console.status(200).send(err)
            }
        });
});

router.put('/empleados/:id', security, (req, res) => {
    let id = req.params.id
    let body = req.body;
    mysqlConnection.query(`UPDATE empleados SET codigo = '${body.codigo}', creado_por = '${body.creado_por}', nombre = '${body.nombre}', salario = ${body.salario} WHERE id = ${id}`,
        (err, rows, field) => {
            if (!err) {
                res.json({status: 'PUT EMPLEADO'});
            }
            else {
                res.status(500).send(err)
            }
        });
});


router.delete('/empleados/:id', security, (req, res) => {
    let id = req.params.id
    mysqlConnection.query(`DELETE FROM empleados WHERE id = ${id}`,
        (err, rows, field) => {
            if (!err) {
                res.json({status: 'DELETE EMPLEADO'});
            }
            else {
                res.status(500).send(err)
            }
        });
});

module.exports = router;
