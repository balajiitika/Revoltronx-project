import express from 'express';
import { authenticateToken } from '../controller/jwt-controller.js';
import { createPost, getAllPosts, getPost, updatePost } from '../controller/post-controller.jsx';
import {signupUser} from './/controller/user-controller.js'
import { uploadImage,getImage } from '../controller/image-controller.js';

import upload from '../utils/upload.js'
import Update from '../../front/src/components/create/Update.jsx';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login',loginUser);

router.post('/file/upload',upload.single('file'),uploadImage);
router.get('/file/:filename',getImage);

router.post('/create', authenticateToken, createPost);
router.get('/posts',authenticateToken, getAllPosts);
router.get('/post/:id', authenticateToken,getPost);
router.put('/update/:id',authenticateToken,updatePost)
export default router;
 











