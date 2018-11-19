

Vue.component('tree-grid', {
    props:["tree_data", "columns"],
    template: `
    <div class="treeRoot noselect">
    <div>
        <table class="treeTitle" style="width:100%;">
            <tr>
                <td>Tree</td>
                <td style="width:150px;">
                    <button v-on:click="addChild">+</button>
                    <button v-on:click="collAll">CA</button>
                    <button v-on:click="expendAll">EA</button>
                </td>
            </tr>
        </table>
    </div>
    <div class="gridTitle">
        <div class="treeHandle"></div>
        <div class="treeGrid">
            <div class="treeGridTitleCell" v-for="col in columns" v-bind:style="{width: col.width}">
                {{col.title}}
            </div>
        </div>
    </div>
    <div v-for="node in treeNodeList" 
        v-bind:class="'treeNode' + (node.children.length == 0 ? ' leafNode':'') + (node.selected? ' selectedNode': '')" 
        v-show="node.visible && node.isAllParentVisible()"
        v-on:click="rowClick(node)"
        v-on:mousedown="treeNodeMouseDown(node)"
        v-on:mouseover="treeNodeMouseOver(node)"
        v-on:mouseleave="treeNodeMouseLeave(node)">
        <div class="treeHandle"
        v-bind:style="{paddingLeft: node.paddingLeft + 'px'}" >
            <span v-if="node.children.length == 0"></span>
            <span v-if="node.children.length != 0 && node.toggleFlg == true" v-on:click="toggleClick(node)">▷</span>
            <span v-if="node.children.length != 0 && node.toggleFlg == false" v-on:click="toggleClick(node)">▼</span>
            <div class="treeNodeName">
                {{node.model.title}}
            </div>
        </div>
        <div class="treeGrid">
            <div class="treeGridCell" v-for="col in columns" v-bind:style="{width: col.width}">
                {{node.model[col.propertyName]}} &nbsp;
            </div>
        </div>
    </div>
</div>
` ,
    data : function(){
        console.log("create data");
        return {treeNodeList:[], rootNode:{}, selectedNode:{}};
    },
    created:function(){
        this.rootNode = new TreeNode({}, this);
        this.rootNode.createChilds(this.tree_data, this);
        this.rootNode.selectNode();
        this.treeNodeList = this.rootNode.getAllGenerations();
    },
    methods:{
        rowClick : function(node){
            node.click();
        },
        toggleClick : function(node){
            node.toggle();
        },
        collAll : function(){
            this.selectedNode.collapseAll();
        },
        expendAll : function(){
            this.selectedNode.expendAll();
        },
        addChild : function(){
            var tn = new TreeNode({title:"new"}, this);
            this.selectedNode.appendChild(tn);
            var lastChild = this.selectedNode.getLastChild();
            var lastChildIndex = this.treeNodeList.indexOf(lastChild);
            this.treeNodeList = this.rootNode.getAllGenerations();
        },
        treeNodeMouseDown : function(node){
            me = this;
            node.startDrag(function(){
                me.treeNodeList = me.rootNode.getAllGenerations();
            });
        },
        treeNodeMouseOver : function(node){
            node.mouseOver();
        },
        treeNodeMouseLeave : function(node){
            node.mouseLeave();
        }
      }
})