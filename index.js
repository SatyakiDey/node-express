const express = require('express');
const http = require('http');
const morgan = require('morgan'); //express-middleware or third party integration or plug-in 
const bodyParser = require('body-parser');//body parser middleware
const dishRouter = require('./routes/dishRouter');//file based module importing

const hostname='localhost';
const port=3000;
const app=express(); //Creates an Express application.

//"app.use" is used to use any middleware
app.use(morgan('dev')); //Concise output coloured by response status for development use. 
app.use(bodyParser.json());//parsing the incoming request into a JSON object and the data is available in "req.body" or the body of the request.
app.use('/dishes',dishRouter);//"mounting" the router.


/*app.get('/dishes/:dishId',(req,res,next) =>{
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
});*/

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