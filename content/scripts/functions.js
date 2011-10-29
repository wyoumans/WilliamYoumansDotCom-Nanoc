//configuration
var menu_is_down = true;
var animation_speed = 1000;
var slide_super_width = 1920;
var slide_super_height = 1000;
var footer_super_height = 77;

//document.ready
$(function(){

  scaleSite();

  $("*").disableSelection();

  $("*").click(function(){
    pauseTransitionsForFiveMinutes();
  });

  $("#menu_link").click(function(e){
    e.preventDefault();
    if(menu_is_down){
      animateMenuUp();
    } else {
      animateMenuDown();
    }
  });

  $("#next").click(function(e){
    e.preventDefault();
    animateMenuDown();
  });

  $("#previous").click(function(e){
    e.preventDefault();
    animateMenuDown();
  });

  $("#home_link").click(function(e) {
    e.preventDefault();
    animateMenuDown();
    $("#slideshow").cycle(0);
    $("#slideshow").cycle("resume");
    console.log("resuming transitions");
    return false; 
  });

  $("#page6_link").click(function(e) {
    e.preventDefault();
    animateMenuDown();
    $("#slideshow").cycle(5); 
    return false; 
  });

  $("#menu .menu_item").click(function(e){
    e.preventDefault();
    animateMenuDown();
    $("#slideshow").cycle($(this).data("id")); 
    return false; 
  });

  $("#slideshow").cycle({
    fx: 'scrollHorz',
    speed:  animation_speed,
    timeout: '15000',
    prev:   '#previous_link', 
    next:   '#next_link',
    easing: 'jswing',
    after: resizeMainSlide
  });
  
  $("#legal_slideshow").cycle({
    fx: 'none',
    speed:  'fast',
    timeout: 0,
    prev:   '#legal_previous', 
    next:   '#legal_next',
    before: updateLegalCount
  });

  $("#menu .menu_item").mouseenter(function(){
    var id = Number($(this).data("id")) + 1;
    $(this).css("background-image", "url(images/menu/" + id + "_active.jpg)");
  }).mouseleave(function(){
    var id = Number($(this).data("id")) + 1;
    $(this).css("background-image", "url(images/menu/" + id + ".jpg)");
  });

  $("#legal_link").fancybox({
   	'transitionIn'	: 'none',
    'transitionOut'	: 'none',
    showCloseButton: false,
    overlayColor: "#1B2949",
    overlayOpacity: 0.9,
    titleShow: false,
    onComplete: resizeFancybox
  });

  $("#legal_close").click(function(e){
    e.preventDefault();
    $.fancybox.close();
  });

  $(window).resize(function(e){
    scaleSite();
  });

  $("#slideshow").click(function(e){
    mouseX = e.pageX;
    container_width = getContainerWidth();
    console.log("Advance Slide?" + mouseX);
    if(mouseX > container_width / 2){
      $("#next_link").trigger("click");
    } else {
      $("#previous_link").trigger("click");
    }
  });

  //fix for jqcycle callback on page load
  setTimeout("$('#legal_counter span').html('1')", 500);
});

//animate the menu up
function animateMenuUp(){
  if(menu_is_down){
    $("#menu").stop(false, true).toggle("slide", animation_speed, function() {
      menu_is_down = false;
    });
  }
}

//animate the menu down
function animateMenuDown(){
  if(!menu_is_down){
    $("#menu").stop(false, true).toggle("slide", animation_speed, function() {
      menu_is_down = true;
    });
  }
}

