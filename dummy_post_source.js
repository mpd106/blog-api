exports.getPosts = function(callback) {
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

  callback(posts);
};