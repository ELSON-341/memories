const { log } = require("console")
const Memory = require("../models/Memory")

const fs = require("fs")

const removeIdImage = (memory) => {
    fs.unlink(`public/${memory.src}`, (err) => {
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

        if(!memory) {
            return res.status(404).json({msg: "Memória não encontrada!"})
        }

        removeIdImage(memory)

        res.json({msg: "Memória excluída"})
    } catch (error) {
        console.log(error)
        res.status(500).send("Ocorreu um erro!")
    }
}

const updateMemory = async(req, res) => {
    try {
        const {title, description} = req.body

        let src = null

        if(req.file) {
            src = `images${req.file.filename}`
        }

        const memory = await Memory.findById(req.params.id)

        if(!memory) {
            return res.status(404).json({msg: "Memoria não encontrada!"})
        }

        if(src) {
            removeIdImage(memory)
        }

        const updateData = {}

        if(title) updateData.title = title
        if(description) updateData.description = description
        if(src) updateData.src = src

        const updateMemory = await Memory.findByIdAndUpdate(req.params.id, updateData, {new: true})

        res.json({updateData, msg: "Memória atualizada com sucesso!"})

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createMemory,
    getMemories,
    getMemory,
    deleteMemory,
    updateMemory
}