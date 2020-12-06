"use strict";
const path = require("path");
const nodemailer = require("nodemailer");
const { send } = require("process");
const hbs = require("nodemailer-express-handlebars");


async function main() {
    let targetEmail = "kaipojames12@gmail.com";
    let wifeyEmail = "adriennehernaez@gmail.com";
    var gmailPassword = process.env.GMAIL_PASSWORD;

    var messageBody = "templates";
    var filepath = "./attachments";
    var filename = "PureVanilla-NetherPortal.png";
    var viewsPath = path.join(__dirname, "views");
    console.log("viewsPath = " + viewsPath);

    var options = {
        viewEngine : {
            extname: '.handlebars', // handlebars extension
            layoutsDir: viewsPath, // location of handlebars templates
            defaultLayout: 'index', // name of main template
            partialsDir: viewsPath, // location of your subtemplates aka. header, footer etc
        },
        viewPath: viewsPath,
        extName: '.handlebars'
        };

    let transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
           user: targetEmail,
           pass: gmailPassword,
       },
    });
    // transporter.use('compile', hbs({
    //     viewEngine: 'express-handlebars',
    //     viewPath: viewsPath,
    // }))
    transporter.use('compile', hbs(options));

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
        attachments: [{
            filename: filename,
            path: filepath + "/" + filename
        }],
        template: 'index'
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

