const bodyParser = require('body-parser');
const express    = require('express');
const path       = require('path');
const app        = express();
const server     = require('http').Server(app);
const io         = require('socket.io')(server);
const Router     = require('./app/router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const publicPath = path.join(__dirname,'views');
app.use(express.static(publicPath));


/** enviar pagina **/
app.get('/index', function(req, res, next){
    res.sendFile('landing.html',{ root: __dirname +'/views'});
});





app.use('',Router);

app.engine('html', require('ejs').renderFile);
app.set('view engine','html');




require('./app/sockets')(io);

server.listen(3000, function(){
    console.log('Servidor corriendo en el puerto 3000');
});