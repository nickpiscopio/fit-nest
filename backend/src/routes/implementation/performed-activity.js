'use strict';

const statusCodes =  require('../../constant/status-codes');
const responseMessage = require('../../util/response-message');
const Database = require('../../database/database');
const social = require('./social');

function getPerformedActivities(req, res) {
  let challengeId = req.query.challenge_id;
  let userEmail = req.query.user_email;

  const performedActivityQuery = "select * from challenge where challenge_id='" + challengeId + "' and user_email='" + userEmail + "' order by date_end desc";
  new Database().execute(performedActivityQuery, (error, results) => {
    if (error) {
      res.statusCode = statusCodes.ERROR;
      return res.send({ message: responseMessage.getFailedMessage('Failed to retrieve performed activities.'), error: results });
    }

    return res.send({ message: responseMessage.getSuccessMessage('Successfully retrieved performed activities.'), data: results});
  });
}

function deletePerformedActivity(req, res) {
  let performedActivityId = req.body.id;

  const deleteQuery = "delete from performed_activity where id='" + performedActivityId + "';";
  new Database().execute(deleteQuery, (hasError, results) => {
    if (hasError) {
      res.statusCode = statusCodes.ERROR;
      return res.send({ message: responseMessage.getFailedMessage('Error deleting performed activity.'), error: results });
    }

    // TODO: ADD TO THE SOCIAL TABLE TOO

    return res.send({ message: responseMessage.getSuccessMessage('Performed activity removed.'), data: results });
  });
}

function insertPerformedActivity(req, res) {
  let request = req.body;
  let date = request.date;
  let userEmail = request.userEmail;
  let activity = request.activity;
  let challengeId = request.challengeId;
  let partners = request.partners;
  // TODO: FIX THIS LATER
  // TODO: THIS IS HARDCODED FOR NOT UNTIL WE HAVE A SERVICE TO ADD THE EARNED POINTS.
  let earnedPoints = 10;

  const insertQuery = "insert into performed_activity (date, user_email, activity, challenge_id, earned_points) values ('" + date + "'," + userEmail + "," + activity + "," + challengeId + "," + earnedPoints + ") RETURNING id;";
  new Database().execute(insertQuery, (hasError, results) => {
    if (hasError) {
      res.statusCode = statusCodes.ERROR;
      return res.send({ message: responseMessage.getFailedMessage('Error inserting performed activity.'), error: results });
    }

    // TODO: 'results.id' MIGHT BE WRONG.
    social.addPartners(userEmail, partners, challengeId, results.id, (hasError) => {
      if (hasError) {
        res.statusCode = statusCodes.ERROR;
        return res.send({ message: responseMessage.getFailedMessage('Error adding partners to the performed activity.'), error: results });
      }

      return res.send({ message: responseMessage.getSuccessMessage('Partners added to the performed activity.'), data: results });
    });
  });
}

function editPerformedActivity(req, res) {
  let request = req.body;
  let performedActivityId = request.id;
  let date = request.date;
  let userEmail = request.userEmail;
  let activity = request.activity;
  let challengeId = request.challengeId;
  let partners = request.partners;
  // TODO: FIX THIS LATER
  // TODO: THIS IS HARDCODED FOR NOT UNTIL WE HAVE A SERVICE TO ADD THE EARNED POINTS.
  let earnedPoints = 10;

  const updateQuery = "update performed_activity set date='" + date + "', user_email=" + userEmail + ", activity=" + activity + ", challenge_id=" + challengeId + ", earned_points=" + earnedPoints + " where id=" + performedActivityId + ";";
  new Database().execute(updateQuery, (hasError, results) => {
    if (hasError) {
      res.statusCode = statusCodes.ERROR;
      return res.send({message: responseMessage.getFailedMessage('Error updating performed activity.'), error: results });
    }

    social.editPartners(userEmail, partners, challengeId, performedActivityId, (hasError) => {
      if (hasError) {
        res.statusCode = statusCodes.ERROR;
        return res.send({ message: responseMessage.getFailedMessage('Error updating partners for the performed activity.'), error: results });
      }

      return res.send({ message: responseMessage.getSuccessMessage('Partners updated for the performed activity.'), data: results });
    });
  });
}

module.exports = {
  getPerformedActivities: getPerformedActivities,
  deletePerformedActivity: deletePerformedActivity,
  insertPerformedActivity: insertPerformedActivity,
  editPerformedActivity: editPerformedActivity
};
