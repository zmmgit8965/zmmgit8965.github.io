
Vue.component('memo-edit-modal', {
    props:["memo"],
    template: `
<div class="w3-modal w3-animate-opacity" style="padding-top:10px;">
    <div class="w3-modal-content w3-card-4">
        <header class="w3-container w3-teal"> 
            <span class="w3-display-topright">
                <span v-on:click="saveClick" 
                class="w3-button w3-large "><i class="material-icons">save</i></span>
                <span v-on:click="closeClick" 
                class="w3-button w3-large"><i class="material-icons">close</i></span>
            </span>
            <div><input class="w3-input w3-teal" style="width:80%;color:white;" type="text" v-model="memo.Title"></div>
        </header>
        <div class="w3-padding-small">
            <group-check-cmp ref="groupCheckCmp" />
        </div>
        <div id="toolbar-container" ref="toolbar">
<span class="ql-formats">
<select class="ql-font"></select>
<select class="ql-size"></select>
</span>
<span class="ql-formats">
<button class="ql-bold"></button>
<button class="ql-italic"></button>
<button class="ql-underline"></button>
<button class="ql-strike"></button>
</span>
<span class="ql-formats">
<select class="ql-color"></select>
<select class="ql-background"></select>
</span>
<span class="ql-formats">
<button class="ql-script" value="sub"></button>
<button class="ql-script" value="super"></button>
</span>
<span class="ql-formats">
<button class="ql-header" value="1"></button>
<button class="ql-header" value="2"></button>
<button class="ql-blockquote"></button>
<button class="ql-code-block"></button>
</span>
<span class="ql-formats">
<button class="ql-list" value="ordered"></button>
<button class="ql-list" value="bullet"></button>
<button class="ql-indent" value="-1"></button>
<button class="ql-indent" value="+1"></button>
</span>
<span class="ql-formats">
<button class="ql-direction" value="rtl"></button>
<select class="ql-align"></select>
</span>
<span class="ql-formats">
<button class="ql-link"></button>
<button class="ql-image"></button>
<button class="ql-video"></button>
<button class="ql-formula"></button>
</span>
<span class="ql-formats">
<button class="ql-clean"></button>
</span>
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
        }
    },
    methods:{
        closeClick:function(){
            this.hide();
        },
        saveClick:function(){
            var content = this.quill.getContents();
            var text = this.quill.getText();
            
            this.memo.Detail = JSON.stringify(content);
            this.memo.Summray = this.$refs.quill.innerHTML;
            this.memo.Groups = this.$refs.groupCheckCmp.getSlectedGroupNames();

            var isNew = false;
            if(this.memo.CreateTime == undefined){
                this.memo.CreateTime = new Date();
                isNew = true;
            }

            this.memo.UpdateTime = new Date();

            db.collection("Memo").doc(this.memo.Id).set(this.memo);

            if(isNew == true){
                this.$root.addMemo(this.memo);
            }

            this.hide();
        },
        hide:function(){
            this.$el.style.display='none';
            this.$refs.groupCheckCmp.clearCheck();
        },
        show:function(){
            this.$el.style.display='block';
            if(this.quill == undefined){
                this.quill = new Quill(this.$refs.quill, {
                    modules: {
                      syntax: true,
                      toolbar: this.$refs.toolbar
                    },
                    theme: 'snow',
                    readOnly: false
                  });

            }
            
            if(this.memo.Groups){
                this.$refs.groupCheckCmp.checkGroup(this.memo.Groups);
            }else{
                this.$refs.groupCheckCmp.clearCheck();
            }
            
            if(this.memo.Detail){
                this.quill.setContents(JSON.parse(this.memo.Detail));
            }else{
                this.quill.setContents({});
            }
        }
    }
})