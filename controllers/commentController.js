const { Post, Comment, Friend } = require('../models');
const { Op } = require('sequelize');

exports.createComment = async (req, res, next) => {
    try {
        const { title, postId } = req.body;

        const post = await Post.findOne({ where: { id: postId } })

        if (!post) {
            return res.status(400).json({ message: ' post not found' })
        }

        let canComment = req.user.id === post.userId;

        if (!canComment) {

            const friend = await Friend.findOne({
                where: {
                    status: 'ACCEPTED',
                    [Op.or]: [
                        {
                            requestToId: req.user.id,
                            requestFromId: post.userId
                        },
                        {
                            requestToId: post.user.id,
                            requestFromId: req.userId
                        }
                    ]
                }
            });

            if (!friend) {
                return res.status(403).json({ message: ' cannot comment this post' })
            }
        }

        const comment = await Comment.create({
            title,
            postId,
            userId: req.user.id
        });

        res.status(201).json({ comment });
    } catch (err) {
        next(err);
    }
}