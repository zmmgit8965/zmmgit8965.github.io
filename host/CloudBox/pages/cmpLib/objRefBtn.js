var template = `
<a target="_blank" href="" class="w3-button w3-white w3-border w3-border-blue w3-round-large"
    v-on:click="onObjRefClick(event, object)">参照</a>
`;

Vue.component('obj-ref-btn', {
    props:["object"],
    template: template ,
    data: function(){
        return {};
    },
    methods: {
        onObjRefClick : function(e, obj){
            e.preventDefault();
            if(obj.custom){
                var searchName = obj.name.replace("__c","");
                if(searchName.indexOf("__") != -1){
                    searchName = searchName.substring(searchName.indexOf("__") + 2 , searchName.length);
                }
                
                SalesforceAPI.requestToolingApi("SELECT Id,DeveloperName FROM CustomObject WHERE DeveloperName='" + searchName + "'" ,function(doc,text){
                    var s = $(doc).find("sf\\:Id").html();
                    window.open(SalesforceAPI.LoginInfo.domain + s);
                });
            }else{
                window.open(SalesforceAPI.LoginInfo.domain + "p/setup/layout/LayoutFieldList?type=" + obj.name);
    
            }
        }
    }
})