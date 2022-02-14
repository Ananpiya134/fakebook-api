const { Op } = require('sequelize');
const { Friend, User } = require('../models');

exports.getAllFriend = async (req, res, next) => {
    try {

        const { status, searchName } = req.query;
        const where = {};
        if (status) where.status = status
        const friend = await Friend.findAll({
            where: {
                ...where,
                [Op.or]: [
                    { requestToId: req.user.id },
                    { requestFromId: req.user.id }
                ]
            }
        });

        const friendIds = friend.reduce((acc, item) => {

            if (req.user.id === item.requestFromId) {
                acc.push(item.requestToId)
            } else {
                acc.push(item.requestFromId)
            }


            return acc;


        }, [])


        let userWhere = {};
        if (searchName) {
            userWhere = {
                [Op.or]: [
                    {
                        firstName: {
                            [Op.substring]: searchName
                        }
                    },
                    {
                        lastName: {
                            [Op.substring]: searchName
                        }
                    }
                ]
            }
        }
        const users = await User.findAll(
            {
                where: {
                    id: friendIds,
                    ...userWhere
                },
                attributes: {
                    exclude: ['password']
                }
            }
        );

        res.status(200).json({ users });

    } catch (err) {
        next(err);
    }
}


exports.requestFriend = async (req, res, next) => {
    try {
        const { requestToId } = req.body;

        const existFriend = await Friend.findOne({
            where: {
                [Op.or]: [
                    {
                        requestFromId: req.user.id,
                        requestToId
                    },
                    {
                        requestFromId: requestToId,
                        requestToId: req.user.id
                    }
                ]
            }
        })

        if (existFriend) {
            return res.status(400).json({ message: 'this friend has already been requested' });
        }
        await Friend.create({
            requestToId,
            status: 'REQUESTED',
            requestFromId: req.user.id
        })
        res.status(200).json({ message: 'friend request has been sent' })
    } catch (err) {
        next(err)
    }

}


exports.updateFriend = async (req, res, next) => {
    try {
        const { friendId } = req.params;
        const friend = await Friend.findOne({ where: { id: friendId, status: 'REQUESTED' } });
        if (!friend) {
            return res.status(400).json({ message: 'the friend request with this id is not exist' })
        }

        await Friend.update(
            { status: 'ACCEPTED' },
            {
                where: {
                    id: friendId
                }
            }
        );
        res.status(200).json({ message: 'accept friend request' });


    } catch (err) {
        next(err)
    }
}

exports.deleteFriend = async (req, res, next) => {
    try {
        const { friendId } = req.params
        const friend = await Friend.findOne({ where: { id: friendId } })

        if (!friend) {
            return res.status(400).json({ message: 'this friend request not found' })
        }

        if (
            friend.requestFromId !== req.user.id &&
            friend.requestToId !== req.user.id
        ) {
            return res.status(403).json({ message: 'cannot delete friend request' })
        }

        await Friend.destroy({ where: { id: friendId } });
        res.status(200).json();


    } catch (err) {
        next(err)
    }
}
