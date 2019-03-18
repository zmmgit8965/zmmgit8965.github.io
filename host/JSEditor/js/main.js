$(function(){
    $(".toolPanel").each(function(){
        $(this).draggable({ handle: $(this).find(".toolPanelTitle") });
    });
});