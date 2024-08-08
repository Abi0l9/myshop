const router = require("express").Router()
const { getMe } = require("../controllers/user")
const {tokenExtractor, userExtractor} = require("../utils/middlewares")


router.get('/me', [tokenExtractor, userExtractor], getMe)

module.exports = router