//scale everything so it looks good no matter the screen resolution
function scaleSite(){
  //let the math begin
  var container_width = getContainerWidth();
  var window_height = $(window).height();
  var footer_height = Math.round((footer_super_height * container_width) / slide_super_width);
  var container_height = Math.round(slide_super_height * container_width / slide_super_width + footer_super_height);
  var slide_height = getSlideHeight();
  var icon_height = Math.round(50 * footer_height / footer_super_height);
  var icon_top = Math.round(13 * footer_height / footer_super_height);
  var home_left = Math.round(64 * container_width / slide_super_width);
  var menu_left = Math.round(131 * container_width / slide_super_width);
  var previous_left = Math.round(198 * container_width / slide_super_width);
  var next_left = Math.round(265 * container_width / slide_super_width);
  var legal_left = Math.round(430 * container_width / slide_super_width);
  var page6_left = Math.round(928 * container_width / slide_super_width);
  var legal_width = Math.round(439 * container_width / slide_super_width);
  var page6_width = Math.round(608 * container_width / slide_super_width);
  var text_links_height = Math.round(25 * footer_height / footer_super_height);
  var text_links_top = Math.round(30 * footer_height / footer_super_height);
  var container_top = Math.round((window_height - container_height) / 2);
  if(container_top < 0) container_top = 0;
  var menu_width = Math.round(580 * container_width / slide_super_width);
  var menu_height = Math.round(559 * slide_height / slide_super_height);
  var menu_title_height = Math.round(83 * slide_height / slide_super_height);
  var menu_link_height = Math.round(70 * slide_height / slide_super_height);
  var legal_height = Math.round(1000 * slide_height / slide_super_height);
  var legal_width = getLegalWidth();
  var legal_bottom_height = Math.round(95 * slide_height / slide_super_height);
  var legal_slide_height = legal_height - legal_bottom_height;
  var legal_bottom_icon_height = Math.round(55 * slide_height / slide_super_height);
  var legal_bottom_icon_margin = Math.round((legal_bottom_height - legal_bottom_icon_height) / 2);
  var legal_bottom_counter_margin_top = Math.round(65 * slide_height / slide_super_height);
  var legal_bottom_counter_margin_left = Math.round(10 * container_width / slide_super_width);
  var legal_bottom_next_margin_left = Math.round(28 * container_width / slide_super_width);
  var legal_bottom_counter_font_size = Math.round(12 * slide_height / slide_super_height);
  var legal_bottom_icon_background_width = legal_bottom_icon_height - 1;

  //get slides the correct size (16:9)
  $("#slideshow").width(container_width);
  $("#slideshow").height(slide_height);
  $(".slide").each(function(){
    $(this).width(container_width);
    $(this).height(slide_height);
  });

  $("#container").height(container_height);
  $("#container").css("top", container_top);
  $(".icon").height(icon_height);
  $(".icon").width(icon_height);
  $(".icon").css("top", icon_top);
  $("#home_link").css("left", home_left);
  $("#menu_link").css("left", menu_left);
  $("#previous_link").css("left", previous_left);
  $("#next_link").css("left", next_left);
  $("#legal_link").css("left", legal_left);
  $("#page6_link").css("left", page6_left);
  $("#legal_link").width(legal_width);
  $("#page6_link").width(page6_width);
  $("#legal_link, #page6_link").height(text_links_height);
  $("#legal_link, #page6_link").css("top", text_links_top);
  $("#menu").css("bottom", footer_super_height);
  $("#menu").width(menu_width);
  $("#menu").height(menu_height);
  $("#menu #title").height(menu_title_height);
  $("#menu #title").width(menu_width);
  $("#menu .menu_item").each(function(){ $(this).height(menu_link_height); $(this).width(menu_width); });
  $("#legal").height(legal_height);
  $("#legal").width(legal_width);
  $("#legal #legal_slideshow, #legal #legal_slideshow .legal_slide").height(legal_slide_height);
  $("#legal #legal_slideshow, #legal #legal_slideshow .legal_slide").width(legal_width);
  $("#bottom").height(legal_bottom_height);
  $("#bottom").width(legal_width);
  $("#bottom .legal_icon").width(legal_bottom_icon_height);
  $("#bottom .legal_icon").height(legal_bottom_icon_height);
  $("#bottom .legal_icon").css("margin-top", legal_bottom_icon_margin);
  $("#bottom .legal_icon").css("margin-left", legal_bottom_icon_margin);
  $("#bottom .legal_icon").css("background-size",  legal_bottom_icon_background_width + "px " + legal_bottom_icon_height + "px");
  $("#bottom #legal_close").css("margin-right", legal_bottom_icon_margin);
  $("#fancybox-content").css("border", "0");
  $("#legal_counter").css("margin-left", legal_bottom_counter_margin_left);
  $("#legal_counter").css("margin-top", legal_bottom_counter_margin_top);
  $("#legal_counter").css("font-size", legal_bottom_counter_font_size);
  $("#bottom #legal_next").css("margin-left", legal_bottom_next_margin_left);
}

function resizeMainSlide(){
  //get slides the correct size (16:9)
  $(".slide").each(function(){
    $(this).width(getContainerWidth());
    $(this).height(getSlideHeight());
  });
}

function getContainerWidth(){
  return $("#container").width();
}

function getSlideHeight(){
  return Math.round(slide_super_height * getContainerWidth() / slide_super_width);
}

function getLegalWidth(){
  return Math.round(650 * getContainerWidth() / slide_super_width);
}

function resizeFancybox(){
  $("#fancybox-wrap").width(getLegalWidth());
}

function updateLegalCount(curr, next, opts){
  $("#legal_counter span").html(opts.nextSlide + 1);
}

var timer = null;

function pauseTransitionsForFiveMinutes(){
  console.log("pausing transitions");
  $("#slideshow").cycle("pause");
  if(timer){
    clearTimeout(timer);
  }
  timer = setTimeout(
    function(){
      $("#home_link").trigger("click");
    },
    300000
  ); //pause for 5 minutes
}