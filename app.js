const bodyParser = require('body-parser')
const express = require('express')
const mongoose  = require('mongoose')

const app = express()


//Using BodyParser
app.use(bodyParser.urlencoded({ extended: false }));


//DB connect
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");


//Setting View Engine to EJS and views folder
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");


//Setting Static Files Path
app.use(express.static(__dirname + "/public"));


//Defining Schema and Model
const articleSchema = {
    title:String,
    content:String
}
const Article = mongoose.model("Article",articleSchema)



app.get("/",function(req,res){
    res.send("Hello")
})








app.listen(3000,function(){
    console.log('Server Started')
})