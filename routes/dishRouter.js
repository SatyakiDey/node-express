const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router(); //treats as a new express application

dishRouter.use(bodyParser.json());

dishRouter.route('/') //"mounts" the "dishRouter" after the '/' in the statement "app.use('/dishes',dishRouter)" in "index.js" .
.all((req,res,next) => { //this snippet means that this code will be executed first for any incoming request with any method
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next(); //Using next(), the modified "res" object with statusCode and Header will be propagated to all the methods which will operate on the same resource(which in this case is '/dishes')
})
.get((req,res,next) => { //"res" already has statusCode 200 and previously set header
    res.end("Will send all the dishes to you!");
})
.post((req,res,next) => {
    //"name" and "description" of the req.body is avaliable because the "body-parser" middleware has been used to already parse the request into a JSON object which conatins the key "name" and "description" and their corresponding values. This can be set using POSTMAN.
    res.end('Will add the dish: '+ req.body.name +' with details: '+ req.body.description);
})
.put((req,res,next) => {
    res.statusCode=403;
    res.end('Put operation not supported on dishes');
})
.delete((req,res,next) =>{
    res.end("Deleting all the dishes!");
});

module.exports = dishRouter;