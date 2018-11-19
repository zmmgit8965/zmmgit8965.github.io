

var loginInfo = {};
$(function(){
  login(function(sessionId, domain, loginDoc){
    loginInfo.sessionId = sessionId;
    loginInfo.loginDoc = loginDoc;
    loginInfo.domain = domain;
    appData.loginInfo = loginInfo;


    loadObject();
  });
})

function loadObject(){
  requestToolingApi(loginInfo.sessionId,'SELECT Id,Name,MasterLabel,Description,ControllerKey FROM ApexPage', function(doc, text){ //SELECT Id,DeveloperName,ExternalName FROM CustomObject
    
    //console.log(text);
    formatObject(doc);
  })
}

function formatObject(doc, customObjectDoc){

    var list = [];

    $(doc).find("records").each(function(){
        list.push({id:$(this).find("sf\\:Id").html(),
                    name:$(this).find("sf\\:Name").html(),
                    label:$(this).find("sf\\:MasterLabel").html(),
                    controller:$(this).find("sf\\:ControllerKey").html(),
                    description:$(this).find("sf\\:Description").html()});
    });
    
    // list.sort(function(a, b){
    //     if(a.isCustomObject && !b.isCustomObject){
    //         return -1;
    //     }else{
    //         return 1;
    //     }
    // });

    appData.objects = list;
}

var appData = {objects:[]};
var v = new Vue({
  el: '#app',
  data: {appData:appData},
  methods: {
  }
});