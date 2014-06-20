/* global require, module */

module.exports = function(cachedPostSource) {
  var getPosts = function() {
    return cachedPostSource.getPosts();
  };
  
  var getPost = function(id) {
    return cachedPostSource.getPost(id);
  };
  
  return {
    getPosts : getPosts,
    getPost : getPost
  };
};