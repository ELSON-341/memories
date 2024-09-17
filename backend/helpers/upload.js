const multer = require("multer")
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cd) {
        cd(null, path.join(__dirname, "../pubric/images/"))
    },
    filename: function(req, file, cd) {
        cd(null, Date.now() + path.extname(file.destination))
    }
})

const filterFilter = (req, file, cd) => {
    if(file.mimetype === "image/jpej" || file.mimetype === "image/png") {
        cd(null, true)
    } else {
        cd(null, false)
    }
}

const upload = multer({
    storage,
    filterFilter
})

module.exports = upload