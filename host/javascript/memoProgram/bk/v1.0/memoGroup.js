
Vue.component('memo-root', {
    props:["category"],
    template: `
<div>
    <div v-for="c in category" class="w3-third w3-padding" >
        <div class=" w3-pale-blue w3-leftbar w3-rightbar w3-border-blue w3-padding-small">{{c.groupName}}</div>
        <div v-for="m in c.subItem" class="w3-ul w3-border w3-padding-small" style="text-overflow: ellipsis;">
            <memo-item v-bind:memo="m" />
        </div>
    </div>
</div>` ,
    created:function(){
    }
})