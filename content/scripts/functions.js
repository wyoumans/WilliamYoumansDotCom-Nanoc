//document.ready
$(function(){
  preload([
    '/images/icons/tools/macbook.png',
    '/images/icons/tools/komodo.png',
    '/images/icons/tools/espresso.png',
    '/images/icons/tools/iterm.png',
    '/images/icons/tools/linux.png',
    '/images/icons/tools/apache.png',
    '/images/icons/tools/mysql.png',
    '/images/icons/tools/php.png',
    '/images/icons/tools/nanoc.png',
    '/images/icons/tools/ruby.png',
    '/images/icons/tools/haml.png',
    '/images/icons/tools/sass.png',
    '/images/icons/tools/jquery.png',
    '/images/icons/tools/git.png',
    '/images/icons/tools/transmit.png',
    '/images/icons/tools/alfred.png',
    '/images/icons/tools/adium.png',
    '/images/icons/tools/chrome.png',
    '/images/icons/social/facebook.png',
    '/images/icons/social/lastfm.png',
    '/images/icons/social/github.png'
  ]);

  $("ul.tools img, footer #social img")
  .livequery("mouseenter", function(){
    $(this).attr("src", $(this).attr("src").replace(/-bw/, ""));
  })
  .livequery("mouseleave", function(){
    $(this).attr("src", $(this).attr("src").replace(/\.png/, "-bw.png"));
  });

  $("nav a").click(function(e){
    e.preventDefault();
    var new_url = $(this).data("url");
    var new_title = new_url.charAt(0).toUpperCase() + new_url.slice(1);
    var body_id = new_url;
    if($("body").attr("id") == new_url)
      return;

    $("#content_ajax").stop(false, true).toggle("drop", "fast", function() {
      //$("#ajax_loading").show();

      if(new_url == "index"){
        new_url = "";
      } else {
        new_url = new_url + "/";
      }

      window.history.pushState(new_url, new_url, "/" + new_url);

      $("body").attr("id", body_id);
      
      $.get("/ajax/" + body_id + ".html", function(data){
        //$("#ajax_loading").hide();
        $("#content_ajax").html(data).toggle("drop", "fast");
      });
    });
  });
});

function preload(arrayOfImages) {
  $(arrayOfImages).each(function(){
    $('<img/>')[0].src = this;
  });
}