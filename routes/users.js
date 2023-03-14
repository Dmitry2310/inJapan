import express from "express";
import { signIn, signUp, getUser, getRatingUsers, updateUser, deleteUser, followUser, getAuthor, updateAvatar } from "../controllers/user.js";
import auth from "../middleware/auth.js";
import file from "../middleware/file.js";

const router = express.Router();

router.post('/signin', auth, signIn);
router.post('/signup', auth, signUp);

router.get('/:id', auth, getUser);
router.get('/', auth, getRatingUsers);
router.patch('/update/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);
router.patch('/:id/follow', auth, followUser);
router.post('/find', getAuthor);
router.post('/upload', auth/* , file.single('avatar') */, updateAvatar);

export default router;