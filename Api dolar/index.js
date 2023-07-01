window.addEventListener('load', function() { //cuando la pagina carga todos los elementos
    //LA API DEVUELVE LAS COTIZACIONES PARA CIERTAS MONEDAS
    var settings = {
        "url": "https://www.dolarsi.com/api/api.php?type=valoresprincipales",
        "method": "GET",
        "timeout": 0
    };

    $.ajax(settings).done(function (response) { //función de ajax para hacer pedido (request)
        jQuery.each(response, function(i, item){
            //iteramos sobre el array y agregamos los datos
            console.log(item.casa.nombre);
            $('#cotizaciones').append(`Nombre: ${item.casa.nombre} - Compra: ${item.casa.compra} - Venta ${item.casa.venta} </br>`);
        });
    });

});