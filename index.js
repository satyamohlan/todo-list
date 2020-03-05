const express = require("express");

const mongoose = require("mongoose");
const task = require("./models/record");
const app = express();
const db = require("./config/keys").MongoUri;
require('dotenv').config();
mongoose.connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log("mongo db connected"))
  .catch(err => console.log(err))
//app.use(expressLayouts);
app.set("view engine", 'ejs');

app.use(express.urlencoded({extended: false}));
const port=process.env.PORT||3000;
app.listen(port, () => {
  console.log("running at "+port);
});
app.use("/css", express.static("views/css"));
app.get("/todo", (req, res) => {

  task.find({},(err,data)=>{
    if (err){throw err;}
   
  res.render("todo",{data});
  });
  
})

app.post('/todo', (req, res) => {
    var {str}=req.body;
  console.log(str);
var ntask=new task({task:str});
ntask.save((err,json)=>{
if (err){throw err;}
else{console.log("sucesss");}
});
console.log(ntask);
res.redirect("/todo");

})
app.delete('/todo', (req, res) => {

task.deleteOne({task:req.query.item},(err,data)=>{
  if (err) throw err;
  else{
   res.json(data);
  }
})
  })