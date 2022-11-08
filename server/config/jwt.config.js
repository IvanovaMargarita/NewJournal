const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY
const User = require('../models/user.model')

module.exports={

    authenticate: (req, res, next) => {
     // console.log(req.cookies.usertoken)
    jwt.verify(req.cookies.userToken, secret, (err, payload) => {
        if (err) { 
            console.log(err)
            res.status(401).json({verified: false});
        } 
        else {
            console.log(payload)
            req.jwtpayload = payload
            next();
            }
    })
    },

    // isLoggedIn:(req, res) => {
    //  // console.log(req.cookies)
    // jwt.verify(req.cookies.usertoken, secret, async (err, payload) => {
    //     if (err) { 
    //         res.status(401).json({verified: false});
    //     } else {
    //         const user = await User.findOne({_id:payload.id})
    //         const {_id,firstName} = user
    //         return res.json({user:{id:_id,name:firstName}})

    //     }
    // })
    // },

}