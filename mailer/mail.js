const nodemailer = require("nodemailer");
require('dotenv').config()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

 async function sendMail(title, body, recipients) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: process.env.FROM, // sender address
        to: recipients, // list of receivers
        subject: title, // Subject lin
        text: 'dikaz',// e
        html: body, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

module.exports={
     sendMail
}