const express =require("express");
require("dotenv").config();
const app=express();
const port =process.env.PORT ||5000;


app.get('/',(req,res)=>{
  res.send("Hell from Reminder App")
})

app.listen(port,()=>{
  console.log(`Reminder App listening on port ${port}`);
});