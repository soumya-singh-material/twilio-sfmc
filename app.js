'use strict';
// Module Dependencies
// -------------------
console.log('=== App Starting ===');
var express     = require('express');
var bodyParser  = require('body-parser');
var errorhandler = require('errorhandler');
var http        = require('http');
var path        = require('path');
var request     = require('request');
var routes      = require('./routes');
var activity    = require('./routes/activity');

console.log('All modules loaded successfully');

var app = express();

console.log('Express app created');

// Configure Express
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json({type: 'application/json'})); 
//app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.methodOverride());
//app.use(express.favicon());

app.use(express.static(path.join(__dirname, 'public')));

// Express in Development Mode
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

// ADD THESE NEW ROUTES HERE
app.get('/health', function(req, res) {
    console.log('=== HEALTH CHECK ACCESSED ===');
    console.log('Time:', new Date().toISOString());
    
    res.json({
        status: 'OK',
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

app.get('/test', function(req, res) {
    console.log('🚀 TEST ROUTE ACCESSED!');
    
    res.json({
        message: 'Test successful - check Vercel logs!',
        timestamp: new Date().toISOString()
    });
});

// HubExchange Routes
app.get('/', routes.index );
app.post('/login', routes.login );
app.post('/logout', routes.logout );

// Custom Hello World Activity Routes
app.post('/journeybuilder/save/', activity.save );
app.post('/journeybuilder/validate/', activity.validate );
app.post('/journeybuilder/publish/', activity.publish );
app.post('/journeybuilder/execute/', activity.execute );

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
