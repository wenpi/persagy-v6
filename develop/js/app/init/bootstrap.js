define([
  'angular',
  'jquery',
  'text!../../../config.json',
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
      $navOptionLi = $("#nav ul li"),
      isFull = false;
    $head_navWrap.on("vmouseover", "", function() {
      $navList.stop(true, true).animate({
        left: "0px"
      }, 300);
      $head_Menu.addClass("head_MenuCur");
    }).on("vmouseout", function() {
      if (isFull) {} else {
        $navList.stop(true).animate({
          left: "-105px",
          width: "100px"
        }, 300);
        $head_Menu.removeClass("head_MenuCur");
      }
      $navOptionLi.removeClass("optionSelect");
    });
    $navList.on("vmouseover", function() {
      isFull = true;
      $navList.stop(true, true).animate({
        width: "240px",
        left: "0px"
      }, 200);
    });
    $head_Menu.on("tap", function(e) {
      e.stopPropagation();
      if (isFull) {
        isFull = false;
        $navList.stop(true, true).animate({
          left: "-250px"
        }, 200, function() {
          $navList.css("width", "100px");
        });
      } else {
        isFull = true;
        $navList.stop(true, true).animate({
          width: "240px",
          left: "0px"
        }, 200);
      }
    });
    $(document).on("tap", function(e) {
      var thatParents = $(e.target).parents(),
        nothas = false;
      $head_Menu.removeClass("head_MenuCur");
      for (var i = 0; i < thatParents.length; i++) {
        if (thatParents[i].className == "head_navWrap") {
          nothas = true;
        } else {}
      }
      if (!nothas && isFull) {
        isFull = false;
        $navList.stop(true, true).animate({
          left: "-250px"
        }, 200, function() {
          console.log("true");
          $navList.css("width", "100px");
        });
      }
    });
  };

  var initInfo = function() {
    var config = JSON.parse(json);
    var styles = '<style>.nav_option li:hover div.o_ico span{background:' +
      config.theme_color +
      ';}' +
      '#head_Menu{background-color:' +
      config.theme_color +
      ';}' +
      '</style>';
    $('title').text(config.title || '博锐尚格五代基本页');
    $('head').append(styles);
  };

  console.log(JSON.parse(json));

  ng.element().ready(function() {
    domeready();
    initInfo();
    ng.bootstrap(document, ['app']);
  });
});
