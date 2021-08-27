function desconectar(){
    localStorage.clear();
    location.href="login.html";
    signOut();
}
function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log("User signed out.");
	});
}

function onLoad() {
	gapi.load("auth2", function () {
		gapi.auth2.init();
	});
}


document.addEventListener("DOMContentLoaded", function(e){

	let usuario = JSON.parse(localStorage.getItem("usuario"));
	if(usuario !== null){
	document.getElementById("usuario").innerHTML="Hola" +" "+ usuario.nombre + "!";
	}else{
		location.href="login.html";
	}

  
  });


