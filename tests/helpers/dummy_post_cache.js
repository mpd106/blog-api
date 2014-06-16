/* global require, exports */

var Q = require('q');

var posts = [
  {
    id: "1",
    title: "Third post",
    author: { name: "Matt" },
    date: new Date("06-02-2014"),
    excerpt: "This article is about...",
    body: "### Welcome\n This article is about awesome Matt's awesome hair."
  },
  {
    id: "2",
    title: "Second post",
    author: { name: "Matt" },
    date: new Date("06-01-2014"),
    excerpt: "This article is about...",
    body: "### Welcome\n This article is about awesome Matt's awesome beard."
  }
];

exports.getPosts = function() {
  var deferred = Q.defer();
  deferred.resolve(posts);
  return deferred.promise;
};

exports.getPost = function(id) {
  var deferred = Q.defer();
  deferred.resolve(posts[id - 1]);
  return deferred.promise;
};