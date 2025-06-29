import { Router } from "express";
import { userGoogleSignup,userGoogleSignin, getUser, userLogout, updateUserProfile} from "../controllers/user.auth.controller.js";
import { verifyJWT } from "../middlewares/user.verify.middleware.js";
import { upload } from "../middlewares/multer.js";

const router=Router();

router.post('/verify/signup/credentials',userGoogleSignup);
router.post('/verify/signin/credentails',userGoogleSignin);
router.get('/verify/user/credentials',verifyJWT,getUser);
router.post('/erase/user/credentials',verifyJWT,userLogout);
router.patch('/update/profile',verifyJWT,upload.single('picture'),updateUserProfile);

export default router