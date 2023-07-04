var token;

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

function reloadSpinner(){
    $('#spinnerLoader').removeClass('d-none');

    setTimeout(() => {
        $('#spinnerLoader').addClass('d-none');
    },7000)
}


function mostrar(e){
    for (var datos of e) 
    {
    console.log(datos);
    }
}

function uploadMoneda(e, nombre){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+token);

    var raw = JSON.stringify({
    "data": {
        "idMoneda": e.monedas_id,
        "nombre": nombre,
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
    reloadSpinner()
    let today = new Date();
    
    let dd = String(today.getDate()).padStart(2, '0');
    
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let mmAtras = String(today.getMonth()).padStart(2, '0'); //January is 0!
    let yyyy = String(today.getFullYear());

    let inicio=dd+mmAtras+yyyy; 
    let fin=dd+mm+yyyy;

    let myHeaders = new Headers(); //OBTIENEN VALORES DEL DOLAR
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let dolar = new URLSearchParams();
    dolar.append("id", "1"); //DOLAR
    dolar.append("fechaInicio", inicio);
    dolar.append("fechaFin", fin);

    fetch("https://dolarsi.com/adm/api/estadisticas/?type=getHistorico", {
        method: 'POST',
        headers: myHeaders,
        body: dolar,
        })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        for (var datos of result) 
        {
            uploadMoneda(datos, 'Dolar Oficial');
        }
    })
    .catch(error => console.log('error', error));

    /*  DOLAR */

    setTimeout(() => {
        let blue = new URLSearchParams();
        blue.append("id", "5"); //blue
        blue.append("fechaInicio", inicio);
        blue.append("fechaFin", fin);

        fetch("https://dolarsi.com/adm/api/estadisticas/?type=getHistorico", {
            method: 'POST',
            headers: myHeaders,
            body: blue,
            })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            for (var datos of result) 
            {
                uploadMoneda(datos, 'Dolar Blue');
            }
        })
        .catch(error => console.log('error', error));
    }, "1000");

    /* DOLAR BLUE */

    setTimeout(() => {
        let euro = new URLSearchParams();
        euro.append("id", "2"); //euro
        euro.append("fechaInicio", inicio);
        euro.append("fechaFin", fin);

        fetch("https://dolarsi.com/adm/api/estadisticas/?type=getHistorico", {
            method: 'POST',
            headers: myHeaders,
            body: euro,
            })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            for (var datos of result) 
            {
                uploadMoneda(datos, 'Euro');
            }
        })
        .catch(error => console.log('error', error));
    }, "2000");

    /* EURO */

    setTimeout(() => {
        let libra = new URLSearchParams();
        libra.append("id", "12"); //libra
        libra.append("fechaInicio", inicio);
        libra.append("fechaFin", fin);

        fetch("https://dolarsi.com/adm/api/estadisticas/?type=getHistorico", {
            method: 'POST',
            headers: myHeaders,
            body: libra,
            })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            for (var datos of result) 
            {
                uploadMoneda(datos, 'Libra');
            }
        })
        .catch(error => console.log('error', error));
    }, "3000");

    /* LIBRA */

    setTimeout(() => {
        let real = new URLSearchParams();
        real.append("id", "3"); //real
        real.append("fechaInicio", inicio);
        real.append("fechaFin", fin);

        fetch("https://dolarsi.com/adm/api/estadisticas/?type=getHistorico", {
            method: 'POST',
            headers: myHeaders,
            body: real,
            })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            for (var datos of result) 
            {
                uploadMoneda(datos, 'Real');
            }
        })
        .catch(error => console.log('error', error));
    }, "4000");
}