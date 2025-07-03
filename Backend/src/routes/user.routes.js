import { Router } from "express";
import { userGoogleSignup,userGoogleSignin, getUser, userLogout, updateUserProfile} from "../controllers/user.auth.controller.js";
import { verifyJWT } from "../middlewares/user.verify.middleware.js";
import { upload } from "../middlewares/multer.js";
import { createPost, findFollowing, getFeedPost, savePost } from "../controllers/user.post.controller.js";
import { followUser, unfollowUser } from "../controllers/user.follow.controller.js";

const router=Router();

router.post('/verify/signup/credentials',userGoogleSignup);
router.post('/verify/signin/credentails',userGoogleSignin);
router.get('/verify/user/credentials',verifyJWT,getUser);
router.post('/erase/user/credentials',verifyJWT,userLogout);
router.patch('/update/profile',verifyJWT,upload.single('picture'),updateUserProfile);
router.post('/create/post',verifyJWT,upload.single('media'),createPost);
router.get('/get/public/posts',verifyJWT,getFeedPost);
router.patch('/save/post',verifyJWT,savePost);
router.get('/get/follow/status',verifyJWT,findFollowing);
router.post('/follow/user',verifyJWT,followUser);
router.post('/unfollow/user',verifyJWT,unfollowUser);

export default router