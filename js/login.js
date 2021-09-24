function verificar(){
    let nombre = document.getElementById("usuario");
    let email = document.getElementById("email");
    let usuario = {};
    if (nombre.value.trim()===""|| email.value.trim()===""){ 
    alert("Completa los campos porfavor");
}else {
    usuario.nombre = nombre.value;
    usuario.email = email.value;
    usuario.estado = "conectado";
    location.href="index.html";
    localStorage.setItem("usuario",JSON.stringify(usuario));
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
}
}








function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    
    let usuario = {};
    usuario.nombre = profile.getName();
    usuario.email = profile.getEmail();
    usuario.estado = "conectado";
    location.href="index.html";
    localStorage.setItem("usuario",JSON.stringify(usuario));


  }
  function onLoad(){
      gapi.load("auth2",function(){
          gapi.auth2.init();
      });
  }

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){


});

