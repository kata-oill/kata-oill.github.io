'use strict';

var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand&_=";

// Get a quote function

function getQuote() {
    fetch(quoteUrl + Date.now(), { cache: "no-store" })
        .then(function(resp) {
            return resp.json();
        })
        .then(createTweet);
}

// Create Tweet function

function createTweet(input) {
    var data = input[0];

    var dataElement = document.createElement('div');
    dataElement.innerHTML = data.content.rendered;
    var quoteText = dataElement.innerText.trim();
    var quoteAuthor = data.title.rendered;

    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }

    var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

    if (tweetText.length > 140) {
    	getQuote();
	} else {
	    var tweet = tweetLink + encodeURIComponent(tweetText);
	    document.querySelector('.quote').innerText = quoteText;
	    document.querySelector('.author').innerText = "Author: " + quoteAuthor;
	    document.querySelector('.tweet').setAttribute('href', tweet);
	}
}

document.addEventListener('DOMContentLoaded', function() {
    getQuote();
    document.querySelector('.trigger').addEventListener('click', function() {
        getQuote();
    });
});

