'use strict';

const statusCodes =  require('../../constant/status-codes');
const responseMessage = require('../../util/response-message');
const Database = require('../../database/database');

function getPartners(req, res) {
  let performedActivityId = req.query.performed_activity_id;

  const partnersQuery = "select * from social where performed_activity_id='" + performedActivityId + "';";
  new Database().execute(partnersQuery, (error, results) => {
    if (error) {
      res.statusCode = statusCodes.ERROR;
      return res.send({ message: responseMessage.getFailedMessage('Failed to retrieve partners.'), error: results });
    }

    return res.send({ message: responseMessage.getSuccessMessage('Successfully retrieved partners.'), data: results});
  });
}

function editPartners(userEmail, partners, challengeId, performedActivityId, callback) {
  removePartners(performedActivityId, (hasError) => {
    if (hasError) {
      callback(hasError);
    }

    addPartners(userEmail, partners, challengeId, performedActivityId, callback);
  });
}

function addPartners(userEmail, partners, challengeId, performedActivityId, callback) {
  let errorAddingPartners = false;
  let totalPartners = partners.length;
  for (let i = 0; i < totalPartners; i++) {
    let partnerEmail = partners[i].email;
    addPartner(userEmail, partnerEmail, challengeId, performedActivityId, (hasError) => {
      errorAddingPartners = hasError;

      if (isFinishedAddingPartners(i, totalPartners)) {
        callback(errorAddingPartners);
      }
    });
  }
}

function addPartner(userEmail, partnerEmail, challengeId, performedActivityId, callback) {
  const addPartnerQuery = "insert into social (user_email, partner_email, challenge_id, performed_activity_id) values ('" + userEmail + "," + partnerEmail + "," + challengeId + "," + performedActivityId + ");";
  new Database().execute(addPartnerQuery, (hasError, results) => {
    callback(hasError);
  });
}

function removePartners(performedActivityId, callback) {
  const removePartnersQuery = "delete from social where performed_activity_id=" + performedActivityId + ";";
  new Database().execute(removePartnersQuery, (hasError, results) => {
    callback(hasError);
  });
}

function isFinishedAddingPartners(index, totalPartners) {
  return index === totalPartners - 1;
}

module.exports = {
  getPartners: getPartners,
  editPartners: editPartners,
  addPartners: addPartners,
  removePartners: removePartners
};
