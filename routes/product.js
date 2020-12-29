const Router = require('express')
const router = Router()
const productcontroller = require('../controller/product')

router.post('/create',productcontroller.create)

module.exports = router
