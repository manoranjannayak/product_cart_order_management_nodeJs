const Router = require('express')
const router = Router()
const cartcontroller = require('../controller/cart')

router.post('/add',cartcontroller.add)
router.post('/updateQuantity',cartcontroller.updateQuantity)

module.exports = router
