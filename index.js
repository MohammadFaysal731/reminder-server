const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {
  MongoClient,
  ServerApiVersion,
  ClientSession,
  ObjectId,
} = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.96lbrwe.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    const itemsCollection = client.db("reminder").collection("items");
    //this api for get all items
    app.get("/items", async (req, res) => {
      const items = await itemsCollection.find().toArray();
      res.send(items);
    });
    //this api for get single item
    app.get("/item/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const item = await itemsCollection.findOne(query);
      res.send(item);
    });
    //this api for post a item
    app.post("/items", async (req, res) => {
      const itemData = req.body;
      const addedItem = await itemsCollection.insertOne(itemData);
      res.send(addedItem);
    });
    //this api for remove make item
    app.patch("/item/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          mark: "",
        },
      };
      const markedItem = await itemsCollection.updateOne(filter,updateDoc,);
      res.send(markedItem);
    });
    //this api for add make item
    app.put("/item/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          mark: "mark",
        },
      };
      const markedItem = await itemsCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(markedItem);
    });
    // this api for delete item
    app.delete("/item/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const deletedItem = await itemsCollection.deleteOne(query);
      res.send(deletedItem);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hell from Reminder App");
});

app.listen(port, () => {
  console.log(`Reminder App listening on port ${port}`);
});
