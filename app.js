/* globals require, process */

var express = require('express');
var postSource = require('filesystem_post_source')('./posts');
var postCache = require('post_cache')(postSource);
var postService = require('post_service')(postCache);

var app = express();

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', function(req, res) {
	res.type('text/plain');
	res.send('mpd106 api');
});

app.get('/posts', function(req, res) {
  postService.getPosts().
    then(function(posts) {
      res.json(posts);
    });
});

app.get('/posts/:id', function(req, res) {
  postService.getPost(req.params.id).
    then(function(post) {
      res.json(post);
    });
});

app.listen(process.env.PORT || 4730);