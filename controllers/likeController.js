const { Like, Post, Friend } = require('../models');

exports.createLike = async (req, res, next) => {
    try {
        const { postId } = req.body;

        const post = await Post.findOne({ where: { id: postId } })

        if (!post) {
            return res.status(400).json({ message: ' post not found' })
        }

        const like = await Like.findOne({ where: { postId, userId: req.user.id } });

        if (like) {
            res.status(400).json({ message: 'you have already like the post' });
        }

        await Like.create({
            postId,
            userId: req.user.id
        })

        res.status(200).json({ message: 'successfully like the post' })

    } catch (err) {
        next(err);
    }
}

exports.deleteLike = async (req, res, next) => {
    try {
        const { id } = req.params;
        const like = await Like.findOne({ where: { id: id } });

        if (!like) {
            return res.status(400).json({ message: 'like not found' });
        }

        if (req.user.id !== like.userId) {
            res.status(403).json({ message: 'cannot delete this like' });
        }

        await like.destroy();

        res.status(204).json();


    } catch (err) {
        next(err)
    }
}