var home_html = "";

//document.ready
$(function(){
  $("ul.tools img, footer #social img")
  .mouseenter(function(){
    $(this).attr("src", $(this).attr("src").replace(/-bw/, ""));
  })
  .mouseleave(function(){
    $(this).attr("src", $(this).attr("src").replace(/\.png/, "-bw.png"));
  });

  $("nav a").click(function(e){
    e.preventDefault();
    var new_url = $(this).attr("id");
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