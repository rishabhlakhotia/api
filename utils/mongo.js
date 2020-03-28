const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

module.exports.sendToMongo = function (filename, collectionName, arr) {
  const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

	var finalJSON = JSON.parse(fs.readFileSync(filename, 'utf8'))[arr];

  client.connect(err => {
		client.db('covid').collection(collectionName).drop();
    const collection = client.db('covid').collection(collectionName).insertMany(finalJSON, function (err, res) {
      if (err) console.log(err);
      else {
        client.close();
      }
    });
  });

}
