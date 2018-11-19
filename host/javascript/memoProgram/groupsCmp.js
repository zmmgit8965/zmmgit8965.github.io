Vue.component('group-cmp', {
    props:["groupNames"],
    template: `
<div class="w3-panel w3-pale-blue w3-leftbar w3-rightbar w3-border-blue">
    Group: &nbsp; 
    <span class="w3-badge w3-green w3-margin-right" v-for="group in groupNames">
        {{group}}
    </span>
</div>` ,
    created:function(){
    },
    methods:{
    }
})