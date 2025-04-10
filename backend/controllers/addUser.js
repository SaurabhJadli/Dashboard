const userModel = require("../models/user.model")

const addUser = async(req, res) => {
    const {name, email, phone, message, role} = req.body

    try{
        const emailVerify = await userModel.findOne({email})
    
        if(emailVerify){
            return res.status(202).json({message: "User Already Exist"})
        }

        const user = await new userModel({
            name: name,
            email: email,
            phone: phone,
            message: message,
            role: role
        })

        user.save()
        return res.status(200).json({message: 'user added successfully'})
    }
    catch(err){
        return res.status(404).json({message: "error while adding user"})
    }

}

module.exports = addUser