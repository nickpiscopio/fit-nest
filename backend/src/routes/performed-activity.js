const express = require('express');
const router = express.Router();

const performedActivity = require('./implementation/performed-activity');

router.get('/', performedActivity.getPerformedActivities);
router.delete('/', performedActivity.deletePerformedActivity);
router.post('/', performedActivity.insertPerformedActivity);
router.put('/', performedActivity.editPerformedActivity);

module.exports = router;
