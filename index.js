const express =require("express");
const cors =require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ClientSession } = require("mongodb");
const app=express();
const port =process.env.PORT ||5000;

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
    const itemsCollection = client.db('reminder').collection("items");
    //this api for get all items
    app.get('/items', async(req,res)=>{
      const items = await itemsCollection.find().toArray();
      res.send(items);
    })
    //this api for post a item
    app.post('/items',async(req,res)=>{
      const itemData =req.body;
      const addedItem = await itemsCollection.insertOne(itemData);
      res.send(addedItem);
    })

  } 
  finally {
  
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
  res.send("Hell from Reminder App")
})

app.listen(port,()=>{
  console.log(`Reminder App listening on port ${port}`);
});