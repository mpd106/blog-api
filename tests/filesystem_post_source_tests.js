/* global require, exports */

var path = './tests/posts';
var postSource = require('filesystem_post_source')(path);

exports.should_load_three_messages = function(test) {
  test.expect(1);
  postSource.getPosts(null, function(posts) {
    test.equal(posts.length, 3);
    test.done();
  });
};