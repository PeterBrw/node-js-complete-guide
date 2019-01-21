const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req
  // // .get('Cookie')
  // // .split(';')[0]
  // // .trim()
  // // .split('=')[1] === 'true'; 
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('5c3db72f04b84d2068ef4f14') 
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user; // here we are assing the user to the session not any to the request 
      res.redirect('/');
    })
    .catch(err => console.log(err));
  
}; 