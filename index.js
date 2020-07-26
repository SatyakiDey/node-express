const express = require('express');
const http = require('http');
const morgan = require('morgan'); //express-middleware or third party integration or plug-in 
//const bodyParser = require('body-parser');//body parser middleware
const dishRouter = require('./routes/dishRouter');//file based module importing
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const hostname='localhost';
const port=3000;
const app=express(); //Creates an Express application.

//"app.use" is used to use any middleware
app.use(morgan('dev')); //Concise output coloured by response status for development use. 
//app.use(bodyParser.json());//parsing the incoming request into a JSON object and the data is available in "req.body" or the body of the request.
app.use('/dishes',dishRouter);//"mounting" the router. When the incoming request URI contains the '/dishes' or '/dish/:any_Paramter', the 'dishRouter' module is mounted

app.use('/promotions',promoRouter);

app.use('/leaders',leaderRouter);


app.use(express.static(__dirname+'/public')); //looks for static webpages inside the "public" folder in the root directory of this project.

//this part should be at the last, otherwise all requested resource will be redirected to this part and only this part will executed instead.
app.use((req, res, next) => { //deals with incoming requests and sends reponse to the appropriate requests.
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>This is an express server</h1></body></html>');
});

const server= http.createServer(app); //creating server using express framework
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})