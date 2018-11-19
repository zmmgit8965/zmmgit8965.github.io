

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
  requestToolingApi(loginInfo.sessionId,'SELECT Id,Name FROM ApexClass', function(doc,text){ //SELECT Id,DeveloperName,ExternalName FROM CustomObject
    
        formatObject(doc);
  })
}

function formatObject(doc){

    var list = [];
    
    $(doc).find("records").each(function(){
        list.push({id:$(this).find("sf\\:Id").html(),
                   name:$(this).find("sf\\:Name").html()});
    });

    appData.objects = list;
}

var appData = {objects:[]};
var v = new Vue({
  el: '#app',
  data: {appData:appData},
  methods: {
  }
});