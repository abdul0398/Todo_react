const AuthServices = require("../services/AuthServices");
exports = module.exports = class DemoController {

    constructor(router) { // config routes
        router.post('/api/register', this.signupAuth);
        router.get('/api/start', this.onStart);
        router.post('/api/login', this.loginAuth);
        router.post('/api/logout', this.logoutAuth);
        router.post('/api/createtask', this.createTask);
        router.post('/api/gettasks', this.getTask);
        router.post('/api/del', this.delTask);
        router.post('/api/edit/:id', this.editTask);
        router.post('/api/status', this.status);
        router.post('/api/adduser', this.adduser);
        router.get('/api/getusers', this.getusers);
        router.post('/api/deluser', this.delUser);
        router.get('/api/verifyUser/:token', this.verifyUser);
        router.post('/api/resend', this.resend);

    }
    async signupAuth(req, res) {
      return AuthServices.signUp(req,res);
    }

    async loginAuth(req, res) {
        return AuthServices.login(req,res);
    }
    async resend(req,res){
        return AuthServices.resend(req,res);
    }
    async verifyUser(req,res){
        return AuthServices.verifyUser(req,res);
    }

    async logoutAuth(req,res) {
        req.logout();
        res.status(200).json("You logged out successfully.");
    }

    async createTask(req,res){
        return AuthServices.createtask(req,res);
    }
    async status(req,res){
        return AuthServices.status(req,res);
    }
    async editTask(req,res){
        return AuthServices.editTask(req,res);
    }
    async getTask(req,res){
      return AuthServices.gettask(req,res);
    }
    async onStart(req, res) {
        return AuthServices.onstart(req,res);
    }
    async adduser(req,res){
        return AuthServices.adduser(req,res);
    }
    async delTask(req,res){
        return AuthServices.delTask(req,res);
    }
    async logout(req, res) {
       return AuthServices.logOut(req,res);
    }
    async getusers(req, res) {
        return AuthServices.getusers(req,res);
     }
     async delUser(req,res){
        return AuthServices.delUser(req,res);
     }
};
