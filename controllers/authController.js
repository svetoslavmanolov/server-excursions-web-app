const router = require('express').Router();
const jwt = require('jsonwebtoken');

const authService = require('../services/authService');
const { COOKIE_SESSION_NAME } = require('../constants');
const { getErrorMessage } = require('../utils/errorHelpers');
const { SECRET } = require('../config/env');
const { isAuth, isGuest } = require('../middlewares/authMiddleware');

router.post('/register', isGuest, async (req, res) => {
    const { email, username, password } = req.body;
    // if (password !== rePassword) {
    //     throw new Error('Passwords mismatch')
    // }
    try {
        const user = await authService.create({ email, username, password });
        // const token = await authService.createToken(user);
        const payload = { _id: user._id, username: user.username };
        const token = jwt.sign(payload, SECRET, { expiresIn: '1d' });
        // res.cookie(COOKIE_SESSION_NAME, token, { httpOnly: true });
        res.cookie('token', token, { httpOnly: false })
        res.status(200).json({ user: { _id: user._id, email: user.email, username: user.username } })
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) });
    }
});

router.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authService.login(email, password);
        // const token = await authService.createToken(user);
        const payload = { _id: user._id, username: user.username };
        // const token = jwt.sign(payload, SECRET, { expiresIn: '1d' });
        const token = await authService.createToken(user);

        res.cookie('token', token, { httpOnly: true })
        res.status(200).json({ user: { _id: user._id, email: user.email, username: user.username } })
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).end();
});

module.exports = router;