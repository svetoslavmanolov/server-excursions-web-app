const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const { preLoadExcursion, isExcursionOwner } = require('../middlewares/excursionMiddlewares');

const excursionService = require('../services/excursionService');
const userService = require('../services/userService');
const { getErrorMessage } = require('../utils/errorHelpers');
// const { COOKIE_SESSION_NAME } = require('../constants');

router.post('/create', async (req, res) => {
    const excursionData = { ...req.body, owner: req.user._id, creatorName: req.user.username };
    const user = await userService.getOne(req.user._id);

    try {
        const excursion = await excursionService.create(excursionData);
        user.excursions.push(excursion._id);
        await user.save();

        res.status(200).json({ excursion })
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) });
    }
});


router.get('/', async (req, res) => {
    try {
        const excursions = await excursionService.getAll().lean();
        res.status(200).json(excursions);
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) })
    }
});

router.get('/:excursionId/details', async (req, res) => {
    const excursion = await excursionService.getOneDetailed(req.params.excursionId).lean();  //tuk sme populate-nali author, no ne i usersShared, s koito move da si raboti kato masiv ot ObjectId-ta i veche ako iskame i te da sa popalneni kato imena i obekti trqbva da gi populate-nem i tqh
    // res.render('toy/details', { ...toy, isOwner, isBought })
    // res.json({ ...excursion, isOwner, isBought });
    // const bookedUsers = excursion.listOfUsersBooked.map(x => x.username).join(', ');
    // console.log(bookedUsers);
    res.json({ ...excursion });
});

router.get('/:excursionId/book', isAuth, async (req, res) => {
    try {
        const excursion = await excursionService.getOne(req.params.excursionId);
        const user = await userService.getOne(req.user._id);

        if (!excursion.listOfUsersBooked.includes(req.user._id)) {
            excursion.listOfUsersBooked.push(req.user._id);  //taka rabotim s dokumenta kojto ne e lean() i posle go save-vam s await
            user.bookedExcursions.push(excursion._id);
            await excursion.save();
            await user.save();
        }
        res.status(200).json({ excursion });
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) });
    }

});

router.post('/:excursionId/edit', isAuth, preLoadExcursion, isExcursionOwner, async (req, res) => {  //tuk preLoadPublication shte raboti samo ako ima ssa sashtoto ime :publicationId. Tova si e nqkakva nasha vatresha konvenciq
    const excursionData = { ...req.body };
    try {
        await excursionService.update(req.params.excursionId, excursionData);
        const excursion = await excursionService.getOneDetailed(req.params.excursionId).lean();
        res.status(200).json({ ...excursion });
    } catch (error) {
        res.status(401).json({ error: getErrorMessage(error) });
    }
});

router.get('/:excursionId/delete', isAuth, preLoadExcursion, isExcursionOwner, async (req, res) => {
    try {
        await excursionService.delete(req.params.excursionId);
        res.status(200);
    } catch (error) {
        res.status(401).json({ error: getErrorMessage(error) });
    }
});

module.exports = router;