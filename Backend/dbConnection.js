const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'TickTick'; 

async function main() {
  await client.connect();
  console.log('Connected successfully to server');

  const db = client.db(dbName);

  const collection = db.collection('Tasks');
  const count = await collection.countDocuments();
  console.log(`Number of documents in collection: ${count}`);

  return 'done';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
