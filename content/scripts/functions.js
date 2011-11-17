var animation_effect = "drop";
var animation_speed = "slow";

//document.ready
$(function(){
  
  // I choose not to spend the time supporting internet explorer
  if(getInternetExplorerVersion() > 0){
    $("#navigation").html("");
    $("#content").html("<center>You are using an unsupported browser. To see all the wonderment the internet has to offer, please <a href='http://www.google.com/chrome'>upgrade</a>!</center>");
  }

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
    var new_title = "Web Developer, World Traveler"
    if(new_url != "index"){
      new_title = new_url.charAt(0).toUpperCase() + new_url.slice(1);
    }

    var body_id = new_url;
    if($("body").attr("id") == new_url)
      return;

    $("#content_ajax").stop(false, true).toggle(animation_effect, animation_speed, function() {
      //$("#ajax_loading").show();

      if(new_url == "index"){
        new_url = "";
      } else {
        new_url = new_url + "/";
      }

      window.history.pushState(new_url, new_url, "/" + new_url);
      document.title = document.title.replace(/^(.*)\|.*$/, "$1 | " + new_title);

      $.get("/ajax/" + body_id + ".html", function(data){
        //$("#ajax_loading").hide();
        $("body").attr("id", body_id);
        $("#content_ajax").html(data).toggle(animation_effect, animation_speed);
      });
    });
  });
});

$(window).bind('onpopstate', function(e) {
    var state = window.history.getState();
    Console.log("Stuff and things: " + state);
    e.preventDefault();
    return false;
});

function preload(arrayOfImages) {
  $(arrayOfImages).each(function(){
    $('<img/>')[0].src = this;
  });
}
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
function getInternetExplorerVersion() {
  var rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}
