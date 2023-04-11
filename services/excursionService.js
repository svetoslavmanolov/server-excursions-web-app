const Excursion = require('../models/Excursion');

exports.getAll = () => Excursion.find();
exports.getOne = (excursionId) => Excursion.findById(excursionId);
exports.getOneDetailed = (excursionId) => Excursion.findById(excursionId).populate('owner').populate('listOfUsersBooked');
exports.update = (excursionId, excursionData) => Excursion.updateOne({ _id: excursionId }, { $set: excursionData }, { runValidators: true });
exports.delete = (excursionId) => Excursion.deleteOne({_id: excursionId});
exports.create = (excursionData) => Excursion.create(excursionData);

exports.findSearchedToys = (search) => Excursion.find({ title: { $regex: new RegExp(search, 'i') } });

