// List to hold all composes title and post body
const postList = [];

// Export 'composeList' to other files
exports.postList = postList;

// Function to add new post to 'postList'
exports.newPost = function (post) 
{
    postList.push(post);
}
