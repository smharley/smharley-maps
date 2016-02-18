$(function () {
  var $trigger = $("[data-layer-nav-trigger]");
  var $nav = $("[data-layer-nav]");

  $trigger.on("click", function (e) {
    e.preventDefault();
 
    $(this).toggleClass("header-nav-button--active");
    $nav.toggleClass("layer-nav--active");
  });
});
