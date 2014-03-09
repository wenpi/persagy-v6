define([
  'angular',
  'jquery',
  'text!/config.json',
  'jqueryMobile',
  'sagyChart',
  'app',
  'routes'
], function(ng, $, json) {
  'use strict';

  var domeready = function() {
    var $head_Menu = $("#head_Menu"),
      $head_navWrap = $(".head_navWrap"),
      $navList = $(".navList"),
      isFull = false;
    $head_navWrap.on("mouseenter", function() {
      $navList.stop(true, true).animate({
        left: "0px"
      }, 50);
    }).on("mouseleave", function() {
      if (isFull) {} else {
        $navList.stop(true, true).animate({
          left: "-100px"
        }, 100);
      }
    });
    $navList.on("mouseenter", function() {
      isFull = true;
      $navList.stop(true, true).animate({
        width: "240px"
      }, 30);
    });
    $head_Menu.on("tap", function(e) {
      e.stopPropagation();
      if (isFull) {
        isFull = false;
        $navList.stop(true, true).animate({
          left: "-250px"
        }, 100, function() {
          $navList.css("width", "100px");
        });
      } else {
        isFull = true;
        $navList.stop(true, true).animate({
          width: "240px",
          left: "0px"
        }, 30);
      }
    });
    $(document).on("tap", function(e) {
      var thatParents = $(e.target).parents(),
        nothas = false;
      for (var i = 0; i < thatParents.length; i++) {
        if (thatParents[i].className == "head_navWrap") {
          nothas = true;
        } else {}
      }
      console.log(nothas);
      if (!nothas && isFull) {
        isFull = false;
        $navList.stop(true, true).animate({
          left: "-250px"
        }, 100, function() {
          console.log("true");
          $navList.css("width", "100px");
        });
      }
    });
  };
  console.log(JSON.parse(json));
  ng.element().ready(function() {
    domeready();
    ng.bootstrap(document, ['app']);
  });
});
