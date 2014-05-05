/*global process, require, __dirname, console*/
// API doc of expressjs app.use(): http://expressjs.com/api.html#app.use

var express = require('express'),
    open = require('open'),
    app = express(),
    port = process.env.PORT || 8899,
    urlPath = '/',
    url = 'http://localhost:' + port + urlPath, // + "/latest";
    year = 60 * 60 * 24 * 365 * 1000;

// Use compress middleware to gzip content
app.use(express.compress());

//set default mime type to xml for ".library" files
express.static.mime.default_type = "text/xml";

// Serve up content directory showing hidden (leading dot) files
app.use(urlPath, express.static(__dirname + '/..', {
    maxAge: year,
    hidden: true
}));
// enable directory listening
app.use(urlPath, express.directory(__dirname + '/..'));

app.listen(port);

//open in default browser
open(url);
console.log("Static file server running at\n  => " + url + " \nCTRL + C to shutdown");
