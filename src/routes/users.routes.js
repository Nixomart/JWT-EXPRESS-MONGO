import { Router } from "express";
import * as userCtrl from '../controllers/user.controller.js'
import { authJwt, verifySingup } from "../middlewares/index.js";

const router = Router()

router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifySingup.checkRolesExist], userCtrl.createUser)

export default router