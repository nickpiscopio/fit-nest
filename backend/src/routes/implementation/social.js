'use strict';

const statusCodes =  require('../../constant/status-codes');
const responseMessage = require('../../util/response-message');
const Database = require('../../database/database');

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
  editPartners: editPartners,
  addPartners: addPartners
};
