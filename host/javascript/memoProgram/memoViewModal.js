
Vue.component('memo-view-modal', {
    props:["memo"],
    template: `
<div class="w3-modal w3-animate-opacity" style="padding-top:10px;">
    <div class="w3-modal-content w3-card-4">
        <header class="w3-container w3-teal"> 
            <span class="w3-display-topright">
                <span v-on:click="editClick" 
                class="w3-button w3-large"><i class="material-icons">edit</i></span>
                <span v-on:click="closeClick" 
                class="w3-button w3-large"><i class="material-icons">close</i></span>
            </span>
            <p>{{memo.Title}}</p>
        </header>
        <div class="w3-padding-small">
            <group-cmp v-bind:groupNames="memoGroups" >
        </div>
        <div id="memoDetailDiv" ref="quill" class="w3-container">
            
        </div>
        <footer class="w3-container w3-teal">
            <p>{{memo.Title}}</p>
        </footer>
    </div>
</div>` ,
    created:function(){
    },
    data:function(){
        return {
            memoGroups : []
        }
    },
    methods:{
        closeClick:function(){
            this.hide();
        },
        editClick:function(){
            this.hide();
            var modal = this.$root.$refs.memoEditModal;
            modal.memo = this.memo;
            modal.show();
            //this.quill.enable();
        },
        hide:function(){
            this.$el.style.display='none';
        },
        show:function(){
            this.$el.style.display='block';
            if(this.quill == undefined){
                this.quill = new Quill(this.$refs.quill, {
                    modules: {
                      syntax: true,
                      toolbar: null
                    },
                    theme: 'snow',
                    readOnly: true
                  });
            }
            if(this.memo.Groups){
                this.memoGroups = this.memo.Groups.split(",");
            }else{
                this.memoGroups = [];
            }
            
            if(this.memo.Detail){
                this.quill.setContents(JSON.parse(this.memo.Detail));
            }else{
                this.quill.setContents({});
            }
            this.quill.disable();
        }
    }
})