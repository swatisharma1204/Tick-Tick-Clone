const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb')

const app = express();
const port = 5001;

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'TickTick';

let db, tasksCollection;

app.use(bodyParser.json());
app.use(cors());

async function connectToDatabase() {
  await client.connect();
  console.log('Connected successfully to MongoDB server');
  db = client.db(dbName);
  tasksCollection = db.collection('Tasks');
}

connectToDatabase().catch(console.error);

// API endpoint to get all tasks
app.get('/api/tasks', async (req, res) => {
  const tasks = await tasksCollection.find({}).toArray();
  res.send(tasks);
});

// API endpoint to add a new task
app.post('/api/tasks', async (req, res) => {
  const newTask = req.body;
  const result =  await tasksCollection.insertOne(newTask);
  res.json(result);
});

// API endpoint to update a task
app.post('/api/tasks/:_id', async (req, res) => {
  const {_id, updatedTask} = req.body;
  const responseFromDb = await tasksCollection.updateOne({ _id: ObjectId.createFromHexString(_id) }, { $set: updatedTask });
  res.json(responseFromDb);
});

app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await tasksCollection.deleteOne({ _id: ObjectId.createFromHexString(id) });
    res.send({ message: 'Task deleted' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).send({ message: 'Failed to delete task' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

 