const mongodb = require('mongodb');
const getDb = require('../util/database').getDb; 

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
  }

  save() {
    const db = getDb();
    let dbOp; // db operation(s)!?
    if(this._id) {
      // Update the product
      dbOp = db.collection('products').updataOne({_id: new mongodb.ObjectId(this.id)}, {$set: this}); // here it will overwrite all the other fields, just 'id' not
    } else {
      dbOp = db
      .collection('products').insertOne(this)
    }
    return dbOp
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
