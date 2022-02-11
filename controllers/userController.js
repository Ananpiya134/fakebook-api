exports.updateProfileImg = async (req, res, next) => {
    try {
        res.json({ message: 'upload profile image' });
    } catch (err) {
        next(err);
    }
};