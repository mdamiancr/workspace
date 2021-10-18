let arrayArticles = [];
let allSubtotals = 0;
let rateUSD = 40;



/* esta funcion recibe un producto y devuelve el costo total segun su precio unitario y la cantidad a comprar, si el valor está en pesos utilizando rateUSD se convierte el precio a Dólares */
function subtotalPrice(count, index) {
    let sub = 0;
    if (arrayArticles[index].currency === "UYU") {
        sub = (arrayArticles[index].unitCost * count) / rateUSD;

    } else {
        sub = arrayArticles[index].unitCost * count;
    }
    return sub;
}

/* Actualizando los subtotales */
function updateAllSubTotal(btn) {
    let subtotalArray = document.getElementsByClassName("countArticle"); /* Se genera un array con los inputs contador (uno para cada artículo) */

    for (let i = 0; i < subtotalArray.length; i++) {
        let item = subtotalArray[i];
        newI = i;
        if (btn === newI) {
            newI = i + 1;
        }

        subtotal += subtotalPrice(item.value, newI); /* se recorre el array y del se toma  el valor de cada articulo en funcion de su index (i) y se agregar a subtotal*/
    }
}

function addEventCount() {
    let subtotalArray = document.getElementsByClassName("countArticle"); /* Se genera un array con los inputs contador (uno para cada artículo) */

    for (let i = 0; i < subtotalArray.length; i++) {
        subtotalArray[i].addEventListener("change", function() {
            if (arrayArticles[i].currency === "UYU") {
                document.getElementById("productSubtotal-" + i).innerHTML = "USD " + subtotalArray[i].value * arrayArticles[i].unitCost / rateUSD;
            } else {
                document.getElementById("productSubtotal-" + i).innerHTML = arrayArticles[i].currency + " " + subtotalArray[i].value * arrayArticles[i].unitCost;
            }

            updateAllSubTotal();
            calcShippingCost()
            totalPrice();

        });

    }


}


/* botón que elimina productos*/
function eraseProduct(btn) {
    let parent = document.getElementById("cart-products");
    let product = document.getElementById(btn);

    parent.removeChild(product);
    addEventCount();
}

function showCartArticles(articles) {
    let HTMLcont = "";
    let articlePriceUSD = 0;
    for (i = 0; i < articles.length; i++) {

        if (articles[i].currency === "UYU") {
            articlePriceUSD = articles[i].unitCost / rateUSD
        } else {
            articlePriceUSD = articles[i].unitCost
        }

        HTMLcont += `
        <tr id="${i}" class="product">
            <td scope="col"><img src='${articles[i].src}' height="125px"></td>
            <td scope="col">${articles[i].name}</td>
            <td scope="col"> USD ${articlePriceUSD}</td>
            <td scope="col"><input class="form-control countArticle" style="width:60px;" type="number" id="productCount-${i}" value="${articles[i].count}" min="1"></td>
            <td scope="col"><span id="productSubtotal-${i}" style="font-weight:bold;"> USD ${articlePriceUSD * articles[i].count}</span></td>
            <td scope="col"><button type="button" class="btn btn-link trash" onclick="eraseProduct(${i});"><i class="fas fa-trash"></i></button></td>
        </tr>
            `
    }
    document.getElementById("cart-products").innerHTML = HTMLcont;
    addEventCount();
    updateAllSubTotal();
    calcShippingCost();
    totalPrice();


}







//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO_URL_DES).then(function(resultObj) {
        if (resultObj.status === 'ok') {
            arrayArticles = resultObj.data.articles;
            showCartArticles(arrayArticles);


        }

    });







})