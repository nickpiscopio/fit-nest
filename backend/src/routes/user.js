const express = require('express');
const router = express.Router();

const user = require('./implementation/user');

router.post('/', user.getAuthorizedUsers);
router.delete('/authorize', user.removeAuthorizationForUser);
router.post('/authorize', user.authorizeUser);
router.put('/authorize', user.editUser);
router.post('/authorize/verify', user.verifyUser);

module.exports = router;
