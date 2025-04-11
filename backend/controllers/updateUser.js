const userModel = require("../models/user.model")

const updateUser = async (req, res) => {
    try{
        let upID = req.params.id
        let {name, email, phone, message, role} = req.body
        let updateObj = {
            name,
            email,
            phone,
            message,
            role
        }
        await userModel.updateOne({_id: upID}, updateObj)
        return res.send({status: 1, message: 'User Updated successfully'})
    }
    catch(err){
        return res.status(400).json({message: 'unable to update user'})
    }
}

module.exports = updateUser