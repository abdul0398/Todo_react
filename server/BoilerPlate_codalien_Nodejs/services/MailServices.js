const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

class Mailservice{
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: "help.slytechadvice@gmail.com",
                pass: "haagycjrnqdkkoky"
            }
        });
    }
    async assignUser(email){
        let mailOptions = {
            from: 'help.slytechadvice@gmail.com',
            to: email,
            subject: 'You are invited in a group',
            text: `please click on the link to accept the invite http://localhost:3000/api/verifyUser/${token}`
        };
        await this.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
       
    }

    async resend(email){
        const token = jwt.sign({
            data: email
        }, 'aksdbkasbdkajsbdkajdb', {expiresIn: '1h'});
        let mailOptions = {
            from: 'help.slytechadvice@gmail.com',
            to: email,
            subject: 'You are invited in a group',
            text: `please click on the link to accept the invite http://localhost:3000/api/verifyUser/${token}`
        };
        await this.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    async assignTask(assignemail, desc){
        let mailOptions = {
            from: 'help.slytechadvice@gmail.com',
            to: assignemail,
            subject: 'You have assigned a task',
            text: desc
        };
        await this.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}
exports = module.exports = Mailservice;