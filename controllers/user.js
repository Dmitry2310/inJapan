import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import fs from 'fs';

export const signIn = async (req, res) => {

    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.status(400).json({ message: "User doesn't exist." });

        const isPasswordcorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordcorrect) return res.status(400).json({ message: "Invalid password or email" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: "3h" });
        
        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const signUp = async (req, res) => {

    const { email, password, firstName, confirmPassword } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists." });
        const existingUserName = await User.findOne({ name: firstName });
        if (existingUserName) return res.status(400).json({ message: "User already exists." });
        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match." });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: firstName });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

        res.status(201).json({ result, token, message: 'register success' });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

export const getUser = async (req, res) => {

    const { id } = req.params;

    try {
        const user = await User.findById(id);
        res.status(200).json({ result: user });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getAuthor = async (req, res) => {

    const { formData } = req.body;

    try {
        const query = new RegExp(formData.searchData, 'i');
        const searchedUser = await User.find({ name: { $in: query } });
        if (!searchedUser.length) {
            res.status(400).json({ message: 'No Authors found' });
        } else {
            res.status(200).json({ result: searchedUser });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getRatingUsers = async (req, res) => {

    const LIMIT = 5;

    try {
        const users = await User.find().sort({ likesCounter: -1 }).limit(LIMIT);
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {

    const { id } = req.params;
    const userParams = req.body;
    
    try {
        if (id === req.userId || req.body.isAdmin) {
            const updatedUser = await User.findByIdAndUpdate(id, userParams, { new: true });
            const token = jwt.sign({ email: updatedUser.email, id: updatedUser._id }, process.env.SECRET_KEY, { expiresIn: "3h" });
            res.status(200).json({ result: updatedUser, token });
        } else {
            res.status(403).json({ message: "You don't have access." });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

/* export const updateAvatar = async (req, res) => {

    const { base64 } = req.body;
    try {
        if (user.avatar !== '') {
            fs.unlink(pathToFile, function (err) {
                if (err) {
                    throw err
                } else {
                    console.log("Successfully deleted the file.")
                }
            })
        }; 
        const updatedUser = await User.findByIdAndUpdate(req.userId, { avatar: base64 }, { new: true });
        const token = jwt.sign({ email: updatedUser.email, id: updatedUser._id }, process.env.SECRET_KEY, { expiresIn: "3h" });
        console.log(updateUser);
        res.status(200).json({ result: updatedUser, token });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}; */

export const deleteUser = async (req, res) => {

    const { id } = req.params;

    try {
        if (id === req.userId || req.body.isAdmin) {
            await User.findByIdAndDelete(id);
            res.status(200).json({ message: "Account deleted successfully." });
        } else {
            res.status(403).json({ message: "You don't have access." });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const followUser = async (req, res) => {

    const { id } = req.params;

    if (req.userId !== id) {
        try {
            const user = await User.findById(id);
            const currentUser = await User.findById(req.userId);
            if (!user.followers.includes(req.userId)) {
                await user.updateOne({ $push: { followers: req.userId } });
                await currentUser.updateOne({ $push: { followings: id } });
                res.status(200).json({ message: "User has been followed." })
            } else {
                await user.updateOne({ $pull: { followers: req.userId } });
                await currentUser.updateOne({ $pull: { followings: id } });
                res.status(200).json({ message: "Unfollowed." })
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json({ message: "You can't follow yourself." });
    }
};