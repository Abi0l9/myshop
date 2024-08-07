const Product = require("../models/Product")
const User = require("../models/User")

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        return res.status(200).json({success: true, products})
    }catch(error){
        return res.status(500).json({success: false, message: error.message})
    }
}

const getAProductById = async (req, res) => {
    const productId = req.params.productId

    try{
        const product = await Product.findById(productId)

        if(!product){
            return res.status(404).json({success: false, message: "Product with specified ID does not exist."})
        }
        return res.status(200).json({success: true, product})
    }
    catch(error){
        if(error.message.includes("Cast to ObjectId failed")){
            return res.status(400).json({success: false, message: "Product ID is invalid"})
        }
        
        return res.status(500).json({success: false, message: error.message})

    }
}

const createAProduct = async (req, res) => {
    const body = req.body
    const userId = req.user.id

    try {
        const newProduct = new Product({...body, user: userId})
        const user = await User.findById(userId)

        

        if(!user){
            return res.status(404).json({success: false, message: "User with specified ID does not exist."})
        }

        user.products = user.products.concat(newProduct.id)
        
        await newProduct.save()
        await user.save()

        return res.status(201).json({success: true, message: "Product created, successfully."})

    }
    catch(error){
        return res.status(500).json({success: false, message: error.message})

    }
}

const editAProduct = async (req, res) => {
    const userId = req.user.id
    const productId = req.params.productId
    const body = req.body

    try {
        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({success: false, message: "Product with specified ID does not exist."})
        }

        if(product.user.toString() !== userId){
            return res.status(403).json({success: false, message: "You are not allowed to perform such action"})
        }

        await Product.findByIdAndUpdate(productId, body)
        return res.status(200).json({success: true, message: "Product edited, successfully."})

    }
    catch(error){
        if(error.message.includes("Cast to ObjectId failed")){
            return res.status(400).json({success: false, message: "Product ID is invalid"})
        }

        return res.status(500).json({success: false, message: error.message})

    }
}

const deleteAProduct = async (req, res) => {
    const userId = req.user.id
    const productId = req.params.productId

    try {
        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({success: false, message: "Product with specified ID does not exist."})
        }

        if(product.user.toString() !== userId){
            return res.status(403).json({success: false, message: "You are not allowed to perform such action"})
        }

        await Product.findByIdAndDelete(productId)
        return res.status(200).json({success: true, message: "Product deleted, successfully."})

    }
    catch(error){
        if(error.message.includes("Cast to ObjectId failed")){
            return res.status(400).json({success: false, message: "Product ID is invalid"})
        }
        return res.status(500).json({success: false, message: error.message})

    }
}

module.exports = {
    getAllProducts,
    getAProductById,
    createAProduct,
    editAProduct,
    deleteAProduct
}