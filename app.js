/* globals require, process */

var express = require('express');
var post_service = require('post_service');

var app = express();

app.get('/', function(req, res) {
	res.type('text/plain');
	res.send('mpd106 api');
});

app.get('/posts', function(req, res) {
  post_service.getPosts(function(posts) {
    res.json(posts);
  });
});

app.get('/posts/:id', function(req, res) {
  post_service.getPost(req.params.id, function(post) {
    res.json(post);
  });
});

app.listen(process.env.PORT || 4730);