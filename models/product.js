const getDb = require('../util/database').getDb; 

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb(); // this will use the connection to database
    db.collection('products'). // this will create a collection 'products' if not exist one already
      insertOne(this) // and here it will insert to that collection 'this' object
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Product;