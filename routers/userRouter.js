const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const User = require('../models/User')
const { jwtAuthMiddleware, generateToken } = require('../jwt')

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists." });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });
        const savedUser = await user.save();

        const payload = {
            id: savedUser._id,
            username: savedUser.email
        }
        const token = generateToken(payload);

        res.json({
            response: savedUser,
            token: token,
        });

    } catch (error) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("Invalid email or password.");
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send("Invalid username or password.");
        }
        const payload = {
            id: user.id,
            username: user.email
        }
        const token = generateToken(payload);
        res.status(200).json({ token: token });
    } catch (error) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/', jwtAuthMiddleware , async (req, res) => {
    try {
        const data = await User.find();
        res.status(200).json({ responce: data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;
