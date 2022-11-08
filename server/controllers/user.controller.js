const jwt = require("jsonwebtoken");
const User = require("../models/user.model")
const bcrypt = require('bcrypt')
const SECRET = process.env.SECRET_KEY

module.exports={
        register:async(req,res)=>{
        try{
            ///creating a new user
            const newUser = await User.create(req.body )
            console.log(newUser)
            // const data = process.env.SECRET_KEY // to use info from the .env file you have to create a variable that will have process.env.name of the info you wany to use
            //creating a token below. first argument passes id and email, second argument passes secret from .env
            const userToken = jwt.sign({_id:newUser._id,email:newUser.email}, SECRET)
            //sending token back to the user as a cookie
            res.status(201).cookie('userToken',userToken,{httpOnly:true, expires:new Date(Date.now()+90000)}).json({successMessage:"User is registered", user:newUser}) //90 minutes expiration date
        }catch(error){
            res.status(400).json(error)
            console.log(error)
            /// install  npm i dotenv jsonwebtoken
//// npm i cookie-parser ( will allow us to send cookies)
        }
    },
    login:(req,res)=>{
        User.findOne({email:req.body.email})
            .then((userRecord)=>{
                //if email is not found
                if(userRecord === null){
                res.status(400).json({message:'invalid login'})
                }
                else{
                    //compare password in user record and the password in input
                    bcrypt.compare( req.body.password,userRecord.password)
                        .then((isPasswordValid)=>{
                            if(isPasswordValid){
                            console.log("password is valid")
                            res.cookie(
                                "userToken", 
                                jwt.sign({
                                    //payload is data we want saved
                                    _id:userRecord._id,
                                    email: userRecord.email,
                                    username: userRecord.username},
                                //we need a secret key to sign and hash cookies data
                                    process.env.SECRET_KEY
                                ),
                                {
                                ///configuration settings 
                                    httpOnly: true,
                                    expires: new Date(Date.now()+90000000)
                                },
                            ).json({message:"Success!",
                                    userLoggedIn: userRecord.username,
                                    userId: userRecord._id
                            });
                        }
                        else{
                            res.status(400).json({
                                message:"login and/or email, invalid"
                            }) 
                        }
                    })
                    .catch((err)=>{
                        console.log(err)
                        res.status(400).json({message: "invalid attempt"})
                    })
                }
                
            })
            .catch((err)=>{
                console.log(err)
                res.status(400).json({message:"invalid attempt"})
            })
            
    },

    logout:(req,res)=>{
        console.log('logging out')
        res.clearCookie('userToken')
        res.json({success:'User Logged Out'})
    },
    ///not the most secure way 

    // getOneUser:(req,res)=>{
    //     User.findOne({_id:req.params.id})
    //         .then((oneUser)=>{
    //             console.log(oneUser)
    //             res.json(oneUser)
    //         })
    //         .catch((err)=>{
    //             console.log(err)
    //             res.status(400).json(err)
    //         })
    // },
    ///do this instead---->>>>
    getLoggedInUser:(req,res)=>{
        // const decodedJwt = jwt.decode(req.cookies.userToken,{complete:true})
        User.findOne({_id: req.jwtpayload.id})
            .then(user => res.json(user))
            .catch(err=> res.json(err))
            
    },

    findAllUsers: (req,res)=>{
        User.find()
            .then((allUsers)=>{
                res.json(allUsers)
            })
            .catch((err)=>{
                console.log("Find all users failed")
                res.status(400).json({message:"something went wrong in find all", error:err})
            })
    }
}


// const UserController = {

//     register: (req, res) => {
//         User.create(req.body)
//             .then((user) => {
//                 const {_id,username,...other} = user

//             const userToken = jwt.sign({
//                 id:user._id
//             },process.env.JWT_KEY)

//             res.cookie("usertoken",userToken,{
//                 httpOnly:true
//             }).status(201).json({user:{id:_id,username:username}})

//             })
//             .catch(err => res.json(err));
//         },

//         login:(req, res)=>{

//          // console.log(process.env)
//          // console.log(process.env.JWT_KEY)
//         User.findOne({email:req.body.email})
//         .then((user)=>{

//             const {_id,username,...other} = user
//             if(user === null){

//                 res.status(400)
//             }
//             bcrypt.compare(req.body.password,user.password)
//             .then(()=>{
//                 const userToken = jwt.sign({
//                     id:user._id
//                 },process.env.JWT_KEY)

//                 res.cookie('usertoken',userToken,{
//                     httpOnly:true
//                 }).json({user:{id:_id,name:username}})
//             })
//             .catch(()=>{

//                 res.status(400)
//             })
//         })
//         .catch((err)=>{
//             res.status(400).json({msg:"something went wrong",error:err})
//         })
//         },
//         logout: (req, res) => {
//         res.clearCookie('usertoken');
//         res.status(200).json({user:"Logged Out"})
//         },
//         getAll:(req,res)=>{
//             User.find({})
//             .then((users)=>{
//                 res.json(users)
//             })
//             .catch((err)=>{
//                 console.log("error getting users")
//             })
//         }

// }

// module.exports = UserController

//     register:async(req,res)=>{
//         try{
//             ///creating a new user
//             const newUser = await User.create(req.body )
//             console.log(newUser)
//             // const data = process.env.SECRET_KEY // to use info from the .env file you have to create a variable that will have process.env.name of the info you wany to use
//             //creating a token below. first argument passes id and email, second argument passes secret from .env
//             const userToken = jwt.sign({_id:newUser._id,email:newUser.email}, SECRET)
//             //sending token back to the user as a cookie
//             res.status(201).cookie('userToken',userToken,{httpOnly:true, expires:new Date(Date.now()+90000)}).json({successMessage:"User is registered", user:newUser}) //90 minutes expiration date
//         }catch(error){
//             res.status(400).json(error)
//             console.log(error)
//             /// install  npm i dotenv jsonwebtoken
// //// npm i cookie-parser ( will allow us to send cookies)
//         }
//     },


////new way

    // register:(req,res)=>{
    //     //creating a user object
    //     const user= new User(req.body)

    //     user.save()
    //         .then((newUser)=>{
    //             console.log(newUser,"in user.save")
    //             console("successfully registered!")
    //             res.json({
    //                 successMessage:"Thank you for registering",
    //                 user: newUser
    //             })
    //         })
    //         .catch((err)=>{
    //             console.log("register not successfull")
    //             console.log(err)
    //             res.status(400).json(err)
    //         })

    // },


        // login: async(req,res)=>{
    //     const user = await User.findOne({email:req.body.email}) //find the user that matches this email
    //     if(!user){ //if user isnt found then =>
    //         res.status(400).json({error:'invalid email/password'})
    //     }
    //     try{
    //         const isPasswordValid = await bcrypt.compare(req.body.password,user.password)
    //         console.log(isPasswordValid)
    //         if(!isPasswordValid){
    //             res.status(400).json({error:'invalid email/password'})
    //         }else{
    //             const userToken = jwt.sign({_id:user._id,email:user.email}, SECRET)
    //             res.status(201).cookie('userToken',userToken,{httpOnly:true, expires:new Date(Date.now()+90000)}).json({successMessage:"User logged in", user:user}) //90 minutes expiration date
    //         }
    //     }catch(error){
    //         res.status(400).json({error:'invalid email/password'})
    //     }