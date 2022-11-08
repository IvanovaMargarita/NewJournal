const mongoose= require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type:String
    },
    caption:{
        type:String,
        // required:[true, "caption is required"]
    },
    image:{
        type:String
    },
    // comments:[{type: Schema.Types.ObjectId, ref:"Comment"}],
    // username:{type:String},
    date:{
        type: Date,
        default: Date.now
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}, {timestamps: true})

// postSchema.pre('find', function(next){
//     this.populate('createdBy')
//     next()
// })
const Post = mongoose.model("Post", postSchema)
module.exports =Post