
Vue.component('memo-view-modal', {
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
            <div><input class="w3-input w3-teal" style="width:80%;color:white;" type="text" v-model="memo.title"></div>
        </header>
        <div id="toolbar-container">
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
        <div id="memoDetailDiv" class="w3-container">
            
        </div>
        <footer class="w3-container w3-teal">
            <p>{{memo.title}}</p>
        </footer>
    </div>
</div>` ,
    created:function(){
    },
    methods:{
        closeClick:function(){
            this.$el.style.display='none';
        },
        saveClick:function(){
            var content = this.quill.getContents();
            var text = this.quill.getText();
            console.log("path:" + this.memo.path + "/detail");
            
            database.ref(this.memo.path + "/detail").set(JSON.stringify(content));
            database.ref(this.memo.path + "/text").set(text);
            database.ref(this.memo.path + "/title").set(this.memo.title);
            this.memo.text = text;
            this.closeClick();
        },
        show:function(){
            this.$el.style.display='block';
            if(this.quill == undefined){
                this.quill = new Quill('#memoDetailDiv', {
                    modules: {
                      syntax: true,
                      toolbar: '#toolbar-container'
                    },
                    theme: 'snow'
                  });
            }
            this.quill.setContents(JSON.parse(this.memo.detail));
        }
    }
})