
Vue.component('memo-list', {
    props:["list"],
    template: `
<div>
    <div v-for="m in list" class="w3-row w3-padding-64" >
        <memo-item v-bind:memo="m" />
    </div>
</div>` ,
    created:function(){
    }
})