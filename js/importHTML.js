
function importHTML(url, el){
    (function(elp){
        loadFile(url,
            function (r) {
                elp.innerHTML = r;
            }
        );
    })(el);
}

function loadFile(url,successCallback, errorCallBack){
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 404 && errorCallBack) {
                errorCallBack("file not found");
            }else{
                successCallback(this.responseText);
            }
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}

function syncImportHTML(url, el){
    var client = new XMLHttpRequest();
    client.open("GET", url, false);
    client.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    client.send(null);

    el.innerHTML = client.responseText;
}

function syncDcoumentWriteHTML(url){
    var client = new XMLHttpRequest();
    client.open("GET", url, false);
    client.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    client.send(null);

    document.write(client.responseText);
}

window.addEventListener("load", function(){
    var els = document.querySelectorAll('[importHTML]');
    for(var i=0 ; i<els.length ; i++){
        var url = els[i].getAttribute("importHTML");
        importHTML(url, els[i]);
    }
    els = document.querySelectorAll('[syncImportHTML]');
    for(var i=0 ; i<els.length ; i++){
        var url = els[i].getAttribute("syncImportHTML");
        syncImportHTML(url, els[i]);
    }
})