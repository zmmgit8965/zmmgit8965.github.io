
Vue.component('memo-item', {
    props:["memo"],
    template: `
<div class="memo">
    <h1 class="w3-text-teal"><a href="" v-on:click.prevent="titleClick(memo);">{{memo.Title}}</a>{{memo.UpdateTime}}</h1>
    <div class="memoDetail smallPadding" v-html="memo.Summray" style="max-height:100px; overflow:hidden;">
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