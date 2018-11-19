var host = window.location.href.substring(0, window.location.href.indexOf("host/"));

function syncDcoumentWriteHTML(url){
    var client = new XMLHttpRequest();
    client.open("GET", url, false);
    client.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    client.send(null);

    document.write(client.responseText);
}

syncDcoumentWriteHTML(host + "common/header.html");
document.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">');