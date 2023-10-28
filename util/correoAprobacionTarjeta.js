const nodemailer = require('nodemailer');

// Configurar el servicio de correo
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'karedimor@gmail.com',
        pass: 'tupassword'
    }
});

// Detalles del correo electrónico
let mailOptions = {
    from: 'tucorreo@gmail.com',
    to: 'correodestino@gmail.com',
    subject: '¡Tarjeta Aprobada!',
    text: 'Su tarjeta ha sido aprobada. ¡Felicidades!'
};

// Enviar el correo electrónico
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Correo electrónico enviado: ' + info.response);
    }
});