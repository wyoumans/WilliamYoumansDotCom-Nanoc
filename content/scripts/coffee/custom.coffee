changePage = (new_url) ->
  return  if $("body").attr("id") is new_url
  $("#content_ajax").stop(false, true).toggle "drop", "slow", ->

    #$("#ajax_loading").show();
    extension = ".html"
    extension = ".php"  if new_url is "photos"
    $.get "/ajax/" + new_url + extension, (data) ->
      #$("#ajax_loading").hide();
      $("body").attr "id", new_url
      $("#content_ajax").html(data).toggle "drop", "slow"

  _gaq.push ["_trackPageview", new_url + "/"]  if typeof _gaq isnt "undefined"

$ ->
  History = window.History
  History.Adapter.bind window, "statechange", ->
    State = History.getState()
    next_page = State.url.replace(/(.*\.com|.*:3000)/, "").replace(/\//g, "")
    next_page = "index"  if next_page is ""
    changePage next_page

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

