
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const app = express();
const _=require("lodash");


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB",{useNewUrlParser:true, useUnifiedTopology: true})



const itemsSchema = {
  name: String
};

const Item = mongoose.model("item",itemsSchema);
const item1 = new Item({
  name:"Welcome to your Todo List"
})
const item2 = new Item({
  name:"Hit the + button to add a new item."
})
const item3 = new Item({
  name:"<---- hit this to delete an item."
})
const defaultItems =[item1,item2,item3];

const listSchema ={
  name: String,
  items: [itemsSchema]    //EMBEDDED COLLECTION
}

const List = mongoose.model("List",listSchema);

app.get("/", function(req, res) {
  const day = date.getDate();
  Item.find().then((data) => {
    if(data.length === 0){
      Item.insertMany(defaultItems);
      res.redirect("/");
    } else {
      res.render("list", {listTitle: day, newListItems: data});
    }
  }).catch((err) => {
    console.log(err);
  });
});

app.get("/:customListName",function(req,res){
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({name: customListName}).then((list) => {
    if(!list){
      const list = new List({
        name: customListName,
        items: defaultItems
      });  
      list.save().then(() => res.redirect("/" + customListName)).catch((err) => console.log(err));
    } else {
      res.render("list", {listTitle: customListName, newListItems: list.items});
    }
  }).catch((err) => {
    console.log(err);
  });
});

app.post("/", function(req, res){
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if(listName === date.getDate()){
    item.save().then(() => {
      res.redirect("/");
    }).catch((err) => {
      console.log(err);
    });
  } else {
    List.findOne({name: listName}).then((list) => {
      list.items.push(item);
      list.save().then(() => {
        res.redirect("/" + listName);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  }
});

app.post("/delete",function(req,res){
  const checkedItemId = req.body.checkbox;
  const listName=req.body.listname;

  if(listName===date.getDate()){
      Item.findByIdAndDelete(checkedItemId).then(() => {
        console.log("Deleted Successfully");
        res.redirect("/");
      }).catch((err) => {
        console.log(err);
    });
  }
  else{
    List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItemId}}}).then(() => {
      console.log("Deleted Successfully");
      res.redirect("/"+listName);
    }).catch((err) => {
      console.log(err);
  });
  }
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});


















// const express = require("express");
// const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js");
// const  mongoose=require("mongoose");
// const app = express();

// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static("public"));
// mongoose.connect("mongodb://127.0.0.1:27017/todolistDB",{useNewUrlParser:true})



// const itemsSchema = {
//   name :String
// };



// const Item = mongoose.model("item",itemsSchema);
// const item1 = new Item({
//   name:"Welcome to your Todo List"
// })
// const item2 = new Item({
//   name:"Hit the + button to add a new item."
// })
// const item3 = new Item({
//   name:"<---- hit this to delete an item."
// })
// const defaultItems =[item1,item2,item3];


// const listSchema ={
//   name: String,
//   items: Array
// }
// const List =mongoose.model("List",listSchema)

// app.get("/", function(req, res) {
// const day = date.getDate();

// Item.find().then((data) => {
//   if(data.length==0){
//    Item.insertMany(defaultItems);
//    res.redirect("/");
//   }
//   else{
//     res.render("list", {listTitle: "Today", newListItems: data});

//   }
//  })
// });


// //DYANMIC ROTUES
// app.get("/:customListName",function(req,res){
//   const customListName=req.params.customListName;
//   // console.log(customListName);
//   List.find({name:customListName}).then((data) => {
//     if(!data){
//       const list =new List({
//         name: customListName,
//         items: defaultItems
//       });  
//       list.save();
//       res.redirect("/"+customListName)
//     }
//     else{
//        console.log(data.items);
//        res.render("list", {listTitle: customListName, newListItems: defaultItems});
//     }
//   })
// })



 
// app.post("/", function(req, res){

//   const itemName = req.body.newItem;
//   const listName=req.body.list

//   const item=new Item({
//     name:itemName
//   });
//   if(listName=="Today"){
//     item.save();
//     res.redirect("/");
//   }
//   else{
//     List.findOneAndUpdate({name:listName})
//     .then((docs)=>{
//       docs.items.push(item);
//       docs.save();
//       console.log("Aa gya")
//       res.redirect("/"+listName)
//         // console.log("Result :",docs);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });
//   }

// });


// app.post("/delete",function(req,res){
//   const checkedItemId = req.body.checkbox;
//   Item.findByIdAndDelete({ _id:checkedItemId}).then(function(){
//     console.log("deleted Successfully"); // Success
//     res.redirect("/");  
//  }).catch(function(error){
//     console.log(error); // Failure
//  });

// })

// // app.get("/work", function(req,res){
// //   res.render("list", {listTitle: "Work List", newListItems: workItems});
// // });

// app.get("/about", function(req, res){
//   res.render("about");
// });

// app.listen(3000, function() {
//   console.log("Server started on port 3000");
// });

//jshint esversion:6


