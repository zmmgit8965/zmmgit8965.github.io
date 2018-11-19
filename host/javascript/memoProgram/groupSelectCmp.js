Vue.component('group-select-cmp', {
    props:["group_names"],
    template: `
<div>
  <a href="#" class="w3-bar-item w3-button w3-hover-black" v-on:click="groupClick(group)" v-for="group in group_names">
  {{group}}
  </a>
</div>` ,
    created:function(){
    },
    methods:{
      groupClick:function(group){
        this.$emit('onselect', group)
      }
    }
})