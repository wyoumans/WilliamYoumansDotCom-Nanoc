var home_html = "";

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
    var body_class = new_url;

    if(new_url == "index"){
      new_url = "";
    } else {
      new_url = new_url + "/";
    }

    console.log("User wants to go to this page: " + new_title);
    window.history.pushState(new_url, new_url, "/" + new_url);
    $("#content").stop(false, true).toggle("drop", 500, function() {
      if($("body").attr("id") == "index"){
        home_html = $("#content").html();
      }
      $("body").attr("id", body_class);
      if(body_class == "index"){
        $("#content").html(home_html).toggle("drop", 500);
      } else {
        $("#content").html("<h1>" + new_title + "</h1><p>Coming soon, maybe</p>").toggle("drop", 500);
      }
    });
  });
});

function preload(arrayOfImages) {
  $(arrayOfImages).each(function(){
    $('<img/>')[0].src = this;
  });
}