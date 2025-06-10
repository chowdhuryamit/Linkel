import { Router } from "express";
import { userGoogleSignup } from "../controllers/user.controller.js";

const router=Router();

router.post('/verify/signup/credentials',userGoogleSignup);

export default router