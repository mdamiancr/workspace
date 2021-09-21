
var productos = {};

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100" id="flip">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}
// mostrando el nombre, descripción y unidades vendidas 
document.addEventListener("DOMContentLoaded", function () {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldCountHTML = document.getElementById("productSoldCount");


            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productSoldCountHTML.innerHTML = product.soldCount;

            //mostrando las imagenes como galería
            showImagesGallery(product.images);
        }
    });
});

//funcion que muestra comentarios ya cargados
var comentar = [];

function showComment(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {

        let comment = array[i];
        
        htmlContentToAppend += `
         
        <div class = "list-group-item list-group-item-action">
        <div class="row">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h5>`+ comment.user +`</h5>
                    <h5>`+ comment.dateTime+`</h5>
                </div>
                    <h5>`+ comment.description +`</h5>
                    <h5>`+ calificar(comment.score) +`</h5>
                </div>
            </div>
        </div>
        `
    }
         document.getElementById("comments").innerHTML = htmlContentToAppend;
        
}
document.addEventListener("DOMContentLoaded", function() {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            comentar = resultObj.data;

            showComment(comentar);
        }
    })
})

//funcion publicar comentario propio
function enviarComentario(){
    let comentario = {};
    let usuario = JSON.parse(localStorage.getItem('usuario'))
    let estrella =  document.querySelector("input[name=estrella]:checked").value;
    if (estrella > 0){
        estrella;
    };
    
    comentario.user = usuario.nombre;
    comentario.score = estrella;
    comentario.description = document.getElementById("texto").value;
    comentario.dateTime = new Date();
    if(comentario.description.trim() !==""){
        comentar.push(comentario);
        document.getElementById("texto").value = "";
    }
    showComment(comentar);
};



//funcion calificar con estrellas
function calificar(num){

    let estrella = "";

for (let i = 1; i <= 5; i++) {
    if (i <= num) {
        estrella += `<i class="fas fa-star"></i>`;
    } else {
        estrella += `<i class="far fa-star"></i>`;
    };
}; 
return estrella;

};

