const excursionService = require('../services/excursionService');

exports.preLoadExcursion = async (req, res, next) => {
    const excursion = await excursionService.getOne(req.params.excursionId).lean();
    req.excursion = excursion;
    next();
}

exports.isExcursionOwner = (req, res, next) => {  
    if (req.excursion.owner != req.user._id) {
        // return next({ message: 'You are not authorized', status: 401 });
        return next({ message: 'You are not authorized to edit or delete this item', status: 401 });
    }
    next();
}