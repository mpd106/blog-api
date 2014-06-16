/* global require, exports */

var postCache = require('tests/helpers/dummy_post_cache');
var postService = require('post_service')(postCache);

exports.get_post_valid_id_should_return_valid_post = function(test) {
  test.expect(1);
  postService.getPost(1).
    then(function(post) {
      test.equal(post.id, 1);
      test.done();
    });
};

exports.get_posts_should_return_list_of_posts = function(test) {
  test.expect(1);
  postService.getPosts().
    then(function(posts) {
      test.equal(posts.length, 2);
      test.done();
    });
};