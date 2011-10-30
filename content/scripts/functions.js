//document.ready
$(function(){
  $("ul.tools img")
  .mouseenter(function(){
    $(this).attr("src", $(this).attr("src").replace(/-bw/, ""));
  })
  .mouseleave(function(){
    $(this).attr("src", $(this).attr("src").replace(/\.png/, "-bw.png"));
  });

});