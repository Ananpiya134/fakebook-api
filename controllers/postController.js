const util = require('util');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const uploadPromise = util.promisify(cloudinary.uploader.upload);

const { Post } = require('../models');


exports.createPost = async (req, res, next) => {
    try {
        const { title } = req.body;
        if (!title && !req.file) {
            return res.status(400).json({ message: 'title or image is required' });
        };

        let result = {};
        if (req.file) {
            result = await uploadPromise(req.file.path)
            fs.unlinkSync(req.file.path)
        };

        const post = await Post.create({
            title,
            userId: req.user.id,
            img: result.secure_url
        });

        res.status(200).json({ post })
    } catch (err) {
        next(err)
    }
}