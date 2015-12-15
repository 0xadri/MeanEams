var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path){
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine','jade');
app.use(logger('dev'));
app.use(bodyParser());
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));
app.use(express.static(__dirname + '/public'));

if(env === 'development'){
    mongoose.connect('mongodb://localhost/multivision');
} else {
    mongoose.connect('mongodb://adrien:test@ds053954.mongolab.com:53954/multivision');
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback(){
    console.log('multivision db opened');
});
var messageSchema = mongoose.Schema({ message: String });
var Message = mongoose.model('message', messageSchema);
var mongoMessage = '';
Message.findOne().exec(function(err, messageDoc){
    mongoMessage = messageDoc.message;
    console.log('messageDoc is : ' + messageDoc);
    console.log('mongoMessage is : ' + mongoMessage);
});

app.get('/partials/:partialPath', function(req, res){
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res){
    console.log('mongoMessage here is : ' + mongoMessage);
    res.render('index', { mongoMessage : mongoMessage });
});

var port = process.env.PORT || 3030;
app.listen(port);

console.log('Listen to port ' + port + '...');