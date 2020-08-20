window.onload = inicializar;

var formAutenticacion;

function inicializar() {
    formAutenticacion = document.getElementById("form-autenticacion");
    formAutenticacion.addEventListener("submit", autentificar, false)
}

function autentificar(event){
    event.preventDefault();
    var usuario = event.target.email.value;
    var contrasena = event.target.password.value;

    firebase.auth().signInWithEmailAndPassword(usuario, contrasena)
        .then(function(result){
            window.location.href = "tienda.html";
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert('No se ha podido ingresar. El error es: '+ errorMessage);
            // ...
      });
}

function registrar() {

    var email = document.getElementById("emailR").value;
    var password = document.getElementById("passwordR").value;
    alert('el mail es: ' + email + ' y la pass: ' + password);
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(){
            alert('El usuario se creo exitosamente!')
            $('#regModal').modal('hide');
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert('Hubo un error al crear usuario. Error: ' + errorMessage)
            // ...
      });
}