'use strict';

const statusCodes =  require('../../constant/status-codes');
const responseMessage = require('../../util/response-message');
const Database = require('../../database/database');

const USER_GROUP_ADMIN = 'ADMIN';

function getAuthorizedUsers(req, res) {
  let query = req.body.query;
  let userQuery = "select * from users where name like '%" + query + "%' or email like '%" + query + "%'";
  new Database().execute(userQuery, (error, results) => {
    if (error) {
      res.statusCode = statusCodes.ERROR;
      return res.send({message: responseMessage.getFailedMessage('Failed to retrieve users.'), error: results });
    }

    return res.send({message: responseMessage.getSuccessMessage('Successfully retrieved users.'), data: results});
  });
}

function removeAuthorizationForUser(req, res) {
  let userRequest = req.body;
  let userEmail = userRequest.email;

  const deleteUserQuery = "delete from users where email='" + userEmail + "';";
  new Database().execute(deleteUserQuery, (hasError, results) => {
    if (hasError) {
      res.statusCode = statusCodes.ERROR;
      return res.send({message: responseMessage.getFailedMessage('Error removing authorization for user.'), error: results });
    }

    return res.send({message: responseMessage.getSuccessMessage('User authorization removed.'), error: results });
  });
}

function authorizeUser(req, res) {
  let userRequest = req.body;
  let name = userRequest.name;
  let userEmail = userRequest.email;
  let userType = userRequest.userType;

  authorizeUserImplementation(res, name, userEmail, userType);
}

function editUser(req, res) {
  let userRequest = req.body;
  let name = userRequest.name;
  let oldEmail = userRequest.oldEmail;
  let newEmail = userRequest.email;

  const updateUserQuery = "update users set name='" + name + "', email='" + newEmail + "' where email='" + oldEmail + "';";
  new Database().execute(updateUserQuery, (hasError, results) => {
    if (hasError) {
      res.statusCode = statusCodes.ERROR;
      return res.send({message: responseMessage.getFailedMessage('Error updating user authorization.'), error: results });
    }

    return res.send({message: responseMessage.getSuccessMessage('Updated user authorization.'), error: results });
  });
}

function verifyUser(req, res) {
  let userRequest = req.body;
  let name = userRequest.name;
  let userEmail = userRequest.email;

  checkUserAuthorization(userEmail, (userIsAuthorized, results) => {
    if (!hasAuthorization(userIsAuthorized)) {
      return sendUnauthorizedMessage(res, results);
    }

    if (userIsAuthorized) {
      return sendAuthorizedMessage(res, results);
    }

    checkAuthorizedUserCount((hasUsers) => {
      if (hasUsers) {
        return sendUnauthorizedMessage(res, null);
      }

      return authorizeUserImplementation(res, name, userEmail, USER_GROUP_ADMIN);
    });
  });
}

function checkUserAuthorization(email, callback) {
  const selectUserQuery = "select email, user_group from users where email='" + email + "'";
  console.log("select: ", selectUserQuery);
  new Database().execute(selectUserQuery, (hasError, results) => {
    if (hasError) {
      return callback(null, results);
    }

    if (hasResults(results)) {
      return callback(true, results);
    }

    return callback(false, results);
  });
}

function authorizeUserImplementation(res, name, email, userGroup) {
  const insertUserQuery = "insert into users (name, email, user_group) values ('" + name + "','" + email + "','" + userGroup + "');";
  new Database().execute(insertUserQuery, (hasError, results) => {
    if (hasError) {
      res.statusCode = statusCodes.ERROR;
      return res.send({message: responseMessage.getFailedMessage('Error authorizing user.'), error: results });
    }

    return sendAuthorizedMessage(res, results);
  });
}

function sendUnauthorizedMessage(res, error) {
  res.statusCode = statusCodes.ERROR_UNAUTHORIZED;
  res.send({message: responseMessage.getFailedMessage('User is unauthorized.'), error: error });
}

function sendAuthorizedMessage(res, results) {
  res.send({message: responseMessage.getSuccessMessage('User authorized.'), data: results });
}

function checkAuthorizedUserCount(callback) {
  const selectCountQuery = "select count(*) from users;";
  new Database().execute(selectCountQuery, (hasError, results) => {
    const hasUsers = doesResultsHaveUsers(results);
    callback(hasUsers);
  });
}

function hasAuthorization(authorization) {
  return authorization !== null;
}

function hasResults(results) {
  return results !== undefined && results.length > 0;
}

function doesResultsHaveUsers(results) {
  const resultsIndex = 0;
  return results[resultsIndex].count > 0;
}

module.exports = {
  getAuthorizedUsers: getAuthorizedUsers,
  removeAuthorizationForUser: removeAuthorizationForUser,
  authorizeUser: authorizeUser,
  editUser: editUser,
  verifyUser: verifyUser
};
