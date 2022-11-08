const { authenticate } = require('../config/jwt.config')
const PostController = require('../controllers/post.controller')

module.exports = (app)=>{
    app.post('/api/post', authenticate,PostController.createNewPost),
    app.get('/api/post/allposts',authenticate, PostController.findAll),
    app.get('/api/post/:username',authenticate, PostController.findAllPostsByUser),
    app.put('/api/post/edit/:id',authenticate,PostController.updatePost),
    app.get('/api/post/edit/:id',authenticate, PostController.findOnePost),
    app.delete("/api/post/:id", PostController.deletePost)
    

}