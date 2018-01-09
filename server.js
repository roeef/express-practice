var express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.listen(8000);
app.use(express.static('public'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get('/names/:name', function(request, response){
    response.send(`Hello, ${request.params.name}`);
});

function findBooksOnDatabase(genretosearch, authortosearch, f) {
    f(0,`gen-${genretosearch} | auht ${authortosearch}` )
}

app.get('/books', function(request, response) {
    var genretosearch = request.query.genre;
    var authortosearch = request.query.author;
    //let's pretend we have a function that queries our database and returns what it finds
    findBooksOnDatabase(genretosearch, authortosearch, function(err, results) {
        response.send(results);
    });
});

function createNewBook(body, f) {
    f(false, body);
}

app.post('/post', function(req, res) {
    console.log("somthing");
    console.log(req.body); //the data on a new book
    // let's pretend we have a function to create a new book
    createNewBook(req.body, function(error, result){
        if (error) throw error;
        res.send(result);
    });
});

app.get('/person', function(request, response){
    let query = request.query;
    response.send(`Hello ${query.firstName} ${query.lastName}`);
});

app.get('/person', function(request, response){
    response.send({ name: 'John', age: 30 });
});

app.get('/anotherRoute', function(request, response){
    response.send("Hey, I'm another route!");
});

app.get('/me', function(request, response){
    response.send({ name: 'Roee', age: 28, favorite_food:'stir fried chicken' , birthday_wish:'a week trek with my wife and son'});
});