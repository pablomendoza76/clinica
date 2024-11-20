const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

// Configuración de la base de datos
const config = {
  host: 'localhost',
  user: 'root',
  password: 'UTPL2023',
  database: 'base'
};

class Database {
  constructor(config) {
    this.config = config;
    this.connection = null;
  }

  // Método para abrir la conexión
  abrir() {
    return new Promise((resolve, reject) => {
      this.connection = mysql.createConnection(this.config);

      this.connection.connect((err) => {
        if (err) {
          console.error('Error al conectarse a la base de datos:', err.message);
          reject(err);
        } else {
          console.log('Conexión exitosa a la base de datos.');
          resolve();
        }
      });
    });
  }

  // Método para ejecutar consultas
  ejecutarConsulta(sql, params = []) {
    return new Promise((resolve, reject) => {
      if (!this.connection) {
        return reject(new Error('No hay conexión establecida.'));
      }

      this.connection.query(sql, params, (err, results) => {
        if (err) {
          console.error('Error al ejecutar la consulta:', err.message);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Método para cerrar la conexión
  cerrar() {
    return new Promise((resolve, reject) => {
      if (!this.connection) {
        return reject(new Error('No hay conexión abierta para cerrar.'));
      }

      this.connection.end((err) => {
        if (err) {
          console.error('Error al cerrar la conexión:', err.message);
          reject(err);
        } else {
          console.log('Conexión cerrada exitosamente.');
          resolve();
        }
      });
    });
  }

  // Método para validar las credenciales
  async entrar_credenciales(correo, contrasena) {
    try {
      const query = 'SELECT * FROM Credenciales WHERE correo = ? AND contrasena = ?';
      const results = await this.ejecutarConsulta(query, [correo, contrasena]);

      if (results.length > 0) {
        // Si se encuentra un usuario con las credenciales, devolver el rol
        return {
          valido: true,
          rol: results[0].rol
        };
      } else {
        return {
          valido: false,
          mensaje: 'Credenciales incorrectas.'
        };
      }
    } catch (error) {
      console.error('Error al validar las credenciales:', error.message);
      throw error;
    }
  }
}

// Crear una instancia de la base de datos
const db = new Database(config);

// Configurar el servidor Express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para manejar el login (valida las credenciales)
app.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ error: 'Correo y contraseña son requeridos.' });
  }

  try {
    // Abrir la conexión a la base de datos
    await db.abrir();

    // Validar las credenciales
    const resultado = await db.entrar_credenciales(correo, contrasena);

    if (resultado.valido) {
      res.status(200).json({
        mensaje: `Bienvenido, rol: ${resultado.rol}`,
        rol: resultado.rol
      });
    } else {
      res.status(401).json({
        error: resultado.mensaje
      });
    }

    // Cerrar la conexión
    await db.cerrar();
  } catch (error) {
    res.status(500).json({ error: 'Error en la validación de credenciales.' });
  }
});

// Iniciar el servidor
const puerto = 3000;
app.listen(puerto, () => {
  console.log(`Servidor iniciado en el puerto ${puerto}`);
});
