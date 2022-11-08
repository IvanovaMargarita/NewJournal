require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const port = 8000


app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({extended: true}))
// const port = process.env.PORT || 8000
app.use(cors({
    credentials:true,
    origin:"http://localhost:3002"
}))

 //config
require('./config/mongoose.config')


 //routes
require("./routes/user.routes")(app)
require('./routes/post.routes')(app)
// require('./routes/player.routes')(app)
// require('./routes/user.routes')(app)



app.listen(port,()=>{console.log(`Locked and loaded on port ${port}`)})