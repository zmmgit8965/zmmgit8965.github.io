
Vue.component('input-label', {
    props:["value"],
    template: `<span v-on:dblclick="onDoubleClick()">{{value}}</span>` ,
    created:function(){
    },
    methods:{
        onDoubleClick: function(){
            alert(1);
            var input = document.createElement("input");
        }
    }
})