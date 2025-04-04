const {default: mongoose} = require("mongoose");

const dbconneted = ()=>{

    try {
        const conn = mongoose.connect(process.env.MongooDb)
        console.log("Database connect succesffuly");
    } 
   
    catch (error) {
        console.log("Database error")
    }
}

module.exports = dbconneted;