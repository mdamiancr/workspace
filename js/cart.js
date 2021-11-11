
let arrayArticles = [];
let allSubtotals = 0;
let rateUSD = 40;
let shippingCost = 0;
let confirmedAddress = false
let confirmedPaymentMethod = false

/* esta funcion recibe un producto y devuelve el costo total segun su precio unitario
 y la cantidad a comprar, si el valor está en pesos utilizando rateUSD se convierte el precio a Dólares */
 
function subtotalPrice(count, index) {
    let sub = 0;
    if (arrayArticles[index].currency === "UYU") {
        sub = (arrayArticles[index].unitCost * count) / rateUSD;

    } else {
        sub = arrayArticles[index].unitCost * count;
    }
    return sub;
}

/* Función que actualiza los subtotales al cambiar los valores de los input (cantidad de articulos a comprar) */
function updateAllSubTotal(btn) {
    let subtotalArray = document.getElementsByClassName("countArticle"); /* Se genera un array con los inputs (uno para cada artículo) */
    let subtotal = 0;


    for (let i = 0; i < subtotalArray.length; i++) {
        let item = subtotalArray[i];
        newI = i;
        if (btn === newI) {
            newI = i + 1;
        }

        subtotal += subtotalPrice(item.value, newI); /* se recorre el array y del se toma  el valor de cada articulo en funcion de su index (i) y se agregar a subtotal*/
    }


    document.getElementById("subtotalCost").innerHTML = "USD " + subtotal; /* se modifica el subtotal general */
    allSubtotals = subtotal;
    totalPrice();

}

function totalPrice() {
let total = allSubtotals + shippingCost
document.getElementById("totalCost").innerHTML = "USD " + total;

}

function addEventCount() {
let subtotalArray = document.getElementsByClassName("countArticle"); /* Se genera un array con los inputs (uno para cada artículo) */

    for (let i = 0; i < subtotalArray.length; i++) {
        subtotalArray[i].addEventListener("change", function() {
            if (arrayArticles[i].currency === "UYU") {
                document.getElementById("productSubtotal-" + i).innerHTML = "USD " + subtotalArray[i].value * arrayArticles[i].unitCost / rateUSD;
            } else {
                document.getElementById("productSubtotal-" + i).innerHTML = arrayArticles[i].currency + " " + subtotalArray[i].value * arrayArticles[i].unitCost;
            }

            updateAllSubTotal();
            calcShippingCost()
            totalPrice(); /*costo total de productos (sin envío)*/

        });

    }


}

/*Inicio de cálculo del costo de envio*/
function calcShippingCost(btn) {
    let shippingArray = document.getElementsByName("shipping");

    for (i = 0; i < shippingArray.length; i++) {
        if (shippingArray[i].checked) {
            shippingCost = shippingArray[i].value * allSubtotals / 100

        }
    }

    /* mostrar costo del total */
    document.getElementById("shippingCost").innerHTML = "USD " + shippingCost

    /* Actualizar total al modificar tipo de envío */
    totalPrice();

}

/* botón que elimina producto*/
function eraseProduct(btn) {
    let parent = document.getElementById("cart-products");
    let product = document.getElementById(btn);

    parent.removeChild(product);

    addEventCount();
    updateAllSubTotal(btn);
    calcShippingCost();
    totalPrice();

}








// Modal para dirección de envío

function verifyShippingAddress() { //verificando la dirección

    if (document.getElementById("shippingAddress").value === "") { /*si el input de calle esta vacío pide ingresar valor*/
        alert("Ingrese la calle");
    } else if (document.getElementById("shippingAddressNum").value === "") { /*si el input de num de puerta esta vacío pide ingresar valor*/
        alert("Ingrese el número de puerta")
    } else if (document.getElementById("shippingDepartament").value === "") { /*si el input de deptp esta vacío pide ingresar valor*/
        alert("Seleccione el depatamento")
    } else {
        confirmedAddress = true; /* si esta todo correcto cambia al botón "modificar entrega" */
        $('#modalShippingAdress').modal('toggle');
        document.getElementById('btnSelectAddress').innerHTML = "Modificar dirección de entrega.";

    }

};

