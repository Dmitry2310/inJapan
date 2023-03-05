import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    id: { type: String },
    likesCounter: {type: Number, default: 0},
    avatar: { type: String, default: '' },
    coverPicture: { type: String, default: '' },
    social: {
        facebook: {type: String},
        insta: {type: String},
        twitter: {type: String},
        pinterest: {type: String},
        youtube: {type: String},
        http: {type: String},
    },
    followers: { type: Array, default: [] },
    followings: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false },
    desc: { type: String },
    rating: {type: Number},
},
    { timestamps: true },
);

export default mongoose.model('User', userSchema);