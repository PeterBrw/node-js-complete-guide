const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session); // importing connect-mongodb-session which will give us a function and we will pass the session as argument to that function

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://maximilian:maximilian@cluster0-5pzzp.mongodb.net/shop'; // the connection URI to our mongo database

const app = express();

const store = new MongoDBStore({ // here we are connecting our sessions to the database
  uri: MONGODB_URI, // the connection URI to our mongo database
  collection: 'sessions' // creating a collection 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret', 
    resave: false, 
    saveUninitialized: false, 
    store: store // 'store: store' means that all the sessions will be stored in our databese which was define in 'store' variable above
  })
); 

app.use((req, res, next) => {
  User.findById('5c3db72f04b84d2068ef4f14') 
    .then(user => {
      req.user = user ; 
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);  

app.use(errorController.get404);

mongoose 
  .connect(
    MONGODB_URI // the connection URI to our mongo database 
  )
  .then(result => {
    User.findOne().then(user => { 
      if(!user) { 
        const user = new User({ 
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: [] 
          }
        });
        user.save(); 
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });