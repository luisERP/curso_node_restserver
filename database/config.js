const mongoose = require('mongoose');

const dbConection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("Base de datos online");
    }catch (err){
        console.log(err);
        throw new Error("Error a la hora de conectarse con la BD");
    }
}



module.exports = {
    dbConection
}