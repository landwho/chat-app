var app = angular.module('myApp', ['ngRoute','ui.bootstrap','angularModalService']);

app.config(function($routeProvider) {
  $routeProvider
  .when("/",  {
    templateUrl: 'index.html',
    controller: 'chatController'
  })

  .when("/index", {
    templateUrl : "landing.html",
    controller: 'chatController'
  });
});





app.controller('chatController', function($scope, $rootScope,$uibModal,ModalService) {


const socket = io();

  //DOM elements
  $scope.message;
  $scope.username;
  $scope.btn;
  $scope.output;
  $scope.actions;
  //DOM elements

let output   = document.getElementById('output');
let enlinea  = document.getElementById('enlinea');
let scrol    = document.getElementById('scrol');


$scope.btnflag      =true;
$scope.usernameflag =false;
$scope.btnuser      =false;

$rootScope.username = localStorage.username;
$rootScope.gender   = localStorage.genero;
$scope.usernav      = $rootScope.username.substr(0,20);

console.log($rootScope.username)
console.log($rootScope.gender)


//no send message if inputText is empty
$scope.keyword= function(){
    if($scope.message!=""){ 
        socket.emit('chat:message', {
            username: $scope.username,
            message: $scope.message,
            genero: $rootScope.gender
        });
    }
    $scope.message="";
    $scope.usernameflag=true;
    $scope.btnflag=true;
}


$scope.enviarMessage = function(event){
    if($scope.message!=""){ 
        socket.emit('chat:message', {
          username: $scope.username,
          message: $scope.message,
          genero: $rootScope.gender
        });
    }
    $scope.message="";
    $scope.usernameflag=true;
    $scope.btnflag=true;
}; 

$scope.typing = function(){
    $scope.btnflag=false;
    socket.emit('chat:typing', $scope.username);
}

//pintar menssage 
socket.on('chat:message', function(message){

    if(message.genero == 'Male'){ 
      output.innerHTML +=`<p id="scrol"><strong class="user-text-color h">${message.username}:</strong> ${message.message}</p>`;
    }
      
    if(message.genero == 'Female'){
      output.innerHTML +=`<p><strong class="user-text-color m">${message.username}:</strong> ${message.message}</p>`;
    }

    if(message.genero == 'Unknow'){
      output.innerHTML +=`<p><strong class="user-text-color xx">${message.username}:</strong> ${message.message}</p>`;
    }

});







$scope.roomModal = function() {
    ModalService.showModal({
     templateUrl: "roomslist.modal.html",
      controller: "ContrladorModal"
    }).then(function(modal) {
      modal.close.then(function(result) {
        $scope.resultadoModal = result;
      });
    });
  };



  //modal de usuarios
  $scope.userlist = function() {
    ModalService.showModal({
     templateUrl: "userlist.modal.html",
      controller: "ContrladorModal"
    }).then(function(modal) {


        socket.on('openModalUsers',function(data){
            console.log(data)
            console.log(data.users)
            $('#modalusers').html('');
            for(var i = 0; i < data.users.length; i++){
                html = '';
                html += '<div class="user">';
                html += '<i class="fa fa-circle online-icon"></i>';
                html += data.users[i];
                html += '</div>';
                $('#modalusers').append(html);
            }
        });



      modal.close.then(function(result) {

        
        socket.on('openModalUsers',function(data){
            console.log(data)
            console.log(data.users)
            $('#modalusers').html('');
            for(var i = 0; i < data.users.length; i++){
                html = '';
                html += '<div class="user">';
                html += '<i class="fa fa-circle online-icon"></i>';
                html += data.users[i];
                html += '</div>';
                $('#modalusers').append(html);
            }
        });




      });
    });
  };









});


app.controller('ContrladorModal', function($scope, $rootScope ,close) {
    const socket = io();
  $scope.cerrarModal = function() {
    close($scope.result);
  };


  

    socket.on('openModalUsers',function(data){
        console.log(data)
        console.log(data.users)
        $('#modalusers').html('');
        for(var i = 0; i < data.users.length; i++){
            html = '';
            html += '<div class="user">';
            html += '<i class="fa fa-circle online-icon"></i>';
            html += data.users[i];
            html += '</div>';
            $('#modalusers').append(html);
        }
    });
    
  


  $scope.rooms = [
    {"id":"0", "roomname":"Amigos"},
    {"id":"1", "roomname":"Amor"},
    {"id":"25", "roomname":"Biblioteca"},
    {"id":"25", "roomname":"Café Bar"},
    {"id":"26", "roomname":"Chistes"},
    {"id":"23", "roomname":"Solo Jovenes"},
    {"id":"24", "roomname":"Mas de 30"},
    {"id":"27", "roomname":"Mas de 40"},
    {"id":"25", "roomname":"Mas de 50"},
    {"id":"29", "roomname":"Profesionales"},
    {"id":"29", "roomname":"Religión"},
    {"id":"30", "roomname":"Solo Infieles"},
    {"id":"2", "roomname":"Argentina"},
    {"id":"3", "roomname":"Bolivia"},
    {"id":"4", "roomname":"Brasil"},
    {"id":"5", "roomname":"Canadá"},
    {"id":"6", "roomname":"Chile"},
    {"id":"7", "roomname":"Colombia"},
    {"id":"8", "roomname":"Costa Rica"},
    {"id":"9",  "roomname":"Cuba"},
    {"id":"10", "roomname":"Dominica"},
    {"id":"11", "roomname":"Ecuador"},
    {"id":"12", "roomname":"El Salvador"},
    {"id":"12", "roomname":"España"},
    {"id":"13", "roomname":"Estados Unidos"},
    {"id":"14", "roomname":"Guatemala"},
    {"id":"15", "roomname":"Honduras"},
    {"id":"16", "roomname":"México"},
    {"id":"17", "roomname":"Nicaragua"},
    {"id":"18", "roomname":"Panamá"},
    {"id":"19", "roomname":"Paraguay"},
    {"id":"20", "roomname":"Perú"},
    {"id":"21", "roomname":"Uruguay"},
    {"id":"22", "roomname":"Venezuela"}
   
];



});



app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});






