/* global require, module, console */

var fs = require('fs');
var path = require('path');
var Q = require('q');
var fs_readdir = Q.denodeify(fs.readdir);
var fs_readfile = Q.denodeify(fs.readFile);

var postsPath;

module.exports = function(path) {
  postsPath = path;
  
  return {
    getPosts : getPosts
  };
};

var getPosts = function(err, callback) {
  return fs_readdir(postsPath).
    then(getFileBodies).
    done(callback, err);
};

var getFileBodies = function(fileNames) {
  var promises = fileNames.map(function(fileName) {
    return fs_readfile(path.join(postsPath, fileName), 'utf8');
  });

  var result = Q.all(promises).
    then(function(messages) {
      return messages.map(JSON.parse);
    });

  return result;
};