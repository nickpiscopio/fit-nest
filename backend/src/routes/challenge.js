const express = require('express');
const router = express.Router();

const challenge = require('./implementation/challenge');

router.get('/', challenge.getChallenges);
router.delete('/', challenge.deleteChallenge);
router.post('/', challenge.insertChallenge);
router.put('/', challenge.editChallenge);

module.exports = router;
