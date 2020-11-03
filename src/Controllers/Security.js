const express = require("express");
const router = express.Router();
const mysqlConnection = require('../Config/connect');
const jwt = require('jsonwebtoken');



router.post('/login', (req, res) => {
    let body = req.body;
    let user;
    mysqlConnection.query(`SELECT * FROM usuarios WHERE nombre = '${body.userName}'`,
        (err, rows, fields) => {
            if (!err) {
                user = rows[0];
                if (user === undefined) {
                    return res.status(401).send('El usuario no existe')
                }
                if (body.passsword === user.passsword) {
                    const token = jwt.sign({ _id: user.id }, 'secret', { expiresIn: '1h' });
                    return res.status(200).json({ message: 'succesfully', token });
                } else {
                    return res.status(401).send('registro invalido');
                }
            } else {
                return res.status(500).send(err);
            }
        }
    );
});


module.exports = router;

