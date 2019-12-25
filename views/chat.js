$(document).ready(function(){
    var socket = io('http://localhost:3000');
    username(socket);
    updateUsers(socket);
    openUsersModal(socket);
});

function username(socket){
    socket.emit('username',{
        username:   localStorage.username,
        genero:     localStorage.genero
    });
}

function updateUsers(socket){
    socket.on('updateUsers',function(data){
        console.log(data)
        console.log(localStorage.genero);
        $('#users').html('');
        for(var i = 0; i < data.users.length; i++){
            html = '';
            html += '<div class="user">';
            html += '<i class="fa fa-circle online-icon"></i> '; 
            html += data.users[i];
            html += '</div>';
            $('#users').append(html);
        }
    });
}




function openUsersModal(socket){

    socket.on('openModalUsers',function(data){
        console.log(data)
        $('#modalusers').html('');
        for(var i = 0; i < data.users.length; i++){
            html = '';
            html += '<div class="user">';
                html += '<i class="fa fa-user online-icon"></i> ';
            html += data.users[i];
            html += '</div>';
            $('#modalusers').append(html);
        }
    });


}

