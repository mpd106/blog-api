/* global require, exports */

var postSource = require('filesystem_post_source')('./tests/posts');

var _indexedPosts;

exports.getPosts = function(callback) {
  initializePosts(function(indexedPosts) {
    var posts = getPostsArray(indexedPosts);
    callback(posts);
  });
};

exports.getPost = function(id, callback) {
  initializePosts(function(indexedPosts) {
    var post = indexedPosts[id];
    callback(post);
  });
};

var initializePosts = function(callback) {
  //if (_indexedPosts) {
  //  callback(_indexedPosts);
  //  return;
  //}
  
  postSource.getPosts().
    then(function(posts) {
      _indexedPosts = indexPosts(posts);
      callback(_indexedPosts);
    });
};

var indexPosts = function(posts) {
  var index,
      post,
      id,
      indexed = {};
  for (index = 0; index < posts.length; index++) {
    post = posts[index];
    id = post.id;
    indexed[id] = post;
  }

  return indexed;
};

var getPostsArray = function(indexedPosts) {
  return Object.keys(indexedPosts).map(function(key) {
    return indexedPosts[key];
  });
};