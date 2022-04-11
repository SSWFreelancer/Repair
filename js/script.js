const slider = document.getElementById('slider');

noUiSlider.create(slider, {

    start: [20],
    connect: [true,false],
    padding: [0,0],
    step: 1,
    range: {
        'min': [1],
        'max': [250]
    },
});
var directionField = document.getElementById('slider-margin-value');
slider.noUiSlider.on('update', function (values, handle) {
    directionField.innerHTML = parseFloat(values[handle]);
    $('.hidden').val(values[handle])
});


$(document).ready(function () {
   $('.reviews__slider').slick({
      arrows: true,
      dots: true,
      adaptiveHeight: true,
      slidesToShow: 1,
      speed: 1000,
      easing: 'ease-in',
      infinite: false,
      autoplay: false,
      autoplaySpeed: 2000,
      pauseOnFocus: true,
      pauseOnHover: true,
      pauseOnDotsHover: true,
      draggable: true,
      swipe: true,
      touchThreshold: 5,
   });  
   $('.video-reviews__slider').slick({
      arrows: true,
      dots: false,
      slidesToShow: 1,
      centerMode: true,
      centerPadding: '500px',
      responsive: [
        {
          breakpoint: 1780,
          settings: {
             centerPadding: '300px',
          }
        },
        {
          breakpoint: 1440,
          settings: {
             centerPadding: '200px',
          }
        }, 
        {
          breakpoint: 1174,
          settings: {
             centerPadding: '50px',
          }
        },
        {
          breakpoint: 821,
          settings: {
             centerPadding: '0px',
          }
        },                          
    ]
   });    
});

$(document).ready(function () {
   $(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
        if(scroll>10){
            $('.header').addClass('scroll');
        }else{
            $('.header').removeClass('scroll');
        }
    });    
   $('.header__burger').click(function (event) {
      $('.header__burger, .menu').toggleClass('active');
       $('body').toggleClass('lock');
        
   });
    $('.menu__link').click(function (event) {
      $('.header__burger, .menu').removeClass('active');
       $('body').removeClass('lock');
   });  
});

$(document).ready(function () {
    $('.form-main__rangeslider').mouseenter(function (event) {
        $('#slider-margin-value').addClass('active');
    });
    $('.form-main__rangeslider').mouseleave(function (event) {
        $('#slider-margin-value').removeClass('active');
    });        
    $('.tabs__item').click(function (event) {
          $(this).addClass('active');
          $(".tabs__item").not(this).removeClass('active');
    });    
    $('.tabs__item-1').click(function(event){
        $('#tab_01').addClass('target');
        $('#tab_02').removeClass('target');
        $('#tab_03').removeClass('target');
        $('#tab_04').removeClass('target');      

    });
    $('.tabs__item-2').click(function(event){
        $('#tab_02').addClass('target');
        $('#tab_01').removeClass('target');
        $('#tab_03').removeClass('target');
        $('#tab_04').removeClass('target');
    });
    $('.tabs__item-3').click(function(event){
        $('#tab_03').addClass('target');
        $('#tab_01').removeClass('target');
        $('#tab_02').removeClass('target');
        $('#tab_04').removeClass('target');        
    });
    $('.tabs__item-4').click(function(event){
        $('#tab_04').addClass('target');
        $('#tab_01').removeClass('target');
        $('#tab_03').removeClass('target');
        $('#tab_02').removeClass('target');         
    }) ;         
});

$(document).ready(function () {
   $('.block__title').click(function(event){
      if($('.spoilers__block').hasClass('one')){
         $('.block__title').not($(this)).removeClass('active');
         $('.block__text').not($(this).next()).slideUp(300);
      }
      $(this).toggleClass('active').next().slideToggle(300);
   });
});


YaMapsShown = false; 
$(document).ready(function (){
 $(window).scroll(function() {
    if (!YaMapsShown){
     if($(window).scrollTop() + $(window).height() > $(document).height() - 700) {      
      showYaMaps();
      YaMapsShown = true;
     }
    }
 });
 
});

function showYaMaps(){
 var script   = document.createElement("script");
 script.type  = "text/javascript";
 script.src   = "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A62f5ac295d0397dbe5bad816e5e7e31a52ce00989d2ada6da4866beaebde30b8&amp;width=100%&amp;height=100%&amp;lang=ru_RU&amp;scroll=true";
 document.getElementById("map").appendChild(script);
}

function send(event, php){
console.log("Отправка запроса");
event.preventDefault ? event.preventDefault() : event.returnValue = false;
var req = new XMLHttpRequest();
req.open('POST', php, true);
req.onload = function() {
  if (req.status >= 200 && req.status < 400) {
    json = JSON.parse(this.response); // Ебанный internet explorer 11
      console.log(json);
        
      // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
      if (json.result == "success") {
        // Если сообщение отправлено
        document.location.href='index.html'
      } else {
        // Если произошла ошибка
        alert("Ошибка. Сообщение не отправлено");
      }
    // Если не удалось связаться с php файлом
    } else {alert("Ошибка сервера. Номер: "+req.status);}}; 

// Если не удалось отправить запрос. Стоит блок на хостинге
req.onerror = function() {alert("Ошибка отправки запроса"); 
  
};
req.send(new FormData(event.target));
}

$(document).ready(function () {
      $('.button').click(function (event) {
         $('.popup').addClass('open');
         $('body').addClass('lock');
      });
      $('.popup span').click(function (event) {
         $('.popup').removeClass('open');
         $('body').removeClass('lock');
      });      
});