/* global require, exports */

var path = './tests/posts';
var postSource = require('filesystem_post_source')(path);

exports.should_load_multiple_messages = function(test) {
  test.expect(1);
  var postsPromise = postSource.getPosts();
  postsPromise.done(function(posts) {
    test.equal(posts.length, 3);
    test.done();
  });
};

exports.should_decode_all_message_details = function(test) {
  test.expect(6);
  postSource.getPosts().
    then(function(posts) {
      var post = posts[0];
      test.equal(post.id, 1);
      test.equal(post.title, "First post");
      test.equal(post.author.name, "Matt");
      test.equal(post.date, "2014-06-11T08:25:12.623Z");
      test.equal(post.excerpt, "This article is about...");
      test.equal(post.body, "### Welcome\n This article is about awesome Matt's awesome hair.");
      test.done();
    });
};

exports.should_return_empty_array_on_no_messages = function(test) {
  test.expect(1);
  var postSource = require('filesystem_post_source')('./tests/no_posts');
  var postsPromise = postSource.getPosts();
  postsPromise.then(function(posts) {
    test.equal(posts.length, 0);
    test.done();
  });
};

exports.should_throw_on_duplicate_post_ids = function(test) {
  test.expect(1);
  var postSource = require('filesystem_post_source')('./tests/posts_duplicate_ids');
  postSource.getPosts().
    fail(function(err) {
      test.equal(err, "Error: There are multiple posts with the same id.");
      test.done();
    });
};