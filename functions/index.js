const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
var http = require('http');
var app = express();
const nodemailer = require('nodemailer');
var email = ["vinayraju.dbit@gmail.com"]; //,schonkar@miraclesoft.com

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/vinay', (req, res) => {
    res.send('Hello miracle soft');
});

/* app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html')
}); */

app.post('/add', (req, res) => {
    "use strict";
    console.log("Form data", req.body);
    email.push(req.body.email);
    const output = `
        <h1>Customer Details from ROI calculator</h1>
        <ul>
            <li>First Name: ${req.body.firstName}</li>
            <li>Last Name: ${req.body.lastName}</li>
            <li>Organization: ${req.body.organization}</li>
            <li>Email: ${req.body.email}</li>
            <li>Looking at bot use cases? ${req.body.botUCase}</li>
        </ul>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.miraclesoft.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'vbasavaraje@miraclesoft.com', // generated ethereal user
            pass: 'Graduated@17' // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    // setup email data with unicode symbols  -  schonkar@miraclesoft.com
    let mailOptions = {
        from: '"Roi Calculator" <vbasavaraje@miraclesoft.com>', // sender address
        to: email, // list of receivers
        subject: 'Customer Information', // Subject line
        //text: 'Hello world?', // plain text body
        html: output // html body
    };
    console.log("Email is here ------------------> ", email);

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.send(info);
    });
});

app.post('/send', (req, res) => {
    "use strict";
    email.push(req.body.email);
    console.log("Form data", req.body);
    const output = `
        <h1>Thank you for using ROI calculator!! </h1>
        <h6>Please find the summary of the previous calculation</h6>
        Support summary
        <ul>
            <li><h6>Support Cost for a year : $${req.body.supTotal}</h6><h6>for 3 years : $${req.body.finalSupTot}</h6></li>
        </ul>
        Product summary
        <ul>
            <li><h6>Product Cost for a year : $${req.body.prodTotal}</h6><h6>for 3 years : $${req.body.finalProdTot}</h6></li>
        </ul>
        Implementation summary
        <ul>
            <li><h6>Implementation Cost for 1st year : $${req.body.implTotal1}</h6><h6>for 2nd year and following years : $${req.body.implTotal2}</h6>
            <h6>Implementation Cost for 3 years : $${req.body.finalImplTot}</h6></li>
        </ul>
        <small> © 2018 Miracle Software Systems, Inc. </small>
    `;
    console.log("Email is here ------------------> ", email);
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.miraclesoft.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'vbasavaraje@miraclesoft.com', // generated ethereal user
            pass: 'Graduated@17' // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols - schonkar@miraclesoft.com
    let mailOptions = {
        from: '"Roi Calculator" <vbasavaraje@miraclesoft.com>', // sender address
        to: email, // list of receivers
        subject: 'Customer Information', // Subject line
        //text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.send(info);
    });
});


exports.app = functions.https.onRequest(app);