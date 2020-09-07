//Registration
// In page events:
$$(document).on('page:init', function (e, page) {
 
  if(page.route.name == "home"){


    var swiper = new Swiper('.swiper-container', {
      speed: 500,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets'

        }
    });
   // var swiper = app.swiper.get('.swiper-container');
    $(".slider-next").on("click",function(){
      
      swiper.slideNext();
      // alert(swiper.activeIndex);
      if(swiper.activeIndex == 2){
        $(".slider-next-last").show();
        $(".slider-next").hide();
      }else{
        $(".slider-next-last").hide();
        $(".slider-next").show();
      }
    });


    swiper.on('slideChange', function () {

      if(swiper.activeIndex == 2){
        $(".slider-next-last").show();
        $(".slider-next").hide();
      }else{
        $(".slider-next-last").hide();
        $(".slider-next").show();
      }
    });

  }


  if(page.route.name == "review-booking-detail"){

    $$('.open-login').on('click', function () {
      app.dialog.login('Enter Promo Code', function () {
      
      });
    });

  }


  if(page.route.name == "home-cleaning-form1"){

    $$('.popup-about').on('popup:open', function (e, popup) {
      console.log('About popup open');
    });

  }


  if(page.route.name == "home-cleaning-form2"){

    $$('.popup-about').on('popup:open', function (e, popup) {
      console.log('About popup open');
    });

  }


  if(page.route.name == "myaccount"){


    var language_name = document.getElementById("myP").dir;
    $('.lang').each(function(index, element){
        $(this).text(arrLang[language_name][$(this).attr('key')]);
    });
   
    $$(".logout-account").on('click', function(){
      
      if(confirm("Are you sure you want to logout?")){

        localStorage.clear();
        localStorage.setItem("first_open_app_page","1");
        mainView.router.navigate({ name: 'index' });

      }
      

    })

  }

  if(page.route.name == "categories"){


    var language_name = document.getElementById("myP").dir;
    $('.lang').each(function(index, element){
        $(this).text(arrLang[language_name][$(this).attr('key')]);
    });


  }

  if(page.route.name == "support"){


    var language_name = document.getElementById("myP").dir;
    $('.lang').each(function(index, element){
        $(this).text(arrLang[language_name][$(this).attr('key')]);
    });


  }

  if(page.route.name == "job"){


    var language_name = document.getElementById("myP").dir;
    $('.lang').each(function(index, element){
        $(this).text(arrLang[language_name][$(this).attr('key')]);
    });


  }


  //

  if(page.route.name == "myaccountAddCreditCard"){

      
      var today = new Date();
      var pickerInline = app.picker.create({
        inputEl: '#cardExpiry',
        rotateEffect: true,
        formatValue: function (values, displayValues) {
          return displayValues[0] + ',' + values[1];
        },
        cols: [
          // Months
          {
            values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
            displayValues: ('01 02 03 04 05 06 07 08 09 10 11 12').split(' '),
            textAlign: 'left'
          },
          // Years
          {
            values: (function () {
              var arr = [];
              for (var i = 21; i <= 50; i++) { arr.push(i); }
                return arr;
            })(),
            displayValues: (function () {
              var arr = [];
              for (var i = 2021; i <= 2050; i++) { arr.push(i); }
                return arr;
            })()
          },
          // Space divider
          {
            divider: true,
            content: '&nbsp;&nbsp;'
          }
        ],
        on: {
          change: function (picker, values, displayValues) {
            var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
            if (values[1] > daysInMonth) {
              picker.cols[1].setValue(daysInMonth);
            }
          },
        }
      });

  }




  if(page.route.name == "editProfile"){

    getcitylist();
    // Set values to form
    $("#first_name").val(localStorage.getItem("name"));
    $("#last_name").val(localStorage.getItem("last_name"));
    $("#email").val(localStorage.getItem("email"));
    $("#phone_no").val(localStorage.getItem("mobile"));
    $("#city").val(localStorage.getItem("city_id"));
    $("#area").val(localStorage.getItem("area"));
    $("#building_street").val(localStorage.getItem("street"));
    $("#villa").val(localStorage.getItem("villa"));


    $$("#update_profile_button").on('click', function(){
      
      
      var form = {
              "customer_id":localStorage.getItem("id"),
              "first_name":$("#first_name").val(),
              "last_name":$("#last_name").val(),
              "email":$("#email").val(),
              "phone":$("#phone_no").val()
          };


      var settings = {
      "url": APIURL+"api/user/update_profile",
      "method": "POST",
      "timeout": 0,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false,
      "data": JSON.stringify(form)
    
    };

    app.preloader.show();
    $.ajax(settings).done(function (response) {

      app.preloader.hide();
      app.dialog.alert('Profile updated successfully!', 'Success'); 
    });

    })

  }

  function getcitylist(){

      var settings = {
        "url": "https://test.zamkanapp.com/api/data/cities/",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false
        
      };
      
      $.ajax(settings).done(function (response) {
        
          respon = JSON.parse(response);
                  
          if(respon[0] == false){

            app.dialog.alert(respon[1],"No Cities!");
            return;

          }else{
            localStorage.setItem('city-list', response);
            var respData = respon[1];
            var optionHtml = ''; 
            var optionSelected = ''; 
            for (var i = 0; i < respData.length; i++) {
              if (localStorage.getItem("city_id")!='' || localStorage.getItem("city_id")!=null || localStorage.getItem("city_id")!=undefined) {
                 optionSelected = (respData[i].id == localStorage.getItem("city_id"))?'selected':'';
              }
              optionHtml += '<option '+optionSelected+' value="'+respData[i].id+'">'+respData[i].name+'</option>';
          
            }

            $('.updatecitylist').html(optionHtml);

          }
          
      });
    }



});

