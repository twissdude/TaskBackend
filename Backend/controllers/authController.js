const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1h'});
};

//Register a new User

exports.register = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({error: 'Email already registered'});
        }

        const user = new User({username, email, password});
        await user.save();

        res.status(201).json({message: 'User registered successfully'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

//Login user

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))) {
            return res.status(400).json({error: 'Invalid email or Password'})
        }

        const token = generateToken(user._id);
        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};