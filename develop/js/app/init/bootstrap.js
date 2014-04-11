define([
  'jquery',
  'angular',
  'config',
  'jqueryMobile',
  'sagyChart',
  'app'
], function($, ng, _config) {
  'use strict';
  var user = JSON.parse($("#user_info").val());
  var config = {};
  if (user.is_single) {
    config = _config.single_building[user.body_sign];
  } else {
    config = _config.multi_building;
  }
  if (!config) {
    alert('配置文件有误,检查是否配置multi_building和single_building下的单楼项!');
  }
  var styles = '<style>.nav_option li:hover div.o_ico span{background:' +
    config.theme_color +
    ';}' +
    '#head_Menu{background-color:' +
    config.theme_color +
    ';}' +
    '.widget .widget_name em{background:' +
    config.theme_color +
    ';}' +
    '</style>';
  var tab_title = $('title').text();
  if (!tab_title) {
    $('title').text(config.tab_title);
  }
  var title = $('#head_title span').text();
  if (title) {
    if (user.building_sign) {
      title = _config.single_building[user.building_sign].title + ' > ' + title;
    }
    title = config.title + ' > ' + title;
  } else {
    title = config.title;
  }
  $('#head_title span').text(title);
  $('head').append(styles);


  var domeready = function() {
    var $head_Menu = $("#head_Menu"),
      $head_navWrap = $(".head_navWrap"),
      $navList = $(".navList"),
      $navOptionLi = $("#nav ul li"),
      isFull = false,
      $BuildingChoose = $(".BuildingChoose");
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
      $navList.stop(true).animate({
        width: "240px",
        left: "0px"
      }, 200);
    });
    $head_Menu.on("tap", function(e) {
      e.stopPropagation();
      if (isFull) {
        isFull = false;
        $(".BuildingChoose").hide();
        $nav_Bmore.removeClass("b_moreCur");
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

      for (var i = 0; i < thatParents.length; i++) {
        if (thatParents[i].id == "head_navWrap") {
          nothas = true;
        } else {}
      }

      if (!nothas && isFull) {
        isFull = false;
        $head_Menu.removeClass("head_MenuCur");
        $BuildingChoose.hide();
        $nav_Bmore.removeClass("b_moreCur");
        $navList.stop(true, true).animate({
          left: "-250px"
        }, 200, function() {
          $navList.css("width", "100px");
        });
      }
    });

    // build more
    var $nav_Bmore = $(".nav_building .b_more ");
    $nav_Bmore.on("tap", function() {
      var hasMore = $nav_Bmore.hasClass("b_moreCur");

      if (hasMore) {
        $(this).removeClass("b_moreCur");
        $(".BuildingChoose").hide();
      } else {
        var moreTop = $(".nav_building").offset().top - $(document).scrollTop();
        $(".BuildingChoose").css("top", moreTop - 155);
        $(this).addClass("b_moreCur");
        $(".BuildingChoose").show();
        var $findOneSlide = $(".nav_build_Dwrap>div").eq(0);
        $findOneSlide.find("div.n_option_main").slideDown("fast");
        $findOneSlide.find("div.o_arr").addClass("o_arrCur");
      }

    });
    //导航下 建筑列表下拉
    var $navBuild_titlePull = $(".navBuild_title span.b_normal");
    $navBuild_titlePull.on("tap", function() {
      var hasPull = $(this).hasClass("pull");
      if (hasPull) {
        $navBuild_titlePull.removeClass("pull");
        $(".nav_building .nav_o2").slideUp("slow");
      } else {
        $navBuild_titlePull.addClass("pull");
        $(".nav_building .nav_o2").slideDown("slow");
      }
    });
    $(window).scroll(function() {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 200) {
        $("#hrefTop").show();
      } else {
        $("#hrefTop").hide();
      }
    });
    // 更多建筑 自选项下拉
    // var $b_optionName = $(".option_head .b_optionName");
    // $b_optionName.on("tap", function() {
    //   var $thisParentNext = $(this).parent().next(".build_Tname"),
    //     thisHidden = $thisParentNext.is(":hidden");
    //   console.log($thisParentNext);
    //   console.log(thisHidden);
    //   if (thisHidden) {
    //     $(this).children("div.o_arr").addClass("o_arrCur");
    //     $thisParentNext.slideDown();
    //   } else {
    //     $(this).children("div.o_arr").removeClass("o_arrCur");
    //     $thisParentNext.slideUp();
    //   }
    // });
    //建筑类型排序
    var $buildC_select = $(".buildC_select"),
      // $C_selectText = $(".buildC_select .C_selectText"),
      $build_name = $("#build_name"),
      $s_down_bar = $(".buildC_select span.s_down_bar");
    // var $build_nameLi = $("#build_name li");
    $buildC_select.on("tap", function() {
      // $build_nameLi = $("#build_name li");

      var selectIsPull = $s_down_bar.hasClass("s_down_barCur");

      if (selectIsPull) {
        $s_down_bar.removeClass("s_down_barCur");
        $build_name.slideUp();
      } else {
        $s_down_bar.addClass("s_down_barCur");
        $build_name.slideDown();
      }
    });
    var $build_search = $("#build_search");
    $build_search.on("keyup", function() {
      var thisVal = $build_search.val();
      if (thisVal !== "") {
        $(".buildC_body .nav_build_Dwrap").hide();
        $(".buildC_body .nav_build_Dwrap_search").show();
      } else {
        $(".buildC_body .nav_build_Dwrap_search").hide();
        $(".buildC_body .nav_build_Dwrap").show();
      }
    });

    $("#head_right .h_CallPolice").on("tap", function() {
      $("#header .CallPolice_tips").toggle();
    });

  };

  var initAngular = function() {
    ng.bootstrap(document, ['app']);
  };

  var initNgDoms = function(config) {
    //init data arrs
    var rows_length = config.rows_length,
      dataArrs = [],
      tableArr = [],
      widgets = config.widgets,
      i = 0,
      j = 0,
      key,
      item;
    for (i = 0; i < rows_length; i++) {
      dataArrs.push([null, null, null, null]);
    }
    for (key in widgets) {
      item = widgets[key];
      item.data_name = key;
      dataArrs[item.row - 1][item.column - 1] = item;
    }
    //init table
    for (i = 0; i < dataArrs.length; i++) {
      item = dataArrs[i];
      tableArr.push('<tr>');
      for (j = 0; j < item.length; j++) {
        if (item[j]) {
          tableArr.push('<td ');
          tableArr.push('colspan="' + item[j].width + '" ');
          tableArr.push('rowspan="' + item[j].height + '" ');
          tableArr.push('data-name="' + item[j].data_name + '" ');
          tableArr.push(item[j].type);
          tableArr.push('><div class="widget_loading"></div></td>');
        }
      }
      tableArr.push('</tr>');
    }
    $('.py_table').append(tableArr.join(''));
    setTimeout(initAngular, 0);
  };

  ng.element().ready(function() {
    domeready();
    initNgDoms(config);
  });
});
