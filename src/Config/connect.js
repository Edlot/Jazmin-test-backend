const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'db4free.net',
  user: 'desaweb2020',
  password: 'desaweb2020',
  database: 'umg4desaweb',
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('Coneccion con DB establecida');
  }
});

module.exports = mysqlConnection;
