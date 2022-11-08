const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlenght:3
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
            }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
        }
}, {timestamps: true});

    // userSchema.virtual('confirmPassword')
    //     .get( () => this._confirmPassword )
    //     .set( value => this._confirmPassword = value );

    // userSchema.pre('validate', function(next) {
    //     if (this.password !== this.confirmPassword) {
    //         this.invalidate('confirmPassword', 'Password must match confirm password');
    //     }
    //     next();
    // });

    // userSchema.pre('validate', function(next) {
    //     if (this.password !== this._confirmPassword) {
    //         this.invalidate('confirmPassword', 'Password must match confirm password');
    //     }
    //     next();
    // });

    // userSchema.pre('save',function(next){
    //     console.log('in pre save')
    //     //hash password before its saved in the db
    //     bcrypt.hash(this.password,10)
    //         .then((hashedPass)=>{
    //         this.password=hashedPass
    //         next()
    //         })
    // })
const User = mongoose.model("User", userSchema);
module.exports = User