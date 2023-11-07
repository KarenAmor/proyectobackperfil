const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const sendMailContrasena = async (req, res) => {
  const { email } = req.body;

  const newPassword = `contrasenaTemporal123`; // Establecer una contraseña temporal fija

  // Crear el transportador
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'madonna.lockman@ethereal.email',
      pass: 'e5RgtNScxpJ4pHqQhF'
    }
  });

  // Crear las opciones del correo electrónico
  const mailOptions = {
    from: 'karedimor@gmail.com',
    to: email,
    subject: subject,
    html: modifiedTemplate,
  };

  // Enviar el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ error: error.message });
    }

    return res.status(200).json({ message: 'Se ha enviado la información de recuperación de contraseña' });
  });
};

module.exports = sendMailContrasena;