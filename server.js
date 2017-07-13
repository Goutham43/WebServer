var express = require('express');
var request = require("request");

var app = express();
app.set('port', (process.env.PORT || 5000));

var allowCORS = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    (req.method === 'OPTIONS') ?
        res.send(200) :
        next();
};

// ? ??? app.use(router) ?? ????? ??
app.use(allowCORS);

app.get('/', function(req, res){

    var result = "";

    var url = req.query.url;

    if(url == null || url == undefined)
        res.end("");
    else {
        console.log("Read From " + url);
        request(url, function (error, response, body) {
            console.log("Loaded.")
        }).pipe(res);
    }
});

app.listen(app.get('port'), function() {
	console.log('App running on port', app.get('port'));
});	