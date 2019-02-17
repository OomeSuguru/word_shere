var express = require('express');
var router = express.Router();
const Word = require('../models/word');

/* GET home page. */
router.get('/', (req, res, next) => {
  const title = '障壁のあるメッセージ';
  if (req.user) {
    Word.findAll({
      where: {
        createdBy: req.user.id
      },
      order: [['"updatedAt"', 'DESC']]
    }).then((words) => {
      res.render('index', {
        title: title,
        user: req.user,
        words: words
      });
    });
  } else {
    res.render('index', { title: title, user: req.user });
  }
});

module.exports = router;
