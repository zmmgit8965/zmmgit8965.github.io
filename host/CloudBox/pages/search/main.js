var loginInfo = {};

var objMap = null;

var tooltipMap = null;

var allTooltip = [];

$(function(){
  login(function(sessionId, domain, loginDoc){
    loginInfo.sessionId = sessionId;
    loginInfo.loginDoc = loginDoc;
    loginInfo.domain = domain;
    appData.loginInfo = loginInfo;


    getLocalData("objMap",function(d){
        if(d.objMap){
            objMap = d.objMap;
            allTooltip = Object.values(getToolTipObjAndField(d.objMap))
            appData.tooltipList = allTooltip;
        }else{
            refreshLocalObjects()
        }
    });

    searchDatas();
  });
})


function searchDatas(){
    var sql = editor.getValue();
    var selectItems = [];
    requestData(sql , function(r){
        appData.datas = r.records;

    });

    var reg = /select\s+(.+)\sfrom\s+(.+)/i
    var r = reg.exec(sql);
    selectItems = r[1].replace(/\s+/g, '').split(",");
    appData.selectItems = selectItems;
}

var appData = {datas:[], selectItems:[], tooltipList:null};
var v = new Vue({
  el: '#app',
  data: {appData:appData},
  methods: {
      search:function(){
        searchDatas();
      },
      tooltipItemClick : function(obj){
          editor.insert(obj.name);
          $(".tooltipDiv").hide();
      }
  }
});

function fileterTooltip(text){
    if(text){
        var reg = new RegExp(text, "i");
        var l = [];
        allTooltip.forEach(t => {
            if(reg.test(t.name) == true || reg.test(t.label) == true){
                l.push(t);
            }
        });
        if(l.length > 0){
            l[0].selected = true;
        }
        appData.tooltipList = l;
    }else{
        appData.tooltipList = Object.values(getToolTipObjAndField(objMap));
    }
}

function getSelectedTooltipIndex(){
    for (let index = 0; index < appData.tooltipList.length; index++) {
        const element = appData.tooltipList[index];
        if(element.selected == true){
            return index;
        }
    }
}

function getSelectedTooltip(){
    for (let index = 0; index < appData.tooltipList.length; index++) {
        const element = appData.tooltipList[index];
        if(element.selected == true){
            return element;
        }
    }
}

function clearSelectedTolltip(){
    for (let index = 0; index < appData.tooltipList.length; index++) {
        const element = appData.tooltipList[index];
        element.selected = false;
    }
}

function setSelectTooltip(n){
    if(n < appData.tooltipList.length){
        appData.tooltipList[n].selected = true;
    }
}

function selectPrevTooltip(offset){
    var selectedIndex = getSelectedTooltipIndex();
    if(selectedIndex == undefined){
        selectedIndex = 0;
        setSelectTooltip(0);
        return ;
    }
    if((selectedIndex + offset < 0) || (selectedIndex + offset == appData.tooltipList.length)) return;
    clearSelectedTolltip();
    setSelectTooltip(selectedIndex + offset);

    var el = $("#t_" + (selectedIndex + offset));
    if(el.length > 0){
        el[0].scrollIntoViewIfNeeded();
    }
}

function getToolTipObjAndField(objMap){
    tooltipMap = {};
    var index = 0 ;
    Object.values(objMap).forEach(obj => {
        var tooltipObj = {};
        tooltipObj.name = obj.name;
        tooltipObj.label = obj.label;
        tooltipObj.fields = [];
        tooltipObj.selected = false;
        tooltipObj.id = "t_" + index;
        index ++;
        
        obj.fields.forEach(field => {
            var tooltipField = {};
            tooltipField.name = field.name;
            tooltipField.label = field.label;

            tooltipObj.fields.push(field);
        });
        tooltipMap[tooltipObj.name] = tooltipObj;
    });
    return tooltipMap;
}

function showToolTip(){
    appData.tooltipList = Object.values(getToolTipObjAndField(objMap));
    appData.tooltipList[0].selected = true;
    updateTooltipPosition();
    $(".tooltipDiv").show();
}

function updateTooltipPosition(){
    let renderer = editor.renderer;
    var pos = renderer.$cursorLayer.getPixelPosition(this.base, true);
    var rect = editor.container.getBoundingClientRect();
    console.log(pos)
    console.log(rect)
    //pos.top + rect.top - renderer.layerConfig.offset;
    //var left = pos.left + rect.left - editor.renderer.scrollLeft;
    var top = pos.top + rect.top ;
    var left = pos.left + rect.left ;
    setTooltipPosition(top+20, left);
}

function setTooltipPosition(top, left){
    $(".tooltipDiv").css("top", top + "px");
    $(".tooltipDiv").css("left", left + "px");
}


var editor = ace.edit("editor");
editor.setTheme("ace/theme/chrome");
editor.session.setMode("ace/mode/sql");

editorKeyDown = function(e){

    // if(e.keyCode == 40 && $(".tooltipDiv").is(":visible")){  // down
    //     stopEditorEventflg = true;
    //     appData.tooltipList[0].selected = true;
    //     $(".tooltipRow").eq(0).addClass("selectedTooltip");
    //     $("#tooltipInput").focus();
    // }
    if($(".tooltipDiv").is(":visible")){
        switch (e.keyCode) {
            case 27: // esc
                $(".tooltipDiv").hide();
                stopEditorEventflg = false;
                editor.focus();
                break;
            case 38: //up
                selectPrevTooltip(-1);
                break;
            case 40: //down
                selectPrevTooltip(1);
                break;
            case 13: //enter
                break;
            case 9: // tab

                if($(".tooltipDiv").is(":visible")){ 
                    e.preventDefault();
                    stopEditorEventflg = true;
                    setTimeout(function(){
                        editor.insert(getSelectedTooltip().name);
                        $(".tooltipDiv").hide();
                        stopEditorEventflg = false;
                        editor.focus();
                    },1);
                }
                break;
            default:
                break;
        }
    }
}

//https://www.kancloud.cn/zhongxia/fe_interview/214226
editor.on("change", function(e){
    var reg = /\s+/;
    if(e.lines.length == 1){
        if(reg.test(e.lines[0])){
            showToolTip()
        }else{
            if($(".tooltipDiv").is(":visible")){
                var reg = /\S+$/;
                var cursorPos = editor.getCursorPosition();
                var rowText = editor.session.getLine(cursorPos.row);
                var textBeforeEdit = rowText.substring(0, cursorPos.column) + e.lines.join("");
                var xxx = reg.exec(textBeforeEdit);
                if(xxx){
                    console.log(xxx[0]);
                    fileterTooltip(xxx[0]);
                }
            }
        }
    }
})