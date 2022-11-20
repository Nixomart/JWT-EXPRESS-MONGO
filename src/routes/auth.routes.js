import { Router } from "express";
import * as authCrtl from '../controllers/auth.controller.js'
import { verifySingup } from "../middlewares/index.js";

const router = Router()

router.post('/signup',[verifySingup.checkDuplicateUsernameEmail, verifySingup.checkRolesExist], authCrtl.singup)
router.post('/signin', authCrtl.singin)

export default router