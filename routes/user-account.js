'use strict';

const { Router } = require('express');
const router = Router();

const {
  getCurrentUserAccountDetails,
  showEditAccountForm,
  editUserAccount
} = require('../controllers/userAccountCtrl');

router.get('/account', isLoggedIn, getCurrentUserAccountDetails);
router.get('/edit-account', isLoggedIn, showEditAccountForm);
router.post('/edit-account', isLoggedIn, editUserAccount);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

module.exports = router;
