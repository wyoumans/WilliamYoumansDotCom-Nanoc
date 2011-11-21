var animation_effect = "drop";
var animation_speed = "slow";

//document.ready
$(function(){

  // Prepare
  var History = window.History;

  // Bind to StateChange Event
  History.Adapter.bind(window,'statechange',function(){
    var State = History.getState();
    var next_page = State.url.replace(/(.*\.com|.*:3000)/, "").replace(/\//g, "");

    if(next_page == ""){
      next_page = "index";
    }
    changePage(next_page);
  });

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

  $("nav a, a#logo").click(function(e){
    e.preventDefault();

    var change_url = $(this).data("url");

    var new_title = "Web Developer, World Traveler"

    if(change_url == "index"){
      change_url = "";
    } else {
      new_title = change_url.charAt(0).toUpperCase() + change_url.slice(1);
      change_url = change_url + "/";
    }

    History.pushState(change_url, document.title.replace(/^(.*)\|.*$/, "$1 | ") + new_title, "/" + change_url);
  });
});

function changePage(new_url){

  if($("body").attr("id") == new_url)
    return;

  $("#content_ajax").stop(false, true).toggle(animation_effect, animation_speed, function() {
    //$("#ajax_loading").show();

    $.get("/ajax/" + new_url + ".html", function(data){
      //$("#ajax_loading").hide();
      $("body").attr("id", new_url);
      $("#content_ajax").html(data).toggle(animation_effect, animation_speed);
    });
  });

  // Inform Google Analytics of the change
  if ( typeof _gaq !== 'undefined' ) {
    _gaq.push(['_trackPageview', new_url + "/"]);
  }
}

function preload(arrayOfImages) {
  $(arrayOfImages).each(function(){
    $('<img/>')[0].src = this;
  });
}
