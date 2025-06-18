import { Router } from "express";
import { userGoogleSignup,userGoogleSignin, getUser, userLogout} from "../controllers/user.auth.controller.js";
import { verifyJWT } from "../middlewares/user.verify.middleware.js";

const router=Router();

router.post('/verify/signup/credentials',userGoogleSignup);
router.post('/verify/signin/credentails',userGoogleSignin);
router.get('/verify/user/credentials',verifyJWT,getUser);
router.post('/erase/user/credentials',verifyJWT,userLogout);

export default router