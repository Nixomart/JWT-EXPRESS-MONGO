import { Router } from "express";
import * as productsCtrl from '../controllers/products.controllers.js'
import { verifyToken } from "../middlewares/auth.jwt.js";
const router = Router()

router.get('/', productsCtrl.getProducts)

router.get('/:productId', productsCtrl.getProductById)

router.delete('/:productId',verifyToken, productsCtrl.deleteProduct)

router.post('/', verifyToken,productsCtrl.createProducts)

router.put('/:productId', verifyToken, productsCtrl.updateProduct)

export default router