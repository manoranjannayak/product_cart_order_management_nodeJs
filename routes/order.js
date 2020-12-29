const Router = require('express')
const router = Router()
const ordercontroller = require('../controller/order')

router.post('/create',ordercontroller.create)
router.post('/update',ordercontroller.update)

module.exports = router
