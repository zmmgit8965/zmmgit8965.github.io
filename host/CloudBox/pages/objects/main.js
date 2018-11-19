

$(function(){
  login(function(sessionId, domain, loginDoc){

    loadObject();
  });
})

function loadObject(){
    requestRESTApi("services/data/v37.0/sobjects/", function(json){
        var r = JSON.parse(json);
        
        var objs = [];
        
        r.sobjects.forEach(obj => {
            if(obj.queryable && obj.searchable && obj.retrieveable){
                objs.push(obj);
            }
        });

            
        objs.sort(function(a, b){
            if(a.custom && !b.custom){
                return -1;
            }else{
                return 1;
            }
        });

        console.log(objs);

        appData.objects = objs;
    })
}


var appData = {objects:[]};
var v = new Vue({
  el: '#app',
  data: {appData:appData},
  methods: {
  }
});