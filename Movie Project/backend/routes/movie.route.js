const router = require('express').Router()
const controller = require('../controllers/movie.controller')
const upload = require("../utils/upload")


// router.route("/").post(upload.single("image"), controller.createUser)
router.route("/").post(upload.array("image", 3), controller.createMovie)
    .get(controller.getMovies)
router.route("/:id").put(upload.array("image", 3), controller.updateMovie)

router.route("/:id").delete(controller.trashMovie)

module.exports = router