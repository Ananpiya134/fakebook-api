const bcrypt = require('bcryptjs');
const { User } = require('../models')
const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


exports.register = async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            emailOrPhoneNumber,
            password,
            confirmPassword
        } = req.body;

        if (password != confirmPassword) {
            return res
                .status(400)
                .json({ message: ' password and confirm password are not matching' })
        }

        const isEmail = emailFormat.test(emailOrPhoneNumber);
        if (isEmail) {
            const existUser = await User.findOne({
                where: {
                    email: emailOrPhoneNumber
                }
            });

            if (existUser) {
                return res.status(400).json({ message: 'this email or email is already in used' })
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            firstName,
            lastName,
            email: isEmail ? emailOrPhoneNumber : null,
            phoneNumber: isEmail ? emailOrPhoneNumber : null,
            password: hashedPassword
        })
        res.status(201).json({ message: 'user is created' })

    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {

    } catch (err) {
        next(err);
    }
};