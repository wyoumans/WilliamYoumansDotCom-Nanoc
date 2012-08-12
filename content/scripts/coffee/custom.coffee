animation_effect = "drop"
animation_speed = "slow"

changePage = (new_url) ->
  return  if $("body").attr("id") is new_url
  $("#content_ajax").stop(false, true).toggle animation_effect, animation_speed, ->

    #$("#ajax_loading").show();
    extension = ".html"
    extension = ".php"  if new_url is "photos"
    $.get "/ajax/" + new_url + extension, (data) ->
      #$("#ajax_loading").hide();
      $("body").attr "id", new_url
      $("#content_ajax").html(data).toggle animation_effect, animation_speed

  _gaq.push ["_trackPageview", new_url + "/"]  if typeof _gaq isnt "undefined"


preload = (arrayOfImages) ->
  $(arrayOfImages).each ->
    $("<img/>")[0].src = this

$ ->
  History = window.History
  History.Adapter.bind window, "statechange", ->
    State = History.getState()
    next_page = State.url.replace(/(.*\.com|.*:3000)/, "").replace(/\//g, "")
    next_page = "index"  if next_page is ""
    changePage next_page

  preload ["/images/icons/tools/macbook.png", "/images/icons/tools/sublime.png", "/images/icons/tools/espresso.png", "/images/icons/tools/iterm.png", "/images/icons/tools/linux.png", "/images/icons/tools/apache.png", "/images/icons/tools/mysql.png", "/images/icons/tools/omnifocus.png", "/images/icons/tools/nanoc.png", "/images/icons/tools/ruby.png", "/images/icons/tools/haml.png", "/images/icons/tools/sass.png", "/images/icons/tools/jquery.png", "/images/icons/tools/git.png", "/images/icons/tools/transmit.png", "/images/icons/tools/alfred.png", "/images/icons/tools/adium.png", "/images/icons/tools/chrome.png", "/images/icons/social/facebook.png", "/images/icons/social/lastfm.png", "/images/icons/social/github.png"]

  $("ul.tools img, footer #social img").livequery("mouseenter", ->
    $(this).attr "src", $(this).attr("src").replace(/-bw/, "")
  ).livequery "mouseleave", ->
    $(this).attr "src", $(this).attr("src").replace(/\.png/, "-bw.png")

  $("nav a, a#logo").click (e) ->
    e.preventDefault()
    change_url = $(this).data("url")
    new_title = "Web Developer, World Traveler"
    if change_url is "index"
      change_url = ""
    else
      new_title = change_url.charAt(0).toUpperCase() + change_url.slice(1)
      change_url = change_url + "/"
    History.pushState change_url, document.title.replace(/^(.*)\|.*$/, "$1 | ") + new_title, "/" + change_url