/*botón cancelar que cierra y limpia los campos*/
function clearShippingAddress() {
    document.getElementById("shippingAddress").value = "";
    document.getElementById("shippingAddressNum").value = "";
    document.getElementById("shippingAddressNumApto").value = "";
    document.getElementById("shippingDepartament").value = ""
    confirmedAddress = false;
    document.getElementById('btnSelectAddress').innerHTML = "Ingrese dirección de entrega."
}



// modal método de pago

function disableBankPayment() {

    /*activado el pago con tarjeta*/
    document.getElementById("cardNumber").disabled = false;
    document.getElementById("inputcardExpMonth").disabled = false;
    document.getElementById("inputcardExpYear").disabled = false;
    document.getElementById("cardcvv").disabled = false;

    /*desactivado método de transf bancaría*/
    document.getElementById("accountNumber").disabled = true;
    document.getElementById("accountNumber").value = "";
};

/* Deshabilitar campos pago con tarjeta (deshabilita y da valor vacío) */
function disableCardPayment() {
    document.getElementById("cardNumber").disabled = true;
    document.getElementById("cardNumber").value = "";
    document.getElementById("inputcardExpMonth").disabled = true;
    document.getElementById("inputcardExpMonth").value = "";
    document.getElementById("inputcardExpYear").disabled = true;
    document.getElementById("inputcardExpYear").value = "";
    document.getElementById("cardcvv").disabled = true;
    document.getElementById("cardcvv").value = "";

    /*método de transferencia activado*/
    document.getElementById("accountNumber").disabled = false;
};

/* si se ingresó método de pago cambia el botón */
function verifyPaymentMethod() {
    confirmedPaymentMethod = true;
    $('#modalPaymentMethod').modal('toggle');
    document.getElementById('btnPaymentOptions').innerHTML = "Modificar forma de pago.";


};

/*función que limpia los campos de metodo de pago con tarjeta*/
function clearPaymentMethod() {
    document.getElementById("cardNumber").value = "";
    document.getElementById("inputcardExpMonth").value = "";
    document.getElementById("inputcardExpYear").value = "";
    document.getElementById("cardcvv").value = "";
    document.getElementById("accountNumber").value = ""
    /*si no se confirma salta la alerta*/
    confirmedPaymentMethod = false;
    document.getElementById('btnPaymentOptions').innerHTML = "Seleccionar forma de pago.";
}

    /* botón fonalizar compra si todos los campos están llenos*/
    function buyProducts() {
    if (shippingCost !== 0 && confirmedAddress === true &&
        confirmedPaymentMethod === true) {

        alert('Compra realizada exitosamente!')
    /* despues de la compra se limpia información, productos y costos*/
        clearPaymentMethod();
        clearShippingAddress();
        document.getElementById('cart-products').innerHTML = "";
        document.getElementById('subtotalCost').innerHTML = " - ";
        document.getElementById('shippingCost').innerHTML = " - ";
        document.getElementById('totalCost').innerHTML = " - ";



/* si algún campo se encuentra vacío se debe confirmar*/

    } else if (confirmedAddress === false) {
        alert('Debe seleccionar el tipo de envío.')
    } else if (shippingCost === 0) {
        alert('Debe ingresar la dirección de entrega.')
    } else if (confirmedPaymentMethod === false) {
        alert('Debe ingresar un método de pago.')
    }

};


/*función que muestra los dos articulos pre cargados*/
function showCartArticles(articles) {
    let HTMLcont = "";
    let articlePriceUSD = 0;
    for (i = 0; i < articles.length; i++) {

        /* si precio está en pesos cambiar a dólares */
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

    /*id que muestra los productos pre cargads*/
    document.getElementById("cart-products").innerHTML = HTMLcont;
    addEventCount();
    updateAllSubTotal();
    calcShippingCost();
    totalPrice();
}


document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO_URL_DES).then(function(resultObj) {
        if (resultObj.status === 'ok') {
            arrayArticles = resultObj.data.articles;
            showCartArticles(arrayArticles);

        }
    });

})

