const express = require('express');
const app = express();
const port = 8000;

//use express router
app.use('/',require('./routes/index'));

//set up the view engine
app.set('view engine','ejs');
app.use('views','./views');

app.listen(port, function(err){
    if(err){
        console.log(`error is running the server ${err}`);
    }
    console.log(`server is up and running on port : ${port}`);
});