import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const VideoSchema = new Schema({

    vidoFile : {
    type:String,
    require:true,
    },
    thumbnail:{
    type:String,
    require:true,
    },
    title :{

        type:String,
    require:true,

    },
    description:{
        type:String,
    require:true,
    },
    duration:{
        type:Number,
    require:true,
    },
    views:{
     type:Number,
    require:true,
    default:0,
    },
   isPublic:{
        type:Boolean,
     require:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }


})

VideoSchema.plugin(mongooseAggregatePaginate)


export const Video = mongoose.model("Video",VideoSchema)