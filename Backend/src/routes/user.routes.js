import { Router } from "express";
import { userGoogleSignup,userGoogleSignin, getUser, userLogout, updateUserProfile} from "../controllers/user.auth.controller.js";
import { verifyJWT } from "../middlewares/user.verify.middleware.js";
import { upload } from "../middlewares/multer.js";
import { createPost, getFeedPost } from "../controllers/user.post.controller.js";

const router=Router();

router.post('/verify/signup/credentials',userGoogleSignup);
router.post('/verify/signin/credentails',userGoogleSignin);
router.get('/verify/user/credentials',verifyJWT,getUser);
router.post('/erase/user/credentials',verifyJWT,userLogout);
router.patch('/update/profile',verifyJWT,upload.single('picture'),updateUserProfile);
router.post('/create/post',verifyJWT,upload.single('media'),createPost);
router.get('/get/public/posts',verifyJWT,getFeedPost);

export default router