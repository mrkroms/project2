$(document).ready(function () {
  $(".carousel__inner").slick({
    speed: 1000,
    adaptiveHeight: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src = "icons/left.svg"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src = "icons/right.svg"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: true,
          arrows: false,
        },
      },
    ],
  });
  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content_active")
        .eq($(this).index())
        .addClass("catalog__content_active");
    }
  );

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content")
          .eq(i)
          .toggleClass("catalog-item__content_active");
        $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
      });
    });
  }

  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");

  // modal window jquery
  $("[data-modal = consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn();
  });
  //   $("[data-modal = buy]").on("click", function () {
  //     $(".overlay, #order").fadeIn();
  //   });
  // кнопка купить с изменением subtitle в зависимости от того какой пульсометр выбираем
  $("[data-modal = buy]").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn();
    });
  });

  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #order, #thanks").fadeOut();
  });

  // валидация форм с помощью плагина.

  //   $("#consultation-form").validate();
  // в id consultation есть form, к ней применяем rules(позволяет настраивать каждое поле под определенные правила)
  //   $("#consultation form").validate({
  //     rules: {
  //       name: "required",
  //       phone: "required",
  //       email: {
  //         required: true,
  //         email: true,
  //       },
  //     },
  //     messages: {
  //       name: "Пожалуйста, введите ваше имя",
  //       phone: "Пожалуйста, введите ваш номер телефона",
  //       email: {
  //         required: "Пожалуйста, введите вашу почту",
  //         email: "Ваша почта должна быть в таком формате: name@domain.com",
  //       },
  //     },
  //   });
  //   $("#order form").validate();
  function validForms(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: "Пожалуйста, введите ваше имя",
        phone: "Пожалуйста, введите ваш номер телефона",
        email: {
          required: "Пожалуйста, введите вашу почту",
          email: "Ваша почта должна быть в таком формате: name@domain.com",
        },
      },
    });
  }
  validForms("#consultation-form");
  validForms("#consultation form");
  validForms("#order form");

  // маска ввода номера с помощью плагина. убираем type number в формах, чтоб это работало.
  $("input[name = phone]").mask("+7 (999) 999-9999");

  // smoth scroll and pageup
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });
  $("a[href^='#']").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });
});
