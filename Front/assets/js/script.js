let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

let urlencoded = new URLSearchParams();
urlencoded.append("id", "1");
urlencoded.append("fechaInicio", "01012023");
urlencoded.append("fechaFin", "01062023");

fetch("https://dolarsi.com/adm/api/estadisticas/?type=getHistorico", {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    })
.then(response => response.json())
.then(result => console.log(result))
.catch(error => console.log('error', error));