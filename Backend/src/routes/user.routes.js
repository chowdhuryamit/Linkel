import { Router } from "express";
import { userGoogleSignup,userGoogleSignin} from "../controllers/user.auth.controller.js";

const router=Router();

router.post('/verify/signup/credentials',userGoogleSignup);
router.post('/verify/signin/credentails',userGoogleSignin);

export default router