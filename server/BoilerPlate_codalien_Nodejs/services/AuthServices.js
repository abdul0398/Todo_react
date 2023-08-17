const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
class AuthServices {
    static async signUp(req, res) {
        const {name, email, password} = req.body;
        const user = await _db.User.findOne({email: email});
        if (user) {
            return res.status(403).json("email is already is use");
        } else {
            bcrypt.hash(password, 7, async function (err, hash) {
                const user = await _db.User.create({name, email, password: hash});
                req.loginUser(user);
                delete req.user.password;
                console.log(req.user);
                res.status(200).json({user: req.user});
            });
        }
    };
    static logOut(req, res) {
        req.logOut();
        res.status(200).json("logout successfully");
    }
    static async login(req, res) {
        const {email, password} = req.body;
        const user = await _db.User.findOne({email: email});
        if (! user) 
            return res.status(403).json("Invalid email address");
        
        bcrypt.compare(password, hash).then((bool) => {
            if (bool) {
                req.loginUser(user);
                delete req.user.password;
                res.status(200).json({"user": req.user});
            }else{
                res.status(403).json("Passowrd is incorrect");
            }
        });

    }
    static async onstart(req, res) {
        if (!req.isAuthenticated) 
            return res.status(400).json("Token is not present");
         else {
            return res.status(200).json({user: req.user});
        }
    }
    static async verifyUser(req, res) {
        const token = req.params.token;
        console.log(token);
        try {
            const verified = jwt.verify(token, "aksdbkasbdkajsbdkajdb");
            if (verified) {
                console.log(verified);
                await _db.AssignUser.findOneAndUpdate({
                    email: verified.data
                }, {isverified: true});
                res.json("You have successfully verfied");
            }
        } catch (error) {
            res.json("Link is not valid Sorry");
        }

    }
    static async createtask(req, res) {
        const {desc, assignemail, duedate} = req.body;
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: "help.slytechadvice@gmail.com",
                pass: "haagycjrnqdkkoky"
            }
        });
        let mailOptions = {
            from: 'help.slytechadvice@gmail.com',
            to: assignemail,
            subject: 'You have assigned a task',
            text: desc
        };
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        const id = req.user._id;
        const task = await _db.Task.create({desc, assignemail, duedate, status: "pending"})
        const currentUser = await _db.User.findOne({_id: id});
        currentUser.tasks.push(task);
        currentUser.save();
        res.status(200).json("Added successfully");
    }
    static async gettask(req, res) {
        const user = await _db.User.findOne({_id: req.user._id}).populate('tasks');
        res.status(200).json(user.tasks);
    }
    static async resend(req, res) {
        const email = req.body.email;
        const token = jwt.sign({
            data: email
        }, 'aksdbkasbdkajsbdkajdb', {expiresIn: '1h'});
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: "help.slytechadvice@gmail.com",
                pass: "haagycjrnqdkkoky"
            }
        });
        let mailOptions = {
            from: 'help.slytechadvice@gmail.com',
            to: email,
            subject: 'You are invited in a group',
            text: `please click on the link to accept the invite http://localhost:3000/api/verifyUser/${token}`
        };
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.status(200).json("Send successfully");
    }
    static async delTask(req, res) {
        const id = req.body.id;
        await _db.Task.findOneAndDelete(id);
        res.status(200).json("Task deleted");
    }
    static async editTask(req, res) {
        const id = req.params.id;
        const payload = req.body.user;
        await _db.Task.findByIdAndUpdate(id, payload);
        res.status(200).json("Task updzated");
    }
    static async status(req, res) {
        const id = req.body.id;
        await _db.Task.findByIdAndUpdate(id, {status: "done"});
        res.status(200).json("status changed successfully");
    }
    static async adduser(req, res) {
        const email = req.body.email;
        const userEmail = req.user.email;
        const existingUser = await _db.AssignUser.findOne({email: email});
        if (existingUser) {
            return res.status(400).json("user already Invited");
        } else {
            const token = jwt.sign({
                data: email
            }, 'aksdbkasbdkajsbdkajdb', {expiresIn: '1h'});
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                auth: {
                    user: "help.slytechadvice@gmail.com",
                    pass: "haagycjrnqdkkoky"
                }
            });
            let mailOptions = {
                from: 'help.slytechadvice@gmail.com',
                to: email,
                subject: 'You are invited in a group',
                text: `please click on the link to accept the invite http://localhost:3000/api/verifyUser/${token}`
            };
            await transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            console.log(email);
            const assignUser = await _db.AssignUser.create({email: email, isverified: false})
            const user = await _db.User.findOne({email: userEmail}).populate('users');
            user.users.push(assignUser);
            await user.save();
            res.status(200).json({user: user, msg: "user added sucessfully"});
        }
    }
    static async getusers(req, res) {
        const email = req.user.email;
        const user = await _db.User.findOne({email: email}).populate('users');
        console.log(user);
        res.json({users: user.users});
    }
    static async delUser(req, res) {
        const id = req.body.id;
        const email = req.user.email;
        await _db.AssignUser.findByIdAndDelete(id);
        await _db.User.findOneAndUpdate({
            $pull: {
                users: {
                    _id: id
                }
            }
        },);
        const user = await _db.User.findOne({email: email}).populate('users');
        res.json({users: user.users});
    }
}

exports = module.exports = AuthServices;
