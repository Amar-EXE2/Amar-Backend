import mongoose ,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema(

    {

        username : {

            type: String,
            require : true,
            trim: true,
            unique: true,
            lowercase: true,
            index: true
        },

        email: {

            type: String,
            require : true,
            trim: true,
            unique: true,
            lowercase: true,
        
        },
        fullname : {

            type: String,
            require : true,
            trim: true,
            index: true
        },
        avtar:{
            type:String ,
             require : true
        },
        coverImage:{type:String

        },
        watchHistory: [{

             type:Schema.Types.ObjectId,
             ref:"Video"
        }],

        password:{

            type : String,
            require: [true, 'password is requrired '],
        },

        refrenceTocken:{
            type: String
        },

    },
    {
        timestamps : true
    }
)
userSchema.pre("save",  async function (next){
    if(!this.isModifed("password")) return next()

    this.password=bcrypt.hash(this.password,10)
    next()

    userSchema.methods.ispasswordisCorrect = async function (password){

         return await bcrypt.compare(password,this.password)

    }
    userSchema.methods.generateAccessToken = function(){

      return  jwt.sign(
            {
                _id:this._id,
                email:this.email,
                username:this.username,
                fullname:this.fullname
            },
            process.env.ACCESS_TOKEN_SECRET,{

                expiresIn : process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    }
    userSchema.methods.refresheAccessToken = function(){

    return  jwt.sign(
            {
                _id:this._id,
              
            },
            process.env.REFESH_TOKEN_SECRET,{

                expiresIn : process.env.REFESH_TOKEN_EXPIRY
            }
        )


    }
})

export const User = mongoose.model("Video",userSchema)