import { Router } from "express";
import * as productsCtrl from '../controllers/products.controllers.js'
import { authJwt } from "../middlewares/index.js";
const router = Router()

router.get('/', productsCtrl.getProducts)

router.get('/:productId', productsCtrl.getProductById)

router.delete('/:productId',[authJwt.verifyToken, authJwt.isAdmin || authJwt.isModerator ], productsCtrl.deleteProduct)

router.post('/', [authJwt.verifyToken, authJwt.isModerator, authJwt.isAdmin],productsCtrl.createProducts)

router.put('/:productId', [authJwt.verifyToken, authJwt.isModerator, authJwt.isAdmin] , productsCtrl.updateProduct)

export default router