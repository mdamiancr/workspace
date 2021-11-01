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
	document.getElementById("usuario").innerHTML="Hola" +" "+ usuario.nombre + `<img src="" alt="" class="miniatura">`;
	}else{
		location.href="login.html";
	}

	let userData = JSON.parse(localStorage.getItem("userData"));
	let image = document.querySelector(".miniatura");
	if(userData !== null){
		image.src = userData.image;
	}else{
		image.src = "img/perfil.jpg";
	}
  
  });

  
