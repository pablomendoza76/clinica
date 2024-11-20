const mysql = require('mysql2');
const config = {
  host: 'localhost',
  user: 'root',
  password: 'UTPL2023',
  database: 'base',
};

const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conexión exitosa a la base de datos.');
  }
  connection.end();
});
