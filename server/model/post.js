import mongoose from "mongoose";
import { title } from "process";
import { categories } from "../../front/src/constants/data";

const postSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true,
    },
    picture:{
        type: String,
        required: false,  
    },
    usename:{
        type: String,
        required: true,
    },
    categories:{
        type: String,
        required:true,
    },
    createDate:{
        type: Date,
    }
});

const post = mongoose.model('post', postSchema);

export default post;