exports.getPostsFromDB = async function (collection) {
  try {
    return await collection.find();
  } catch (error) {
    console.error("Error while fetching posts:", error);
    throw error;
  }
};

exports.getPostFromDB = async function (req, collection) {
  try {
    console.log(`Trying to find post id: ${req.params.postId}`);
    return await collection.findById(req.params.postId);
  } catch (error) {
    console.error("Error while fetching post:", error);
    throw error;
  }
};

exports.addPostToDB = async function (req, res, collection) {
  try {
    await new collection({
      post_title: req.body.title,
      post_body: req.body.postBody,
    }).save();
  } catch (error) {
    console.error("Error while adding post:", error);
    throw error;
  }
};

exports.deletePostFromDB = async function (req, res, collection) {
  try {
    await collection.deleteOne({ title_name: req.body.title });
  } catch (error) {
    console.error("Error while deleting post:", error);
    throw error;
  }
};

async function checkDuplicates(req, collection) {
  try {
    const posts = await collection.findOne({ post_title: req.body.title });
    console.log(posts);
    if (posts != null) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error while checking duplicates:", error);
    throw error;
  }
}
