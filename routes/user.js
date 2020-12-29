const Router = require('express')
const router = Router()
const usercontroller = require('../controller/user')

router.post('/create',usercontroller.create)

module.exports = router
