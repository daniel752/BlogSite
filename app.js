const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db_ops = require(`${__dirname}/db_ops.js`);
require("dotenv").config();

const url = process.env.DB_URL;
mongoose.connect(url, { useNewUrlParser: true });
const Schema = mongoose.Schema;

const postSchema = new Schema({
  post_title: { type: String, required: true },
  post_body: { type: String, required: true },
});

const Post = mongoose.model("Post", postSchema);

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.redirect("/home");
});

app.get("/home", async function (req, res) {
  const postList = await db_ops.getPostsFromDB(Post);
  // console.log(postList);
  res.render("home", {
    content: homeStartingContent,
    postList: postList,
  });
});

app.get("/posts/:postId", async function (req, res) {
  const requestedPost = await db_ops.getPostFromDB(req, Post);
  console.log(requestedPost.post_title);
  res.render("post", {
    title: requestedPost.post_title,
    postBody: requestedPost.post_body,
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  db_ops.addPostToDB(req, res, Post);
  res.redirect("/home");
  // const post = {
  //   title: req.body.title,
  //   postBody: req.body.postBody,
  // };

  // compose.newPost(post);
});

app.get("/about", function (req, res) {
  res.render("about", {
    content: aboutContent,
  });
});

app.get("/contact", function (req, res) {
  res.render("contact", {
    content: contactContent,
  });
});

const port = 8000;

app.listen(process.env.port || port, function () {
  console.log(`Server started on port ${process.env.PORT || port}`);
});
