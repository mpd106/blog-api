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

var getPosts = function() {
  return fs_readdir(postsPath).
    then(getFileBodies).
    then(parseFileBodies).
    then(rejectDuplicates);
};

var getFileBodies = function(fileNames) {
  var fileBodiesPromises = fileNames.map(function(fileName) {
    return fs_readfile(path.join(postsPath, fileName), 'utf8');
  });

  return fileBodiesPromises;
};

var parseFileBodies = function(fileBodies) {
  var parsedBodiesPromises = Q.all(fileBodies).
  then(function(messages) {
    return messages.map(JSON.parse);
  });
  
  return parsedBodiesPromises;
};

var rejectDuplicates = function(parsedBodies) {
  var ids = parsedBodies.map(function(body) { return body.id; });
  if (detectDuplicates(ids)) {
    throw new Error("There are multiple posts with the same id.");
  }
  
  return parsedBodies;
};

var detectDuplicates = function(arr) {
  arr.sort();
  for (var index = 0; index < arr.length - 1; index++) {
    var current = arr[index];
    var next = arr[index + 1];
    if (current === next) {
      return true;
    }
  }
  
  return false;
};