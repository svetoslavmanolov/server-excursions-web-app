const router = require('express').Router();

const authController = require('./controllers/authController');
const excursionController = require('./controllers/excursionController');
const commentController = require('./controllers/commentController');

router.use('/auth', authController);
router.use('/excursions', excursionController);
router.use('/comments', commentController);
router.use('*', (req, res) => {
    res.status(406).render('404', {error: 'Uncorrect URL path'});
});

module.exports = router;
