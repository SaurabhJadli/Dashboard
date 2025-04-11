const userModel = require("../models/user.model")

const getUsers = async (req, res) => {
    try{
        let users = await userModel.find()
        return res.send({status: 200,
            userData: users
        })
    }
    catch(err){
        return res.status(404).json({
            message: 'error while fetching users data'
        })
    }
}

module.exports = getUsers