const router = require('express').Router();
const excursionService = require('../services/excursionService');

router.get('/', (req, res) => {
    res.status(200); 
});

router.get('/search', async (req, res) => {
    const { search } = req.query;
    const excursions = await excursionService.findSearchedExcursions(search).lean();

    res.render('search', { excursions, search });
});

module.exports = router;