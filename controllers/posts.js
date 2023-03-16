import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import User from "../models/user.js";
import fs from 'fs';

export const createPost = async (req, res) => {

    const post = req.body;

    try {
        const newPost = new PostMessage({
            title: post.title,
            message: post.message,
            creatorId: req.userId,
            creator: req.userId,
            tags: post.tags,
            selectedFile: post.base64File ? post.base64File : '',
            selectedVideo: post.selectedVideo,
            createdAt: new Date().toISOString()
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {

    const { id } = req.params;
    const  postData  = req.body;
    const post = await PostMessage.findById(id);
    console.log(id);
    console.log(postData);
    const newBody = {
        title: postData.title,
        message: postData.message,
        tags: postData.tags,
        selectedVideo: postData.selectedVideo,
        selectedFile: postData?.selectedFile ? postData?.selectedFile : post.selectedFile,
    };

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        const updatedPost = await PostMessage.findByIdAndUpdate(id, newBody, { new: true }).populate('creator').exec();
        res.status(200).json(updatedPost);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPosts = async (req, res) => {

    const { page } = req.query;

    try {
        const LIMIT = 12;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex).populate('creator').exec(); // give us the newest post
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserPosts = async (req, res) => {

    const { id } = req.params;

    try {
        const posts = await PostMessage.find().populate('creator').exec();
        const usersPosts = posts.filter((post) => post.creatorId === id);

        res.status(200).json(usersPosts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPost = async (req, res) => {

    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id).populate('creator').exec();

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPostsBySearch = async (req, res) => {

    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, 'i'); // "i" => Test, test, TEST => test

        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] }).populate('creator').exec();

        res.status(200).json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deletePost = async (req, res) => {

    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this id');

    await PostMessage.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {

    const { id } = req.params;

    if (!req.userId) return res.json({ message: 'Unauthenticated.' });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this id');

    const post = await PostMessage.findById(id).populate('creator').exec();
    const user = await User.findById(post.creatorId);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        // like the post
        post.likes.push(req.userId);
        user.likesCounter = user.likesCounter + 1;
    } else {
        //dislike the post
        post.likes = post.likes.filter((idPerson) => idPerson !== String(req.userId));
        user.likesCounter = user.likesCounter - 1;
    };

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true }).populate('creator').exec();
    await User.findByIdAndUpdate(post.creatorId, user, { new: true });
    res.json(updatedPost);
};

//------
export const commentPost = async (req, res) => {

    const { id } = req.params;
    const { value } = req.body;

    try {
        const user = await User.findById(req.userId);
        const post = await PostMessage.findById(id).populate('creator').exec();
        const newComment = {
            value: value,
            creatorId: req.userId,
            creatorName: user.name,
            creatorAvatar: user.avatar,
            createdAt: new Date().toISOString()
        }
        post.comments.unshift(newComment);
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true }).populate('creator').exec();
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//---------
export const getFolPosts = async (req, res) => {

    try {
        const currentUser = await User.findById(req.userId);
        const userPosts = await PostMessage.find({ creatorId: req.userId });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return PostMessage.find({ creatorId: friendId }).populate('creator').exec();
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (error) {
        res.status(500).json(error);
    }
};