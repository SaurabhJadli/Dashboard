const userModel = require("../models/user.model")

const getUser = async (req, res) => {
    try{
        let userID = req.params.id
        let user = await userModel.findById(userID)
        return res.send({status: 200,
            userData: user
        })

    }
    catch(err){
        return res.status(404).json({
            message: 'error while fetching user data'
        })
    }
}

module.exports = getUser