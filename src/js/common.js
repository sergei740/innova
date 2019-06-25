"use strict";

import "./../scss/common.scss";
import SVGInjector from "svg-injector";
import "slick-carousel";
import "magnific-popup";
import "jquery-mask-plugin";
import "jquery-validation";

import "hamburgers";
// import '../libs/plugin-name.js';

const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar-list");
const header = document.getElementById("myHeader");
const sticky = header.offsetTop;

// Validation methods
$.validator.addMethod(
  "nameonly",
  function(value, element) {
    return (
      this.optional(element) ||
      /^[A-Za-zА-ЯҐЄІЇа-яґєії][A-Za-zА-ЯҐЄІЇа-яґєії\'\’\-]+([ A-Za-zА-ЯҐЄІЇа-яґєії][A-Za-zА-ЯҐЄІЇа-яґєії\'\’\-]|\s+)*$/i.test(
        value
      )
    );
  },
  "Letters only please"
);

$.validator.addMethod(
  "phonenum",
  function(value, element) {
    var onlynumber = value.replace(/[^0-9]/g, "");
    return (
      this.optional(element) ||
      (onlynumber.length == 12 && onlynumber.match(/^[0-9]{12}$/))
    );
  },
  "Phone number too short"
);

var ProjFuncs = {
  slider: function() {
    /// Media
    const slider = document.querySelector("#slider");
    window.addEventListener("resize", () => {
      window.innerWidth <= 1279 ? slider.classList.remove("slider") : null;
    });

    /// Slider
    $(".slider").slick({
      autoplay: false,
      autoplaySpeed: 3000,
      arrows: true,
      prevArrow: `<div class="btn-scroll-down slick-prev-btn-position" style='background-image: url("../../assets/img/icon-btn-bg-metal.png")'>
							<div class="btn-sircle">
								<div class="btn-arrow btn-arrow-left"></div>
							</div>
						</div>`,
      nextArrow: `<div class="btn-scroll-down slick-next-btn-position" style='background-image: url("../../assets/img/icon-btn-bg-metal.png")'>
							<div class="btn-sircle">
								<div class="btn-arrow btn-arrow-right"></div>
							</div>
						</div>`,
      responsive: [
        {
          breakpoint: 1900,
          settings: {
            arrows: false,
            dots: true
          }
        }
      ]
    });
  },
  hamburger: function() {
    hamburger.addEventListener("click", function() {
      hamburger.classList.toggle("is-active");
      navbar.classList.toggle("navbar-list-hamburger");
    });
  },
  toggleItems: function() {
    const items = document.querySelectorAll(".item");
    const itemsCards = document.querySelectorAll(".item-card");

    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener("click", function() {
        this.classList.toggle("active");
      });
    }

    for (let i = 0; i < itemsCards.length; i++) {
      itemsCards[i].addEventListener("click", function() {
        this.classList.toggle("active");
      });
    }
  },
  gallery: function() {
    $(".test-popup-link").magnificPopup({
      type: "image",
      gallery: {
        enabled: true
      }
    });
  },
  scrollTo: function() {
    $(".scrollto-js").on("click", "a", function(event) {
      hamburger.classList.remove("is-active");
      navbar.classList.remove("navbar-list-hamburger");
      event.preventDefault();
      var offset = $("header").height(),
        id = $(this).attr("href"),
        top = $(id).offset().top - offset;
      $("body,html").animate({ scrollTop: top }, 600);
    });
  },
  phoneMask: function() {
    if ($('input[type="tel"]').length) {
      $('input[type="tel"]').mask("+38 (000) 000 00 00");
    }
  },
  validation: function() {
    $("#callMePopupForm").validate({
      ignore: "",
      rules: {
        name: {
          required: true,
          nameonly: true,
          maxlength: 255
        },
        telephone: {
          required: true,
          phonenum: true
        },
        checkbox: {
          required: true
        }
      },
      errorPlacement: function(label, element) {
        element.closest(".validate-js").append(label);
      },
      submitHandler: function(form) {
        var $form = $(form);

        $form.find('button[type="submit"]').prop("disabled", true);

        $.ajax($form.attr("action"), {
          type: $form.attr("method"),
          data: $form.serialize(),
          success: function(res) {
            console.log("Submission was successful.");

            $form.find('button[type="submit"]').prop("disabled", false);

            $form.addClass("success");

            return false;
          },
          error: function() {
            console.log("Error sending data.");

            $form.find('button[type="submit"]').prop("disabled", false);

            $form.addClass("error");
          }
        });

        return false;
      }
    });

    $("#feedBackPopupForm").validate({
      ignore: "",
      rules: {
        name: {
          required: true,
          nameonly: true,
          maxlength: 255
        },
        telephone: {
          required: true,
          phonenum: true
        },
        checkbox: {
          required: true
        }
      },
      errorPlacement: function(label, element) {
        element.closest(".validate-js").append(label);
      },
      submitHandler: function(form) {
        var $form = $(form);

        $form.find('button[type="submit"]').prop("disabled", true);

        $.ajax($form.attr("action"), {
          type: $form.attr("method"),
          data: $form.serialize(),
          success: function(res) {
            console.log("Submission was successful.");

            $form.find('button[type="submit"]').prop("disabled", false);

            $form.addClass("success");

            return false;
          },
          error: function() {
            console.log("Error sending data.");

            $form.find('button[type="submit"]').prop("disabled", false);

            $form.addClass("error");
          }
        });

        return false;
      }
    });
  },
  popups: function() {
    $(".popup").each(function() {
      var _this = $(this);
      _this.on("click", "[data-popup-close]", function(e) {
        e.preventDefault();
        closePopup(_this.attr("id"));
      });
    });

    $("[data-popup-open]").on("click", function(e) {
      e.preventDefault();

      var _this = $(this);
      showPopup(_this.attr("data-popup-open"));
    });

    $(document).on("click", function(e) {
      var $target = $(e.target);
      if ($target.is(".popup")) {
        closePopup($target.attr("id"));
      }
    });
  },
  progress: function() {
    window.addEventListener("scroll", e => {
      let scrollTop = document.documentElement.scrollTop;
      let scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      let progress = (100 * scrollTop) / scrollHeight;
      let height = document.querySelector("#myHeader").clientHeight;
      document.querySelector(".progress").style.top = height + "px";
      document.querySelector(".progress").style.width = progress + "%";
    });
  },
  addAndDeleteID: function() {
    const firstElem = document.querySelector(
      ".section-list-of-consulting-services"
    );
    const secondElem = document.querySelector(
      ".section-list-of-consulting-services-small"
    );
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 1279) {
        firstElem.removeAttribute("id");
		secondElem.setAttribute("id", 'services');
		console.log(firstElem);
		console.log(secondElem);
      } else if (window.innerWidth >= 1280) {
        secondElem.removeAttribute("id");
		firstElem.setAttribute("id", "services");
		console.log(secondElem);
		console.log(firstElem);
      }
    });
  },
  init: function() {
    myFunction();

    if ($("img.inject-me").length) {
      var mySVGsToInject = document.querySelectorAll("img.inject-me");
      SVGInjector(mySVGsToInject);
    }

    this.slider();
    this.hamburger();
    this.toggleItems();
    this.gallery();
    this.scrollTo();
    this.phoneMask();
    this.validation();
    this.popups();
	this.progress();
	this.addAndDeleteID();
  }
};

$(document).ready(function() {
  ProjFuncs.init();
});

window.onscroll = function() {
  myFunction();
};

function showPopup(id) {
  if (id.substring(0, 1) != "#") {
    id = "#" + id;
  }
  $(id).scrollTop(0);

  $(id)
    .css("opacity", "")
    .addClass("is-active");

  $("body").addClass("overflow-hidden");
}

function closePopup(id) {
  if (id.substring(0, 1) != "#") {
    id = "#" + id;
  }
  $(id).removeClass("is-active success error");
  $("body").removeClass("overflow-hidden");
}

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
