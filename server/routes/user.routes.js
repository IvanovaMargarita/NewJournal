const { authenticate } = require('../config/jwt.config')
const UserController = require('../controllers/user.controller')
// const {authenticate}=require('../config/jwt.config')

module.exports = (app)=>{
    app.post('/api/register', UserController.register),
    app.post('/api/login', UserController.login)
    app.get('/api/logout', UserController.logout)
    app.get('/api/getuser',authenticate, UserController.getLoggedInUser)
    // app.get("/api/test", (req, res) => {
    //     res.status(200).json({message :  "Test"})
    // })
}
