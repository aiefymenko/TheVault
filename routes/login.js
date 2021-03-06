/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

// Save user id in the session first and then redirect to /accounts route
module.exports = (db) => {
  router.get("/:id", (req, res) => {
    req.session.user_id = req.params.id;
    res.redirect('/accounts');
  });

  return router;
};
