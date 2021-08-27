let prodData =[];
function showProductsList(array){
    showSpinner();
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let product = array[i];
    
    htmlContentToAppend += `
    <div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ product.name +`</h4>
                    <small class="text-muted">` + product.soldCount + ` vendidos</small>
                </div>
                    <p class="mb-1">`+ product.description +`</p>
                    <p class="mb-1">`+ product.currency +` `+ product.cost +`</p>
                </div>
            </div>
        </div>
    </div>
    `
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    
}
hideSpinner();
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then((resultObj) =>{
        if(resultObj.status === "ok"){
          
            prodData = resultObj.data;
            showProductsList(prodData);
        }
    });
});
