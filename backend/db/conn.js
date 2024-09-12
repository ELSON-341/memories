const mongoose = require("mongoose")

require('dotenv').config();

mongoose.set("strictQuery", true)

const main = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.gbk8l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

    console.log("Conectado com sucesso!");
    
}

main().catch((err) => console.log(err))

module.exports = main