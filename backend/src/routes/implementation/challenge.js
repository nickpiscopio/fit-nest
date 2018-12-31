'use strict';

const statusCodes =  require('../../constant/status-codes');
const responseMessage = require('../../util/response-message');
const Database = require('../../database/database');

function getChallenges(req, res) {
  let query = req.query.query;
  let challengeQuery = "select * from challenge where name like '%" + query + "%' order by date_end desc";
  new Database().execute(challengeQuery, (error, results) => {
    if (error) {
      res.statusCode = statusCodes.ERROR;
      return res.send({message: responseMessage.getFailedMessage('Failed to retrieve challenges.'), error: results });
    }

    return res.send({message: responseMessage.getSuccessMessage('Successfully retrieved challenges.'), data: results});
  });
}

function deleteChallenge(req, res) {
  let challengeRequest = req.body;
  let challengeId = challengeRequest.id;

  const deleteQuery = "delete from challenge where id='" + challengeId + "';";
  new Database().execute(deleteQuery, (hasError, results) => {
    if (hasError) {
      res.statusCode = statusCodes.ERROR;
      return res.send({message: responseMessage.getFailedMessage('Error deleting challenge.'), error: results });
    }

    return res.send({message: responseMessage.getSuccessMessage('Challenge removed.'), data: results });
  });
}

function insertChallenge(req, res) {
  let challengeRequest = req.body;
  let name = challengeRequest.name;
  let dateStart = challengeRequest.dateStart;
  let dateEnd = challengeRequest.dateEnd;

  const insertUserQuery = "insert into challenge (name, date_start, date_end) values ('" + name + "'," + dateStart + "," + dateEnd + ");";
  new Database().execute(insertUserQuery, (hasError, results) => {
    if (hasError) {
      res.statusCode = statusCodes.ERROR;
      return res.send({message: responseMessage.getFailedMessage('Error authorizing user.'), error: results });
    }

    return res.send({message: responseMessage.getSuccessMessage('User authorized.'), data: results });
  });
}

function editChallenge(req, res) {
  let challengeRequest = req.body;
  let id = challengeRequest.id;
  let name = challengeRequest.name;
  let dateStart = challengeRequest.dateStart;
  let dateEnd = challengeRequest.dateEnd;

  const updateUserQuery = "update challenge set name='" + name + "', date_start=" + dateStart + ", date_end=" + dateEnd + " where id=" + id + ";";
  new Database().execute(updateUserQuery, (hasError, results) => {
    if (hasError) {
      res.statusCode = statusCodes.ERROR;
      return res.send({message: responseMessage.getFailedMessage('Error updating user authorization.'), error: results });
    }

    return res.send({message: responseMessage.getSuccessMessage('Updated user authorization.'), error: results });
  });
}

module.exports = {
  getChallenges: getChallenges,
  deleteChallenge: deleteChallenge,
  insertChallenge: insertChallenge,
  editChallenge: editChallenge
};
