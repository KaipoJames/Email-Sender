"use strict";
const nodemailer = require("nodemailer");
const { send } = require("process");
const hbs = require("nodemailer-express-handlebars");


async function main() {
    let targetEmail = "kaipojames12@gmail.com";
    let wifeyEmail = "adriennehernaez@gmail.com";
    var gmailPassword = process.env.GMAIL_PASSWORD;

    var messageBody = "attachment";
    var filepath = "./attachments";
    var filename = "PureVanilla-NetherPortal.png";

    let transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
           user: targetEmail,
           pass: gmailPassword,
       },
    });
    transporter.use('compile', hbs({
        viewEngine: 'express-handlebars',
        viewPath: './views/'
    }))

    transporter.verify(function(error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to handle messages");
        }
    }); 

    var message = {
        from: targetEmail,
        to: targetEmail,
        subject: "From NodeMailer",
        text: messageBody,
        html: "<p>" + messageBody + "</p>",
        attachments: [{
            filename: filename,
            path: filepath + "/" + filename
        }]
    };

    transporter.sendMail(message, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Email Sent Successfully!");
        }
    });

    //console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);

