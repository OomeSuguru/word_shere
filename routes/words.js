'use strict';
const express = require('express');
const router = express.Router();
const authenticationEnsurer = require('./authentication-ensurer');
const uuid = require('uuid');
const Word = require('../models/word');
const User = require('../models/user');
router.get('/new', authenticationEnsurer, (req, res, next) => {
  res.render('new', { user: req.user });
});

router.post('/', authenticationEnsurer, (req, res, next) => {
  const wordId = uuid.v4();
  const updatedAt = new Date();
  Word.create({
    wordId: wordId,
    wordName: req.body.wordName.slice(0, 255),
    partnerName: req.body.partnerName,
    createdBy: req.user.id,
    updatedAt: updatedAt
  }).then((word) => {
    res.redirect('/words/' + word.wordId);
  });
});

router.get('/:wordId', authenticationEnsurer, (req, res, next) => {
  Word.findOne({
    include: [
      {
        model: User,
        attributes: ['userId', 'username']
      }],
    where: {
      wordId: req.params.wordId
    },
    order: [['"updatedAt"', 'DESC']]
  }).then((word) => {
    if (word) {
      res.render('word', {
        user: req.user,
        word: word,
        users: [req.user]
      });
    } else {
      const err = new Error('指定された予定は見つかりません');
      err.status = 404;
      next(err);
    }
  });
});


router.get('/:scheduleId', authenticationEnsurer, (req, res, next) => {
  Schedule.findOne({
    include: [
      {
        model: User,
        attributes: ['userId', 'username']
      }],
    where: {
      scheduleId: req.params.scheduleId
    },
    order: [['"updatedAt"', 'DESC']]
  }).then((schedule) => {
    if (schedule) {
      Candidate.findAll({
        where: { scheduleId: schedule.scheduleId },
        order: [['"candidateId"', 'ASC']]
      }).then((candidates) => {
        res.render('schedule', {
          user: req.user,
          schedule: schedule,
          candidates: candidates,
          users: [req.user]
        });
      });
    } else {
      const err = new Error('指定された予定は見つかりません');
      err.status = 404;
      next(err);
    }
  });
});
module.exports = router;