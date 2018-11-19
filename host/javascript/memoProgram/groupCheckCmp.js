Vue.component('group-check-cmp', {
    props:[""],
    template: `
<div class="w3-green w3-padding">
    <span v-for="group in groups" class="w3-padding-small">
        <label for="g_group.name">{{group.name}}</label>
        <input name="g_{{group.name}}" class="w3-check" type="checkbox" v-model="group.value">
    </span>
</div>` ,
    created:function(){
        var me = this;
        database.ref('SystemData/GroupNames').once("value").then(function(returnVal){
            var groupNames = returnVal.val();
            var groups = [];
            for (const name of groupNames) {
                groups.push({name:name , value:false});
            }
            me.groups = groups;
        });
    },
    data:function(){
        return {
            groups:[]
        };
    },
    methods:{
        getSlectedGroupNames:function(group){
            var selectedGroupNames = [];
            for (const group of this.groups) {
                if(group.value == true){
                    selectedGroupNames.push(group.name);
                }
            }
            return selectedGroupNames.join(",");
        },
        clearCheck:function(){
            for (const group of this.groups) {
                group.value = false;
            }
        },
        checkGroup:function(groupNames){
            var groupNameArr = groupNames.split(",");
            for (const group of this.groups) {
                if(groupNameArr.indexOf(group.name) != -1){
                    group.value = true;
                }else{
                    group.value = false;
                }
            }
        }
    }
})