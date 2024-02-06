const { getRepository } = require("typeorm");
const { connectToDatabase } = require("../database");
const Clientes = require("../db/entities/Clientes");
const Asesores = require("../db/entities/Asesores");
const Credenciales = require("../db/entities/Credenciales");
const sendMail = require('../util/correoRecuperarContrasena');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function iniciarSesion(req, res) {
  const connection = await connectToDatabase();
  const clientRepository = getRepository(Clientes);
  const asesoresRepository = getRepository(Asesores);
  const credentialsRepository = getRepository(Credenciales);

  const { dni, password } = req.body;

  try {
    const credentials = await credentialsRepository.findOne({ where: { dni } });

    if (!credentials) {
      return res.status(404).send({ message: "Credenciales inválidas" });
    }

    const passwordMatch = await bcrypt.compare(password, credentials.password);

    if (!passwordMatch) {
      return res.status(401).send({ message: "Credenciales inválidas" });
    }

    const cliente = await clientRepository.findOne({ where: { dni } });

    // Verifica si el DNI está presente en la tabla de asesores
    const asesor = await asesoresRepository.findOne({ where: { dni } });

    console.log('Datos del cliente:', cliente); // Imprime los datos del cliente

    // Ahora, creamos un token JWT con la información del usuario
    try {
      const token = jwt.sign(
        { userId: cliente.id, dni: cliente.dni, role: asesor ? 'asesor' : 'cliente' },
        'tu_secreto',
        { expiresIn: '1h' }
      );
      console.log('Token generado:', token); // Imprime el token generado
    } catch (tokenError) {
      console.error('Error al generar el token:', tokenError); // Imprime el error al generar el token
    }

    if (asesor) {
      res.status(200).json({ message: "Inicio de sesión exitoso, Asesor", cliente, token });
    } else {
      res.send({ message: "Inicio de sesión exitoso, Bienvenido", cliente });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error); // Imprime el error al iniciar sesión
    res.status(500).send({ error: "Error al iniciar sesión" });
  }
}

async function modificarContrasena(req, res) {
  const connection = await connectToDatabase();
  const credentialsRepository = getRepository(Credenciales);

  const { dni, oldPassword, newPassword } = req.body;

  try {
    const credentials = await credentialsRepository.findOne({ where: { dni } });

    if (!credentials) {
      return res.status(404).send({ message: "Credenciales no encontradas" });
    }

    const passwordMatch = await bcrypt.compare(oldPassword, credentials.password);

    if (!passwordMatch) {
      return res.status(401).send({ message: "La contraseña actual no coincide" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    credentials.password = hashedPassword;

    await credentialsRepository.save(credentials);

    res.status(200).json({ message: "Contraseña modificada exitosamente" });
  } catch (error) {
    console.error("Error al modificar la contraseña:", error);
    res.status(500).send({ error: "Error al modificar la contraseña" });
  }
}

async function recuperarContrasena(req, res) {
  const connection = await connectToDatabase();
  const credentialsRepository = getRepository(Credenciales);
  const clientRepository = getRepository(Clientes);

  const { dni } = req.body;

  try {
    const credentials = await credentialsRepository.findOne({ where: { dni } });
    const cliente = await clientRepository.findOne({
      where: { dni },
    });

    if (!cliente) {
      return res.status(404).send({ message: "Cliente no encontrado" });
    }
    //con el dni debe traer la contraseña que esta en la tabla credenciales.password,nombre y apellido del cliente
    const email = cliente.email;
    const subject = 'Recuperar Contrasena';
    const templatePath = '../util/recuperarContrasena.html';
    if (!credentials) {
      return res.status(404).send({ message: "No se encontraron credenciales para este DNI" });
    }
    await sendMail(email, subject, templatePath, cliente.nombre, cliente.apellido)
    // Aquí puedes implementar la lógica para enviar un correo electrónico con la contraseña temporal o un enlace para restablecer la contraseña.

    res.status(200).json({ message: "Se ha enviado la información de recuperación de contraseña" });
  } catch (error) {
    console.error("Error al recuperar la contraseña:", error);
    res.status(500).send({ error: "Error al recuperar la contraseña" });
  }
}

module.exports = { iniciarSesion, modificarContrasena, recuperarContrasena };