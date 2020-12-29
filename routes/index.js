const Router = require('express')
const router = Router()

const userRoutes = require('./user')
const productRoutes = require('./product')
const cartRoutes = require('./cart')
const orderRoutes = require('./order')

router.use('/user',userRoutes)
router.use('/product',productRoutes)
router.use('/cart',cartRoutes)
router.use('/order',orderRoutes)

module.exports = router
