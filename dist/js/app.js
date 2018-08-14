
"use strict";

var sliderWhatSayingPeople;
var sliderWhatSayingPeopleMobile;
var sliderTeam;
var sliderAdvisors;
var optSlider = {
  height: 380,
  loop: true,
  nextButton: ".swiper-button-next",
  prevButton: ".swiper-button-prev"
};

var page = {
  init: function () {

    $(window).scroll(function () {
      if (!$("body").hasClass('header-no-scroll')) {
        page.scrollPage();
      }
    });

    if (!$("body").hasClass('header-no-scroll')) page.scrollPage();

    if (!$("body").hasClass('header-no-scroll')) {
      $.scrollIt({
        upKey: 38,
        downKey: 40,
        easing: "linear",
        scrollTime: 600,
        activeClass: "nav__active",
        onPageChange: null,
        topOffset: -100
      });
    }

    $(".header__menu-mobile").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $(".overlay").addClass("open");
    });

    $(".overlay-close").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $(".overlay").removeClass("open");
    });

    $('.overlay ul li a').on('click', function () {
      $(".overlay-close").trigger('click');
    });

    $('.accordion').on('click', '.accordion__header', function (e) {
      var $box = $(this).parent();
      if (!$box.hasClass('open'))
        $box.addClass('open').siblings('.accordion__wrap').removeClass('open');
      else
        $box.removeClass('open');
    });

    if ($('.solution__video-code').length)
      page.video();

  },
  scrollPage: function () {
    var $body = $("body");
    var offset = 0;

    if ($(window).scrollTop() > offset) {
      $body.addClass("fixed-header");
    } else {
      $body.removeClass("fixed-header");
    }
  },
  slidersInit: function () {
    if (window.innerWidth < 768) {
      if (typeof sliderTeam === "undefined")
        sliderTeam = new Swiper(".swiper-team", optSlider);

      if (typeof sliderAdvisors === "undefined")
        sliderAdvisors = new Swiper(".swiper-advisors", optSlider);

    } else {
      if (typeof sliderTeam !== "undefined") {
        sliderTeam.destroy();
        sliderTeam = undefined;
        $(".swiper-team")
          .find(".swiper-wrapper, .swiper-slide")
          .removeAttr("style");
      }

      if (typeof sliderAdvisors !== "undefined") {
        sliderAdvisors.destroy();
        sliderAdvisors = undefined;
        $(".swiper-advisors")
          .find(".swiper-wrapper, .swiper-slide")
          .removeAttr("style");
      }

    }

    if (typeof sliderWhatSayingPeople === "undefined") {
      sliderWhatSayingPeople = new Swiper(".what-saying-people__slider", {
        spaceBetween: 50,
        slidesPerView: 3,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        breakpoints: {
          1100: {
            spaceBetween: 30
          },
          991: {
            spaceBetween: 25,
            slidesPerView: 2
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 0
          }
        },
        nextButton: ".what-saying-people__button-next",
        prevButton: ".what-saying-people__button-prev"
      });
    }
  },
  video: function () {
    var optionsVideo = {

    }
    plyr.setup([
      document.querySelector('.js-player-1')
    ], optionsVideo);
  },
  parallaxSection: function () {
    $('.parallax-section').parallax({
      speed: 0.8
    });
  }
};

jQuery(document).ready(function ($) {
  page.init();

  if ($(".swiper-container").length) {
    $(window).resize(function () {
      page.slidersInit();
    });

    page.slidersInit();
  }
  //page.parallaxSection();
});
