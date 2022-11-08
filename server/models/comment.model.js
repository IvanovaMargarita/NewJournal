const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true7r98
    },
    username: {
        type: String
    }
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;