const router = require("express").Router();
const {
  getAProductById,
  getAllProducts,
  createAProduct,
  editAProduct,
  deleteAProduct,
} = require("../controllers/product");
const {tokenExtractor, userExtractor} = require("../utils/middlewares")

router
  .get("", getAllProducts)
  .get("/:productId", getAProductById)
  .post("", [tokenExtractor, userExtractor], createAProduct)
  .patch("/:productId", [tokenExtractor, userExtractor], editAProduct)
  .delete("/:productId", [tokenExtractor, userExtractor],  deleteAProduct);

  module.exports =  router