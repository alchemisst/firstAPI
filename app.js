const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

//Using BodyParser
app.use(bodyParser.urlencoded({ extended: true }));

//DB connect
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

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
app
  .route("/articles")
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
    console.log(req.body.title);
    console.log(req.body.content);
    article.save().catch(function (err) {
      console.log(err);
    });
  })
  .delete("/articles", function (req, res) {
    Article.deleteMany().catch(function (err) {
      console.log(err);
    });
  });

app.listen(3000, function () {
  console.log("Server Started");
});
