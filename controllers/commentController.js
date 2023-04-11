const router = require('express').Router();

const commentService = require('../services/commentService');
const userService = require('../services/userService');
const excursionService = require('../services/excursionService');

router.post('/create', async (req, res) => {
    const commentData = { text: req.body.text, creator: req.user.username, excursion: req.body.excursionId, creatorId: req.user._id };
    const user = await userService.getOne(req.user._id);
    const excursion = await excursionService.getOne(req.body.excursionId);
    try {
        const comment = await commentService.create(commentData);
        user.comments.push(comment._id);
        excursion.comments.push(comment._id);
        await user.save();
        await excursion.save();
        res.status(201).json( comment );
    } catch (error) {
        res.status(400).json({ error: "Comment is not created!" });
    }
});

router.get('/:excursionId', async (req, res) => {
    const excursion = await commentService.getCommentsByExcursionId(req.params.excursionId);
    res.status(200).json( excursion.comments );
});

module.exports = router;
