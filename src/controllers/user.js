const User = require("../models/User")

const getMe =  async (req, res) => {
    const userId = req.user.id

    try{
        const user = await User.findById(userId).populate("products")

        if(!user){
            return res.status(404).json({success: false, message: 'User not found'})
        }

        return res.status(200).json({success: false, message: 'Successful', user})

    }
    catch(error){
        return res.status(500).json({success: false, message: error.message})
    }
}

module.exports = {
    getMe
}