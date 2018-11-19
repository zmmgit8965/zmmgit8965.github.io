
Vue.component('memo-item', {
    props:["memo"],
    template: `
<div class="memo">
    <h4 class="memoTitle">
    <a href="" v-on:click.prevent="titleClick(memo);">{{memo.title}}</a>
    </h4>
    <div class="memoDetail">
    {{memo.text}}
    </div>
</div>` ,
    created:function(){
    },
    methods:{
        titleClick:function(memo){
            var modal = this.$root.$refs.memoViewModal;
            modal.memo = memo;
            modal.show();
        }
    }
})