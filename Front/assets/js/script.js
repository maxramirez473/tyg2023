var token;
var inicio;
var fin;

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var mmAtras = String(today.getMonth()).padStart(2, '0'); //January is 0!
var yyyy = String(today.getFullYear());


inicio=dd+mm+yyyy;
fin=dd+mmAtras+yyyy; 


window.addEventListener('load', function() {
    //AL CARGAR LA PAGINA SE GUARDA EL TOKEN
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "identifier": "api-user@example.com",
    "password": "123456"
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://gestionweb.frlp.utn.edu.ar/api/auth/local", requestOptions)
    .then(response => response.json())
    .then(result => {
        token = result.jwt;
    })
    .catch(error => console.log('error', error));
});


function mostrar(e){
    for (var datos of e) 
    {
    console.log(datos);
    }
}

function uploadMoneda(e){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+token);

    var raw = JSON.stringify({
    "data": {
        "idMoneda": e.monedas_id,
        "nombre": 'dolar',
        "compra": parseInt(e.compra),
        "venta": parseInt(e.venta),
        "fecha": e.fecha
    }
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://gestionweb.frlp.utn.edu.ar/api/g1-monedas", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function deleteMoneda(id){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);

    var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://gestionweb.frlp.utn.edu.ar/api/g1-monedas/"+id, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function deleteAllMonedas(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://gestionweb.frlp.utn.edu.ar/api/g1-monedas", requestOptions)
    .then(response => response.json())
    .then(result => {
        for (var datos of result.data) {
            deleteMoneda(datos.id);
        }
    })
    .catch(error => console.log('error', error));
}

function getDatos(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://gestionweb.frlp.utn.edu.ar/api/g1-monedas", requestOptions)
    .then(response => response.json())
    .then(result => {
        for (var datos of result.data) {
            console.log(datos);
        }
    })
    .catch(error => console.log('error', error));
}


function cargar(){
    /*var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };
        
        fetch("https://dolarsi.com/adm/api/estadisticas/?type=getMonedas", requestOptions)
            .then(response => response.json())
            .then(result => mostrar(result))
            .catch(error => console.log('error', error));*/

    let myHeaders = new Headers(); //OBTIENEN VALORES DEL DOLAR
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    urlencoded.append("id", "1"); //DOLAR
    urlencoded.append("fechaInicio", "01062023");
    urlencoded.append("fechaFin", "03072023");

    fetch("https://dolarsi.com/adm/api/estadisticas/?type=getHistorico", {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        })
    .then(response => response.json())
    .then(result => {
        //console.log(result);
        for (var datos of result) 
        {
            uploadMoneda(datos);
        }
    })
    .catch(error => console.log('error', error));
}