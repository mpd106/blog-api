/* global require, exports */

var Q = require('q');
var postSource = require('tests/helpers/dummy_post_source');
var postCache;

exports.get_posts = {
  setUp : function(callback) {
    postCache = require('post_cache')(postSource);
    callback();
  },
  
  tearDown : function(callback) {
    postSource.reset();
    callback();
  },
  
  should_get_posts : function(test) {
    test.expect(1);
    postCache.getPosts().
      then(function(posts) {
        test.equal(posts.length, 2);
        test.done();
      });
  },
  
  should_only_hit_source_once : function(test) {
    test.expect(1);
    postCache.getPosts().
      then(function() {
        postCache.getPosts().
          then(function(posts) {
            test.equals(postSource.getPostsCallCount(), 1);
            test.done();
          });
      });
  }
};

exports.get_post = {
  should_get_post : function(test) {
    test.expect(1);
    postCache.getPost(1).
      then(function(post) {
        test.equals(post.id, '1');
        test.done();
      });
  },
  
  should_throw_on_invalid_id : function(test) {
    test.expect(1);
    postCache.getPost(5).
      fail(function(err) {
        test.equals(err, "Error: A post with that id does not exist.");
        test.done();
      });
  }
};











