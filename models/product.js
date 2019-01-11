const mongodb = require('mongodb');
const getDb = require('../util/database').getDb; 

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb();
    return db.collection('products').
      insertOne(this) 
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => {
        console.log(err);
      }); 
  } 
 
  static findById(prodId) { // trying to find a single product by id 
    const db = getDb();
    return db
      .collection('products') // in the collection 'products'
      .find({_id: new mongodb.ObjectId(prodId) }) // in mongodb the id is stored as '_id', in mongodb as well we don't have js objects, that's why we have to translate that to js in some way 'new mongodb.ObjectId(prodId)' just if we are donig this it will fetch that id that we want
      .next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Product;
