const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

async function sendMail(email, subject, templatePath, nombre, apellido) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'madonna.lockman@ethereal.email',
      pass: 'e5RgtNScxpJ4pHqQhF'
    }
  });

  const template = fs.readFileSync(path.resolve(__dirname, templatePath), 'utf8');
  const modifiedTemplate = template
    .replace('<%= nombre %>', nombre)
    .replace('<%= apellido %>', apellido)

  const mailOptions = {
    from: 'karedimor@gmail.com',
    to: email,
    subject: subject,
    html: modifiedTemplate,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Vista previa del correo en Ethereal: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}

module.exports = sendMail;