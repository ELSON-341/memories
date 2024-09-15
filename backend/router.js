const express = require("express")
const router = express.Router()

const {createMemory} = require("./controller/MemoryController")

router.post("/", (req, res) => createMemory(req, res))

module.exports = router