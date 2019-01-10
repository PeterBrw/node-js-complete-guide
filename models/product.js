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
      }); // this 'find()' it will return all the documents from the collection 'products', and it will not return a 'promise' it will return 'cursor;(an object provided by mongodb), all '.toArray()' it will turn all documents into JS array(we should use this just if we know that there are maximum 100 documents in our collection, otherwise is good to use 'pagination'(we will use it later in the course))
  } 
}

module.exports = Product;
