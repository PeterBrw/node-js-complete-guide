const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://maximilian:maximilian@cluster0-5pzzp.mongodb.net/test?retryWrites=true'
  )
  .then(client => {
    console.log('Connected!');
    callback(client);
  })
  .catch(err => {
    console.log(err);
  });
};

module.exports = mongoConnect;
