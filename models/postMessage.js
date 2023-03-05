import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creatorId: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [String],
    selectedFile: { type: String, default: '' },
    selectedVideo: String,
    likes: {
        type: [String],
        default: []
    },
    comments: [
        Object
    ],
    createdAt: {
        type: Date,
        default: new Date()
    },
},
    { timestamps: true },
);

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;