const mongoose = require('mongoose')

function connectDB(){
    try{
        mongoose.connect(process.env.MongoURL)
        console.log('DB connected');
        
    }
    catch{
        console.log('error connecting to DB');
    }
}

module.exports = connectDB