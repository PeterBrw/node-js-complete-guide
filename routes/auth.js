const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => { 
        if (value === 'test@test.com') { 
          throw new Error('This email address if forbidden.');
        }
        return true;
      }), 
    body(
      'password', // look for the 'password' in the body of the request
       'Please enter a password with only numbers and text and at least 5 characters.' // default error message for this (password validator)
      ) 
      .isLength({ min: 5 }) // minim length of the 'password' to be 5 characters
      .isAlphanumeric()   // in production we should use something more complex than this
  ],
  authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
