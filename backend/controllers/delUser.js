const userModel = require("../models/user.model")

const delUser = async (req, res) => {
    try{
        let delID = req.params.id
        await userModel.deleteOne({_id: delID})
        return res.send({status: 1, message: 'user deleted successfully'})
    }
    catch(err){
        return res.status(400).json({message: 'unable to delete user'})
    }
}

module.exports = delUser