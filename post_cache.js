/* global require, module */

module.exports = function(postSource) {
  var _cached;
  
  var getPosts = function() {
    checkCachedPosts();
    
    return _cached.
      then(indexedPostsToArray);
  };
  
  var getPost = function(id) {
    checkCachedPosts();
    
    return _cached.
      then(function(indexedPosts) {
        var post = indexedPosts[id];
        
        if (!post) {
          throw new Error("A post with that id does not exist.");
        }
        
        return post;
      });
  };
  
  var checkCachedPosts = function() {
    if (!_cached) {
      _cached = postSource.getPosts().
        then(indexPosts);
    }
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
  
  var indexedPostsToArray = function(indexedPosts) {
    return Object.keys(indexedPosts).map(function(key) {
      return indexedPosts[key];
    });
  };
  
  return {
    getPosts : getPosts,
    getPost : getPost
  };
};