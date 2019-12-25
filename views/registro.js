window.onload = function(){
    document.querySelector('#send-form')
            .addEventListener('click',function(ev){
                localStorage.username = document.querySelector('#username').value;
                localStorage.genero   = document.querySelector('input[name=sex]:checked').value;
                let warning = document.getElementById('warning');
                warning.innerHTML ='<strong> EL Usuario ya esta en Uso </strong>'
            });

}