const Post = require('../models/post.model')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

module.exports={

    findAll:(req,res)=>{
        Post.find()
            .populate('createdBy', 'username email')
            .then((allPosts)=>{
                res.json(allPosts)
            })
            .catch((err)=>{
                console.log('Find all posts failed')
                res.json({message:'something is wrong in findAll', error:'error' })
            })
    },

    createNewPost:(req,res)=>{
        // const newPostObject = new Post(req.body)
        const decodedJWT = jwt.decode(req.cookies.userToken,{complete:true})
        Post.create({...req.body,createdBy:decodedJWT.payload})
        // console.log('decoded', decodedJWT)
        // newPostObject.createdBy = decodedJWT.payload._id
        // console.log('createdby', createdBy)
        // newPostObject.save()
            .then((newPost)=>{
                console.log(newPost)
                res.json(newPost)
            })
            .catch((err)=>{
                console.log("something went wrong in create new post")
                res.status(400).json(err)
            })
    },
    deletePost:(req,res)=>{
        
        Post.deleteOne({_id: req.params.id})
            .then((deletedPost)=>{
                console.log(deletedPost)
                res.json(deletedPost)
            })
            .catch((err)=>{
                console.log("delete game failed")
                res.json({message: "something went wronf in delete one", error:err})
            })
    },
    updatePost:(req,res)=>{
        Post.findOneAndUpdate({_id: req.params.id},req.body,{new: true, runValidators:true})
            .then((updatedPost)=>{
                console.log(updatedPost)
                res.json(updatedPost)
            })
            .catch((err)=>{
                console.log(err,"something went wrong in upate game")
                res.status(400).json(err)
            })
    },

    findAllPostsByUser:(req,res)=>{
        if(req.jwtpayload.username !== req.params.username){
            User.findOne({username: req.params.username})
                .then((userNotLoggedIn)=>{
                    Post.find({createdBy: userNotLoggedIn._id})
                        .populate('createdBy', 'username email')
                        .then((allPostsFromUser)=>{
                            console.log(allPostsFromUser)
                            res.json(allPostsFromUser)
                        })
                        .catch((err)=>{
                            console.log(err)
                            res.statuss(400).json(err)
                        })
                })
                .catch((err)=>{
                    console.log(err)
                    res.status(400).json(err)
                })
        }
        else{
            Post.find({createdBy: req.jwtpayload._id})
                
                .then((allPostsFromLoggedInUser)=>{
                    console.log(allPostsFromLoggedInUser)
                    res.json(allPostsFromLoggedInUser)
                })
                .catch((err)=>{
                    console.log(err)
                    res.json(400).json(err)
                })
        }
    },

    findOnePost:(req,res)=>{
        Post.findOne({_id:req.params.id})
            .then((post)=>{
                res.status(200).json(post)
            })
            .catch((err)=>{
                res.status(500).json({message: 'something went wrong in find one'})
            })
    }
    

}