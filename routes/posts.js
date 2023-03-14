import express from "express";
import { getPost, getPosts, getPostsBySearch, createPost, updatePost, deletePost, likePost, commentPost, getUserPosts, getFolPosts } from "./../controllers/posts.js";
import auth from "./../middleware/auth.js";

/* import bodyParser from 'body-parser'; */

/* const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images/PostImages')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});
const types = ['image/png', 'image/jpeg', 'image/jpg']
const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const limits = {
    fileSize: 1024 * 1025 * 5
}
/*  */
/*const upload({ storage, fileFilter, limits }); */



const router = express.Router();

//get all posts
router.get('/', getPosts);
//get posts by searching
router.get('/search', getPostsBySearch);
//get posts onli existing user
router.get('/userPosts/:id', getUserPosts);
//get post to display details of this post
router.get('/:id', getPost);
//create post
router.post('/', auth,/* multer.single('coverImage'), */ createPost);
//update post
router.post('/:id', auth,/*multer.single('coverImage'), */ updatePost);
//delete post
router.delete('/:id', auth, deletePost);
//like post
router.patch('/:id/likePost', auth, likePost);
//comment post
router.post('/:id/commentPost', auth, commentPost);
//get timeline posts
router.get('/timeline/all', auth, getFolPosts);

export default router;