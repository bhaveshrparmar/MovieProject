const mongoose = require("mongoose")
const dbConfig = () => {
    mongoose.connect(process.env.DB_URL)
        .then(() => { console.log("DB Connect...") })
        .catch((err) => { console.log("Error : ", err) })
}

module.exports = dbConfig