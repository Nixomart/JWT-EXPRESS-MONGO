import { Router } from "express";
import * as productsCtrl from '../controllers/products.controllers.js'

const router = Router()

router.get('/', productsCtrl.getProducts)

router.get('/:productId', productsCtrl.getProductById)

router.delete('/:productId', productsCtrl.deleteProduct)

router.post('/', productsCtrl.createProducts)

router.put('/:productId', productsCtrl.updateProduct)

export default router