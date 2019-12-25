var users = require('./users');

module.exports = function(io){
   
    io.on('connection',function(socket){
        
        console.log('Nuevo Usuario Conectado');
        addUser(socket);
        updateUsers(socket);
        sendNewMessage(socket);
        disconnectUser(socket);
    
        function sendNewMessage (socket) {
            socket.on('chat:message',(message)=>{
                console.log('--data--');
                console.log(message);
                console.log('--------');
                io.sockets.emit('chat:message', message);
            });
        };
    

        function disconnectUser(socket){
            socket.on('disconnect',function(){
                if(socket.username){
                    users.splice(users.indexOf(socket.username),1);
                }
                updateUsers(socket);
            });
        }




    });
}


function addUser(socket){
    socket.on('username',function(data){
        socket.username = data.username;
        users.push(data.username);
        updateUsers(socket);
    });
}

function updateUsers(socket){
    socket.emit('updateUsers',{users});
    socket.broadcast.emit('updateUsers',{users});
}






