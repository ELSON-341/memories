const Memory = require("../models/Memory")

const createMemory = async(req, res) => {
    try {
        const {title, description} = req.body 

        const src = `images/${req.file.filename}`

        if(!title || !description) {
            return res.json({msg: "Por favor, preenha todos campos."})
        }

        const newMymory = new Memory({
            title,
            src,
            description
        })

        await newMymory.save()

        res.json({msg: "Memória criada com sucesso!"})
    } catch (error) {
        console.log(error)
        res.status(500).send("Ocorre um erro!")
    }
}

module.exports = {
    createMemory,
}

const getMemories = async(req, res) => {
    try {
        const memories = await Memory.find()

        res.json(memories)
    } catch (error) {
        console.log(error)
        res.status(500).send("Ocorreu um erro!")
    }
}

module.exports = {
    createMemory,
    getMemories
}