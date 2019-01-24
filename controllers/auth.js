const bcrypt = require('bcryptjs'); 

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: req.flash('error') // here we are rendering the errorMessage from the session just accessing the req.flash('error') just the key of that message
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup'
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email: email})
    .then(user => {
      if(!user) {
        req.flash('error', 'Invalid email or password'); // here we creating a message with key 'error' and message 'Invalid email or password' which are stored in a session
        return res.redirect('login');
      }
      bcrypt
        .compare(password, user.password) 
        .then(doMatch => {
          if(doMatch) { 
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              return res.redirect('/');
            });  
          }
          res.redirect('/login'); 
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        }); 
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;   
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword; 
  User.findOne({email: email}) 
    .then(userDoc => {
      if(userDoc) {  
        return res.redirect('/signup'); 
      }
      return bcrypt
      .hash(password, 12)
      .then(hashedPassword => { 
        const user = new User({ 
          email: email,
          password: hashedPassword, 
          cart: { items: [] } 
        });
        return user.save(); 
      }) 
    })
    .then(result => {
      res.redirect('/login'); 
    })
    .catch(err => {
    console.log(err)
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
