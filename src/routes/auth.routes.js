import { Router } from "express";
import * as authCrtl from '../controllers/auth.controller.js'

const router = Router()

router.post('/signup', authCrtl.singup)
router.post('/signin', authCrtl.singin)

export default router