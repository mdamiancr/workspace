const ORDER_ASC_BY_NAME = "AZ";
const ORDER_ASC_BY_PRECIO = "$ASC";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;



function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_ASC_BY_PRECIO){
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(productsArray){
   let htmlContentToAppend = "";
    for(let i = 0; i < productsArray.length; i++){
        let product = productsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

            
    htmlContentToAppend += `
    
    <div class="col-md-4">
      <a href="product-info.html" class = "card mb-3 custom-card">
        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
        <h4 class="m-3 text-center">`+ product.name +`</h4>
          <div class="card-body">
            <p class="text-muted">` + product.soldCount + ` vendidos</p>
            <p class="mb-1 card-text">`+ product.description +`</p>
            <p class="mb-1">`+ product.currency +` `+ product.cost +`</p>
          </div>
      </a>
    </div>
        `

    }


        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}
        
    


function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList(currentProductsArray);
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("precAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRECIO);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList(currentProductsArray);
    });


    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList(currentProductsArray);
    });


    document.getElementById("buscarproductos").addEventListener("keyup", function(){
       search();
      
	});
    

});



function search(){
  
  let inputValor = document.getElementById("buscarproductos").value;
  let buscar =  currentProductsArray.filter((product)=>{  
    return product.name.toUpperCase().includes(inputValor.toUpperCase());
  });
 
 showProductsList(buscar);
}