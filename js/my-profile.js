/* Definicion de  constantes para formulario */
const userName = document.getElementById("userName");
const userSurname = document.getElementById("userSurname");
const userAge = document.getElementById("userAge");
const userEmail = document.getElementById("userEmail");
const userPhone = document.getElementById("userPhone");
const userAvatar = document.getElementById("fotito");





/* Guarda los datos ingresados en el formulario */
function saveUserData() {
    // Se crea un objeto 
    let userDataObj = {
        name: userName.value,
        surname: userSurname.value,
        age: userAge.value,
        email: userEmail.value,
        phone: userPhone.value,
        image: userAvatar.src,
    };

//Se convierte objeto javascript en JSON
let userDataJSON = JSON.stringify(userDataObj);

//Se guarda en LocalStorage los valores de los inputs.

localStorage.setItem("userData", userDataJSON);

}

/* Mostrar datos gardados en LocalStorage */

function showUserData() {

    //Se convierte JSON en objeto JavaScript para poder manipular los datos
    let userDataParse = JSON.parse(localStorage.getItem("userData"));

    //Se muestran los valores de los input en HTML 
    document.getElementById("htmlUserName").innerHTML += userDataParse.name
    document.getElementById("htmlUserSurname").innerHTML += userDataParse.surname
    document.getElementById("htmlUserAge").innerHTML += userDataParse.age
    document.getElementById("htmlUserEmail").innerHTML += userDataParse.email
    document.getElementById("htmlUserPhone").innerHTML += userDataParse.phone
    document.getElementById("fotito").src = userDataParse.image;
    //agregué esta línea con id diferente para miniatura nav
   // document.getElementById("miniatura").src = userDataParse.image;//

    
}

function saveAndShowUserData(){
    saveUserData();
    showUserData();
    window.location.reload()
}


document.addEventListener("DOMContentLoaded", function(e){
    
    document.getElementById("fotito").src = "img/perfil.jpg"; //imagen de perfil grande

    showUserData();
});

/*fin formulario modal*/




/*funcion que convirte imagen en  base64*/

function previewFile() {
    let preview = document.getElementById('fotito');
    let file    = document.querySelector('input[type=file]').files[0];
    let reader  = new FileReader();
  
    reader.onloadend = function () {
      preview.src = reader.result; 
      console.log(reader.result);
    }
  
    if (file) {
      reader.readAsDataURL(file);
     
    } else {
      preview.src = "img/perfil.jpg";
    }
  }