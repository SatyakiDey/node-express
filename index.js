const express = require('express');
const http = require('http');
const morgan = require('morgan'); //express-middleware or third party integration or plug-in 
const bodyParser = require('body-parser');//body parser middleware

const hostname='localhost';
const port=3000;
const app=express(); //Creates an Express application.

//"app.use" is used to use any middleware
app.use(morgan('dev')); //Concise output coloured by response status for development use. 
app.use(bodyParser.json());//parsing the incoming request into a JSON object and the data is available in "req.body" or the body of the request.

app.all('/dishes',(req,res,next) =>{ //this snippet means that this code will be executed first for any incoming request with any method
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next(); //Using next(), the modified "res" object with statusCode and Header will be propagated to all the methods which will operate on the same resource(which in this case is '/dishes')
})

app.get('/dishes',(req,res,next) =>{ //"res" already has statusCode 200 and previously set header
    res.end("Will send all the dishes to you!");
});

app.post('/dishes',(req,res,next) => {
    //"name" and "description" of the req.body is avaliable because the "body-parser" middleware has been used to already parse the request into a JSON object which conatins the key "name" and "description" and their corresponding values. This can be set using POSTMAN.
    res.end('Will add the dish: '+ req.body.name +' with details: '+ req.body.description);
});

app.put('/dishes',(req,res,next) => {
    res.statusCode=403;
    res.end('Put operation not supported on dishes');
});

app.delete('/dishes',(req,res,next) =>{
    res.end("Deleting all the dishes!");
});


app.get('/dishes/:dishId',(req,res,next) =>{
    res.end("Will send details of the dish: "+
    req.params.dishId+' to you!');
});

app.post('/dishes/:dishId',(req,res,next) => {
    res.statusCode=403;
    res.end('Post operation not supported on /dishes/'+ req.params.dishId);
});

app.put('/dishes/:dishId',(req,res,next) => {
    res.write('Updating the dish: '+req.params.dishId+'\n');
    res.end('Will update the dish: '+ req.body.name + ' with details '+ req.body.description);
});

app.delete('/dishes/:dishId',(req,res,next) =>{
    res.end("Deleting dish: "+req.params.dishId);
});

app.use(express.static(__dirname+'/public')); //looks for static webpages inside the "public" folder in the root directory of this project.

//this part should be at the last, otherwise all requested resource will be redirected to this part and only this part will executed instead.
app.use((req, res, next) => { //deals with incoming requests and sends reponse to the appropriate requests.
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>This is an express server</h1></body></html>');
});

const server= http.createServer(app); //creating server usinf express framework
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})