const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

async function sendMail(email, subject, templatePath) {
  // Configurar el transportador
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'madonna.lockman@ethereal.email',
      pass: 'e5RgtNScxpJ4pHqQhF'
    }
  });

  // Definir el mensaje
  const mailOptions = {
    from: 'karedimor@gmail.com',
    to: email,
    subject: subject,
    html: fs.readFileSync(path.resolve(__dirname, templatePath), 'utf8')
  };

  try {
    // Enviar el correo electrónico
    let info = await transporter.sendMail(mailOptions);
    // URL de Ethereal para ver el correo electrónico enviado
    console.log('Vista previa del correo en Ethereal: %s', nodemailer.getTestMessageUrl(info));
    // Agregar esta línea para imprimir el objeto info completo
    console.log(info);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}

module.exports = sendMail;