const Comment = require('../models/Comment');
const Excursion = require('../models/Excursion');


exports.create = (comment) => Comment.create(comment);
exports.getCommentsByExcursionId = (excursionId) => Excursion.findById(excursionId).populate('comments');