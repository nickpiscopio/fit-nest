const express = require('express');
const router = express.Router();

const social = require('./implementation/social');

router.get('/', social.getPartners);

module.exports = router;
