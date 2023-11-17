const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

//Using BodyParser
app.use(bodyParser.urlencoded({ extended: true }));

//DB connect
mongoose.connect("mongodb://localhost:27017/wikiDB");

//Setting View Engine to EJS and views folder
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");


//Setting Static Files Path
app.use(express.static(__dirname + "/public"));


//Defining Schema and Model
const articleSchema = {
  title: String,
  content: String,
};
const Article = mongoose.model("Article", articleSchema);


//Article Route
app.route('/articles')
  .get(function (req, res) {
    Article.find({}).then(function (result) {
      res.send(result);
    });
  })
  .post(function (req, res) {
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
    });
   
    article.save().then(function () {
        res.status(201).send("Article saved successfully");
      }).catch(function (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      });
  })
  .delete(function (req, res) {
    Article.deleteMany().then(function () {
        res.status(200).send("Articles deleted successfully");
      }).catch(function (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      });
  })


// Get Specific Article route
app.route('/articles/:name')
  .get(function(req,res){
    const getArticle = req.params.name
    console.log(req.params.name)
    Article.findOne({'title':getArticle}).then(function(result){
        if(result){
        res.send(result.content)
        }else{
            res.send("Article not Found")
        }
    })

  })
  .put(function(req,res){
    const getArticle = req.params.name
    Article.updateOne({'title':getArticle},
    {'title':req.body.title,'content':req.body.content},{overwrite:true}).then(
        res.send("Updated Successfully")
    )
  })
  .patch(function(req,res){
    const getArticle = req.params.name
    Article.updateOne({'title':getArticle},{$set:req.body}).then(function(){
        res.send('Pathced successfully')
    })
  })
  .delete(function(req,res){
    const getArticle = req.params.name
    Article.deleteOne({"title":getArticle}).then(
        res.send("Deleted Successfully")
    )
  })

app.listen(3000, function () {
  console.log("Server Started");
});
