const express = require('express');
const authenticate = require('../middlewares/authenticate');
const postController = require('../controllers/postController');
const upload = require('../middlewares/upload')

const router = express.Router();

router.post('/', authenticate, upload.single('img'), postController.createPost)

module.exports = router;