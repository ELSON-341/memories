const Memory = require("../models/Memory")

const fs = require("fs")

const removeIdImage = (memory) => {
    fs.unlink(memory.src, (err) => {
        if(err) {
            console.log(err)
        } else {
            console.log("Imgem exclída do servidor!");
        }
    })
}

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

const getMemories = async(req, res) => {
    try {
        const memories = await Memory.find()

        res.json(memories)
    } catch (error) {
        console.log(error)
        res.status(500).send("Ocorreu um erro!")
    }
}

const getMemory = async(req, res) => {
    try {
        const memory = await Memory.findById(req.params.id)

        if(!memory) {
            return res.status(404).json({msg: "Memória não encontrada!"})
        }
        
        res.json(memory)
    } catch (error) {
        console.log(error)
        res.status(500).send("Ocorreu um erro!")
    }
}

const deleteMemory = async(req, res) => {
    try {
        const memory = await Memory.findByIdAndDelete(req.params.id)

        removeIdImage(memory)

        if(!memory) {
            return res.status(404).json({msg: "Memória não encontrada!"})
        }

        res.json({msg: "Memória excluída"})
    } catch (error) {
        console.log(error)
        res.status(500).send("Ocorreu um erro!")
    }
}

module.exports = {
    createMemory,
    getMemories,
    getMemory,
    deleteMemory
}
