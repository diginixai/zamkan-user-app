//Dashboard
// In page events:
$$(document).on('page:init', function (e, page) {
  	var Latitude = undefined;
	  var Longitude = undefined;

// Get geo coordinates

function getMapLocation() {
    
    navigator.geolocation.getCurrentPosition
    (onMapSuccess, onMapError, { enableHighAccuracy: true });
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
            optionHtml+='<option value="0">--Select City--</option>';
            for (var i = 0; i < respData.length; i++) {
              optionHtml += '<option value="'+respData[i].id+'">'+respData[i].name+'</option>';
            }
            $('.citylist').html(optionHtml);

          }
          
      });
    }

// Success callback for get geo coordinates

var onMapSuccess = function (position) {

    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
    localStorage.setItem("lat",Latitude);
    localStorage.setItem("long",Longitude);
    getMap(Latitude, Longitude);

}

// Get map by using coordinates

function getMap(latitude, longitude) {

    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map
    (document.getElementById("map"), mapOptions);


    var latLong = new google.maps.LatLng(latitude, longitude);

    var marker = new google.maps.Marker({
        position: latLong
    });

    marker.setMap(map);
    map.setZoom(15);
    map.setCenter(marker.getPosition());
}

// Success callback for watching your changing position

var onMapWatchSuccess = function (position) {

    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;

    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

        Latitude = updatedLatitude;
        Longitude = updatedLongitude;

        localStorage.setItem("lat",Latitude);
	    localStorage.setItem("long",Longitude);

        getMap(updatedLatitude, updatedLongitude);
    }
}

// Error callback

function onMapError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

// Watch your changing position

function watchMapPosition() {

    return navigator.geolocation.watchPosition
    (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
}

getMapLocation();




  function getServices(){

  	/*
	**** Services list
  	*/
  var form = new FormData();
	var settings = {
	  "url": "https://test.zamkanapp.com/api/data/services/",
	  "method": "POST",
	  "timeout": 0,
	  "processData": false,
	  "mimeType": "multipart/form-data",
	  "contentType": false,
	  "data": form
	};
	app.preloader.show();
	$.ajax(settings).done(function (response) {
		// console.log(JSON.parse('{\n    \"form_type\": \"international-movers\",\n    \"first_name\": \"Nishant\",\n    \"last_name\":\"Pandey\",\n    \"mobile\":\"+919889797416\",\n    \"email\": \"nnishantsigra@gmail.com\",\n    \"adr1\": \"adr1\",\n    \"adr2\": \"adr2\",\n    \"date\":\"2020-07-30\",\n    \"city_id\": \"6\",\n    \"description\": \"test enquiry\",\n    \"service_provider\": [1,2,3,4,5,6],\n    \"meta\": {\n       \"type\": \"international\",\n       \"from_country\":\"UAE\",\n       \"from_address\":\"Flat123\",\n       \"from_country\": \"India\",\n       \"from_address\": \"Flat123,234,345345\",\n       \"date\":\"2020-07-30\",\n       \"move_size\":\"2 Bedroom Apartment\",\n       \"Handyman\":true,\n       \"storage\":true,\n       \"carshipping\":true,\n       \"detail\":\"please send me the quote asap\"\n   }\n   \n\n}'));
		app.preloader.hide();

	  response = JSON.parse(response);
	 // console.log(response.length);

	  // set up html
	  html = '';

	  if(response[0] == true){

	  	main_html = '<div class="title-latest-course">';
	  	for(var i in response[1])
	  	{

	  		subcat_html = '';
	  		cat_name = localStorage.getItem("lang_rotation") == "rtl" ? response[1][i].name_ar : response[1][i].name;
	  		for(var j in response[1][i].subcategory)
	  		{
	  			form_name = response[1][i].subcategory[j].identifier;
	  			
				sub_name = localStorage.getItem("lang_rotation") == "rtl" ? response[1][i].subcategory[j].name_ar : response[1][i].subcategory[j].name;
	  			subcat_html += '<div class="swiper-slide b-radius" style="width: 70%; margin-right: 10px;">'+
				               ' <a href="/'+form_name+'/">'+
				                  '<img src="https://test.zamkanapp.com'+response[1][i].subcategory[j].image+'" style="width: 100%; height: 130px; border-radius: 8px 8px 0px 0px;">'+
				                  '<div class="card-content">'+
				                    '<h6 class="base-color">'+sub_name+'</h6>'+
				                    '<p>'+sub_name+'</p>'+
				                  '</div>'+
				               ' </a>'+
				             ' </div>';
	  		}
	  		


	  		main_html += '<div class="item-title-row item-inner">'+
				          '<div class="content-heading">'+cat_name+'</div>'+
				      '</div>'+

				        '<div class="swiper-container swiper-one">'+
				        
				          '<div data-space-between="10" data-slides-per-view="1.5" class="swiper-container swiper-init demo-swiper">'+
				            '<div class="swiper-wrapper">'+

				              subcat_html+

				            '</div>'+
				          '</div>'+
				        '</div>';
	  	}

	  	
	  	main_html += '</div>';
	  	html = main_html;
	}
	  

		
		 $("#all-services").html(html);
		 if(localStorage.getItem("selected-location") != "" && localStorage.getItem("selected-location") != null && localStorage.getItem("selected-location") != undefined)
		    {
		        var getsetLocation = localStorage.getItem('selected-location');
		        $('#homelocation').html(getsetLocation);
		    }else{
		    	$('#homelocation').html('DUBAI');
		    }

	});
  }


  

  // navigator.app.exitApp();
  if(page.route.name == "index"){

  	//GET SERVICES
	  getServices();
  	// if (localStorage.getItem("lang_rotation") == 'rtl') {
  	// 	changelangrotate();
  	// }
  	
   
  $("#change-language").on("click", function(){ changelangrotate();	})
  function changelangrotate(){
  	
  		if (document.getElementById("myP").dir == "ltr") {

	      document.getElementById("myP").dir = "rtl";
	      $('.block').css("padding-right", "16px");
	      $('.block').css("padding-left", "0px");

	      localStorage.setItem("lang_rotation","rtl");


	    }else{
	        document.getElementById("myP").dir = "ltr";
	        localStorage.setItem("lang_rotation","ltr");
	        $('.block').css("padding-right", "0px");
	        $('.block').css("padding-left", "16px");
	    }

	    var language_name = document.getElementById("myP").dir;
        $('.lang').each(function(index, element){
            $(this).text(arrLang[language_name][$(this).attr('key')]);
        });
	    
	    getServices();

  }





  	////  LOGOUT
  	$$(".logout").on('click', function(){
  		
  		if(confirm("Are you sure you want to logout?")){

  			localStorage.clear();
	  		location.href = 'index.html';

  		}

  	})


  }


 if(page.route.name == "mooving-my-home"){ 

 	$$('.popup-address-google').on('popup:open', function (e) {
	  // alert('About popup open');
	  
	  getMapLocation();
	});
	$$('.popup-address').on('popup:open', function (e) {
	  // alert('About popup open');
	  $(".popup-address-google").hide();
	});


 	$("#clickNext").on("click", function(){

 		// console.log(objectifyForm($(".service-form").serializeArray()));
 		app.data.form_data = objectifyForm($(".service-form").serializeArray());
 		mainView.router.navigate({ name: 'review-booking-detail' });
 	});

 	var settings = {
      "url": APIURL+"api/profile/addresslist",
      "headers": {
				    "api": localStorage.getItem("api")
				  },
      "method": "POST",
      "timeout": 0,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false
    
    };
    app.preloader.show();
    $.ajax(settings).done(function (response) {
      app.preloader.hide();
        response = JSON.parse(response);
        add_html = '';
        
      	if(response[1].length > 0){
      		for(var i in response[1]){
      			add_html +=  '<div class="row">'+
		                        '<div class="col-75">'+
		                          '<input type="hidden" name="from_address" id="from_address" value="'+response[1][i].villa+', '+response[1][i].street+'">'+
		                          '<input type="hidden" name="from_country" id="from_country" value="'+response[1][i].city_id+'">'+
		                          '<h4 class="address-data no-margin">'+response[1][i].villa+'</h4>'+
		                          '<p class="all-address-data no-margin">'+response[1][i].villa+', '+response[1][i].street+'</p>'+

		                        '</div>'+
		                        '<div class="col-25">'+
		                          '<input type="radio" name="from_address_selected" class="radio">'+
		                        '</div>'+
		                      '</div>';
      		}
      		$(".address-card").show();
      		$("#all_address_list").html(add_html);
      	}
 		

    });






 	$(".save-new-address").on("click", function()/**/{

 		var address = $('#address').val();
 		var city = $('#city').val();
 		var area = $('#area').val();
 		var streetname = $('#streetname').val();
 		var apartment = $('#apartment').val();
 		var lat = localStorage.getItem("lat");
 		var long = localStorage.getItem("long");

 		if (address == '' || area == '') {
 			app.dialog.alert('This field is requied!', 'Alert');
 			return false;
 		}

 		// save to DB
 		var form = {
              "villa":apartment,
              "street":streetname,
              "area_id":area,
              "city_id":city,
              "lat":lat,
              "lng":long,
          };


      var settings = {
      "url": APIURL+"api/profile/addaddress",
      "headers": {
				    "api": localStorage.getItem("api")
				  },
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

      	var Address_array = [address,city,area,streetname,apartment];
 		localStorage.setItem('booking-address',Address_array);

 		response = JSON.parse(response);
 		add_html = '';
 		add_html_to = '';
 		if(response[1].length > 0){
      		for(var i in response[1]){
      			add_html +=  '<div class="row">'+
		                        '<div class="col-75">'+
		                          '<input type="hidden" name="from_address" id="from_address" value="'+response[1][i].villa+', '+response[1][i].street+'">'+
		                          '<input type="hidden" name="from_country" id="from_country" value="'+response[1][i].city_id+'">'+
		                          '<h4 class="address-data no-margin">'+response[1][i].villa+'</h4>'+
		                          '<p class="all-address-data no-margin">'+response[1][i].villa+', '+response[1][i].street+'</p>'+

		                        '</div>'+
		                        '<div class="col-25">'+
		                          '<input type="radio" name="from_address_selected" class="radio">'+
		                        '</div>'+
		                      '</div>';
      		}

      		for(var i in response[1]){
      			add_html_to +=  '<div class="row">'+
		                        '<div class="col-75">'+
		                          '<input type="hidden" name="from_address" id="from_address" value="'+response[1][i].villa+', '+response[1][i].street+'">'+
		                          '<input type="hidden" name="from_country" id="from_country" value="'+response[1][i].city_id+'">'+
		                          '<h4 class="address-data no-margin">'+response[1][i].villa+'</h4>'+
		                          '<p class="all-address-data no-margin">'+response[1][i].villa+', '+response[1][i].street+'</p>'+

		                        '</div>'+
		                        '<div class="col-25">'+
		                          '<input type="radio" name="to_address_selected" class="radio">'+
		                        '</div>'+
		                      '</div>';
      		}

      		$(".address-card").show();
      		$("#all_address_list").html(add_html);
      		$("#all_address_list_to").html(add_html_to);
      	}

    });

 		

 		// console.log(objectifyForm($(".service-form").serializeArray()));
 		// app.data.form_data = objectifyForm($(".service-form").serializeArray());

 		
 	});

 }


 if(page.route.name == "sanitize-service-form1"){ 

 	$$('.popup-address-google').on('popup:open', function (e) {
	  // alert('About popup open');
	  
	  getMapLocation();
	});
	$$('.popup-address').on('popup:open', function (e) {
	  // alert('About popup open');
	  $(".popup-address-google").hide();
	});



 	$("#clickNext").on("click", function(){

 		// console.log(objectifyForm($(".service-form").serializeArray()));
 		app.data.form_data = objectifyForm($(".service-form").serializeArray());
 		mainView.router.navigate({ name: 'review-booking-detail' });
 		
 	});

 	var settings = {
      "url": APIURL+"api/profile/addresslist",
      "headers": {
				    "api": localStorage.getItem("api")
				  },
      "method": "POST",
      "timeout": 0,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false
    
    };
    app.preloader.show();
    $.ajax(settings).done(function (response) {
      app.preloader.hide();
        response = JSON.parse(response);
        add_html = '';
        
      	if(response[1].length > 0){
      		for(var i in response[1]){
      			add_html +=  '<div class="row">'+
		                        '<div class="col-75">'+
		                          '<input type="hidden" name="from_address" id="from_address" value="'+response[1][i].villa+', '+response[1][i].street+'">'+
		                          '<input type="hidden" name="from_country" id="from_country" value="'+response[1][i].city_id+'">'+
		                          '<h4 class="address-data no-margin">'+response[1][i].villa+'</h4>'+
		                          '<p class="all-address-data no-margin">'+response[1][i].villa+', '+response[1][i].street+'</p>'+

		                        '</div>'+
		                        '<div class="col-25">'+
		                          '<input type="radio" name="from_address_selected" class="radio">'+
		                        '</div>'+
		                      '</div>';
      		}
      		$(".address-card").show();
      		$("#all_address_list").html(add_html);
      	}
 		

    });






 	$(".save-new-address").on("click", function()/**/{

 		var address = $('#address').val();
 		var city = $('#city').val();
 		var area = $('#area').val();
 		var streetname = $('#streetname').val();
 		var apartment = $('#apartment').val();
 		var lat = localStorage.getItem("lat");
 		var long = localStorage.getItem("long");

 		if (address == '' || area == '') {
 			app.dialog.alert('This field is requied!', 'Alert');
 			return false;
 		}

 		// save to DB
 		var form = {
              "villa":apartment,
              "street":streetname,
              "area_id":area,
              "city_id":city,
              "lat":lat,
              "lng":long,
          };


      var settings = {
      "url": APIURL+"api/profile/addaddress",
      "headers": {
				    "api": localStorage.getItem("api")
				  },
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

      	var Address_array = [address,city,area,streetname,apartment];
 		localStorage.setItem('booking-address',Address_array);

 		response = JSON.parse(response);
 		add_html = '';
 		if(response[1].length > 0){
      		for(var i in response[1]){
      			add_html +=  '<div class="row">'+
		                        '<div class="col-75">'+
		                          '<input type="hidden" name="from_address" id="from_address" value="'+response[1][i].villa+', '+response[1][i].street+'">'+
		                          '<input type="hidden" name="from_country" id="from_country" value="'+response[1][i].city_id+'">'+
		                          '<h4 class="address-data no-margin">'+response[1][i].villa+'</h4>'+
		                          '<p class="all-address-data no-margin">'+response[1][i].villa+', '+response[1][i].street+'</p>'+

		                        '</div>'+
		                        '<div class="col-25">'+
		                          '<input type="radio" name="from_address_selected" class="radio">'+
		                        '</div>'+
		                      '</div>';
      		}
      		$(".address-card").show();
      		$("#all_address_list").html(add_html);
      	}

    });

 		

 		// console.log(objectifyForm($(".service-form").serializeArray()));
 		// app.data.form_data = objectifyForm($(".service-form").serializeArray());

 		
 	});

 }

if(page.route.name == "deep-cleaning"){ 

    $('#prices').val($("input[name='stayhrs']:checked").attr('data-price'));
   $('.gridbutton').click(function(){
      $('#prices').val($(this).attr('data-price'));
   });
   getcitylist();
   $$('#city').on('change',function(){
       var id = $(this).val();
       var settings = {
              "url": APIURL+"api/data/area?id="+id,
              "method": "GET",
              "timeout": 0,
              "processData": false,
              "mimeType": "multipart/form-data",
              "contentType": false
            };
    $.ajax(settings).done(function (response) {
         respon = JSON.parse(response);
         var areaHtml = '';
         if(respon[0] == false){
           areaHtml +='<option value="0">--No Area--</option>';
          }else{
            var respData = respon[1];
            areaHtml +='<option value="0">--Select Area--</option>';
            for (var i = 0; i < respData.length; i++) {
                 areaHtml += '<option value="'+respData[i].areaId+'">'+respData[i].name+'</option>';
            } 
          }
          $('#area').html(areaHtml);
        });
     });

	$$('.popup-address-google').on('popup:open', function (e) {
	  // alert('About popup open');
	  
	  getMapLocation();
	});
	$$('.popup-address').on('popup:open', function (e) {
	  // alert('About popup open');
	  $(".popup-address-google").hide();
	});




 	$("#clickNext").on("click", function(){

 		// console.log(objectifyForm($(".service-form").serializeArray()));
    app.data.form_data = objectifyForm($(".service-form").serializeArray());
    console.log(app.data.form_data);
 		mainView.router.navigate({ name: 'review-booking-detail' });
 		
 	});

 	var settings = {
      "url": APIURL+"api/profile/addresslist",
      "headers": {
				    "api": localStorage.getItem("api")
				  },
      "method": "POST",
      "timeout": 0,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false
    
    };
    app.preloader.show();
    $.ajax(settings).done(function (response) {
      app.preloader.hide();
        response = JSON.parse(response);
        add_html = '';
        
      	if(response[1].length > 0){
      		for(var i in response[1]){
      			add_html +=  '<div class="row">'+
		                        '<div class="col-75">'+
		                          '<input type="hidden" name="from_address" id="from_address'+response[1][i].id+'" value="'+response[1][i].villa+', '+response[1][i].street+'">'+
		                          '<input type="hidden" name="from_country" id="from_country'+response[1][i].id+'" value="'+response[1][i].city_id+'">'+
                              '<input type="hidden" name="from_area" id="from_area'+response[1][i].id+'" value="'+response[1][i].area_id+'">'+
		                          '<h4 class="address-data no-margin">'+response[1][i].villa+'</h4>'+
		                          '<p class="all-address-data no-margin">'+response[1][i].villa+', '+response[1][i].street+'</p>'+

		                        '</div>'+
		                        '<div class="col-25">'+
		                          '<input type="radio" name="from_address_selected" class="radio">'+
		                        '</div>'+
		                      '</div>';
      		}
      		$(".address-card").show();
      		$("#all_address_list").html(add_html);
      	}
 		

    });




 	$(".save-new-address").on("click", function()/**/{
 		var address = $('#address').val();
 		var city = $('#city').val();
 		var area = $('#area').val();
 		var streetname = $('#streetname').val();
 		var apartment = $('#apartment').val();
 		var lat = localStorage.getItem("lat");
 		var long = localStorage.getItem("long");
 		if (address == '' || area == '') {
 			app.dialog.alert('This field is requied!', 'Alert');
 			return false;
 		}

 		// save to DB
 		var form = {
              "villa":apartment,
              "street":streetname,
              "area_id":area,
              "city_id":city,
              "lat":11111,
              "lng":11111,
          };
      var settings = {
      "url": APIURL+"api/profile/addaddress",
      "headers": {
				    "api": localStorage.getItem("api")
				  },
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
      	var Address_array = [address,city,area,streetname,apartment];
 		localStorage.setItem('booking-address',Address_array);

 		response = JSON.parse(response);
 		add_html = '';
 		if(response[1].length > 0){
      		for(var i in response[1]){
      			add_html +=  '<div class="row">'+
		                        '<div class="col-75">'+
		                          '<input type="hidden" name="from_address" id="from_address'+response[1][i].id+'" value="'+response[1][i].villa+', '+response[1][i].street+'">'+
		                          '<input type="hidden" name="from_country" id="from_country'+response[1][i].id+'" value="'+response[1][i].city_id+'">'+
		                          '<h4 class="address-data no-margin">'+response[1][i].villa+'</h4>'+
		                          '<p class="all-address-data no-margin">'+response[1][i].villa+', '+response[1][i].street+'</p>'+

		                        '</div>'+
		                        '<div class="col-25">'+
		                          '<input type="radio" name="from_address_selected" class="radio">'+
		                        '</div>'+
		                      '</div>';
      		}
      	
      		
      	}else{
             add_html +='<div class="row">'+
                            '<div class="col-75">'+
                              '<input type="hidden" name="from_address" id="from_address" value="">'+
                              '<input type="hidden" name="from_country" id="from_country" value="">'+
                              '<h4 class="address-data no-margin"></h4>'+
                              '<p class="all-address-data no-margin"></p>'+

                            '</div>'+
                            '<div class="col-25">'+
                              '<input type="radio" name="from_address_selected" class="radio">'+
                            '</div>'+
                          '</div>'
        }
        
        $(".address-card").show();
        $("#all_address_list").html(add_html);

    });

 		

 		// console.log(objectifyForm($(".service-form").serializeArray()));
 		// app.data.form_data = objectifyForm($(".service-form").serializeArray());

 		
 	});

 }


 if(page.route.name == "handy-man"){ 


 	$$('.popup-address-google').on('popup:open', function (e) {
	  // alert('About popup open');
	  
	  getMapLocation();
	});
	$$('.popup-address').on('popup:open', function (e) {
	  // alert('About popup open');
	  $(".popup-address-google").hide();
	});




 	$("#clickNext").on("click", function(){

 		// console.log(objectifyForm($(".service-form").serializeArray()));
 		app.data.form_data = objectifyForm($(".service-form").serializeArray());
 		mainView.router.navigate({ name: 'review-booking-detail' });
 		
 	});



 	var settings = {
      "url": APIURL+"api/profile/addresslist",
      "headers": {
				    "api": localStorage.getItem("api")
				  },
      "method": "POST",
      "timeout": 0,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false
    
    };
    app.preloader.show();
    $.ajax(settings).done(function (response) {
      app.preloader.hide();
        response = JSON.parse(response);
        add_html = '';
        
      	if(response[1].length > 0){
      		for(var i in response[1]){
      			add_html +=  '<div class="row">'+
		                        '<div class="col-75">'+
		                          '<input type="hidden" name="from_address" id="from_address" value="'+response[1][i].villa+', '+response[1][i].street+'">'+
		                          '<input type="hidden" name="from_country" id="from_country" value="'+response[1][i].city_id+'">'+
		                          '<h4 class="address-data no-margin">'+response[1][i].villa+'</h4>'+
		                          '<p class="all-address-data no-margin">'+response[1][i].villa+', '+response[1][i].street+'</p>'+

		                        '</div>'+
		                        '<div class="col-25">'+
		                          '<input type="radio" name="from_address_selected" class="radio">'+
		                        '</div>'+
		                      '</div>';
      		}
      		$(".address-card").show();
      		$("#all_address_list").html(add_html);
      	}
 		

    });






 	$(".save-new-address").on("click", function()/**/{

 		var address = $('#address').val();
 		var city = $('#city').val();
 		var area = $('#area').val();
 		var streetname = $('#streetname').val();
 		var apartment = $('#apartment').val();
 		var lat = localStorage.getItem("lat");
 		var long = localStorage.getItem("long");

 		if (address == '' || area == '') {
 			app.dialog.alert('This field is requied!', 'Alert');
 			return false;
 		}

 		// save to DB
 		var form = {
              "villa":apartment,
              "street":streetname,
              "area_id":area,
              "city_id":city,
              "lat":lat,
              "lng":long,
          };


      var settings = {
      "url": APIURL+"api/profile/addaddress",
      "headers": {
				    "api": localStorage.getItem("api")
				  },
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

      	var Address_array = [address,city,area,streetname,apartment];
 		localStorage.setItem('booking-address',Address_array);

 		response = JSON.parse(response);
 		add_html = '';
 		if(response[1].length > 0){
      		for(var i in response[1]){
      			add_html +=  '<div class="row">'+
		                        '<div class="col-75">'+
		                          '<input type="hidden" name="from_address" id="from_address" value="'+response[1][i].villa+', '+response[1][i].street+'">'+
		                          '<input type="hidden" name="from_country" id="from_country" value="'+response[1][i].city_id+'">'+
		                          '<h4 class="address-data no-margin">'+response[1][i].villa+'</h4>'+
		                          '<p class="all-address-data no-margin">'+response[1][i].villa+', '+response[1][i].street+'</p>'+

		                        '</div>'+
		                        '<div class="col-25">'+
		                          '<input type="radio" name="from_address_selected" class="radio">'+
		                        '</div>'+
		                      '</div>';
      		}
      		$(".address-card").show();
      		$("#all_address_list").html(add_html);
      	}

    });

 		

 		// console.log(objectifyForm($(".service-form").serializeArray()));
 		// app.data.form_data = objectifyForm($(".service-form").serializeArray());

 		
 	});

 }


 if(page.route.name == "customRequest"){ 

 	$$('.popup-address-google').on('popup:open', function (e) {
	  // alert('About popup open');
	  
	  getMapLocation();
	});
	$$('.popup-address').on('popup:open', function (e) {
	  // alert('About popup open');
	  $(".popup-address-google").hide();
	});



 	$("#clickNext").on("click", function(){

 		// console.log(objectifyForm($(".service-form").serializeArray()));
 		app.data.form_data = objectifyForm($(".service-form").serializeArray());
 		mainView.router.navigate({ name: 'review-booking-detail' });
 		
 	});

 	var settings = {
      "url": APIURL+"api/profile/addresslist",
      "headers": {
				    "api": localStorage.getItem("api")
				  },
      "method": "POST",
      "timeout": 0,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false
    
    };
    app.preloader.show();
    $.ajax(settings).done(function (response) {
      app.preloader.hide();
        response = JSON.parse(response);
        add_html = '';
        
      	if(response[1].length > 0){
      		for(var i in response[1]){
      			add_html +=  '<div class="row">'+
		                        '<div class="col-75">'+
		                          '<input type="hidden" name="from_address" id="from_address" value="'+response[1][i].villa+', '+response[1][i].street+'">'+
		                          '<input type="hidden" name="from_country" id="from_country" value="'+response[1][i].city_id+'">'+
		                          '<h4 class="address-data no-margin">'+response[1][i].villa+'</h4>'+
		                          '<p class="all-address-data no-margin">'+response[1][i].villa+', '+response[1][i].street+'</p>'+

		                        '</div>'+
		                        '<div class="col-25">'+
		                          '<input type="radio" name="from_address_selected" class="radio">'+
		                        '</div>'+
		                      '</div>';
      		}
      		$(".address-card").show();
      		$("#all_address_list").html(add_html);
      	}
 		

    });






 	$(".save-new-address").on("click", function()/**/{

 		var address = $('#address').val();
 		var city = $('#city').val();
 		var area = $('#area').val();
 		var streetname = $('#streetname').val();
 		var apartment = $('#apartment').val();
 		var lat = localStorage.getItem("lat");
 		var long = localStorage.getItem("long");

 		if (address == '' || area == '') {
 			app.dialog.alert('This field is requied!', 'Alert');
 			return false;
 		}

 		// save to DB
 		var form = {
              "villa":apartment,
              "street":streetname,
              "area_id":area,
              "city_id":city,
              "lat":lat,
              "lng":long,
          };


      var settings = {
      "url": APIURL+"api/profile/addaddress",
      "headers": {
				    "api": localStorage.getItem("api")
				  },
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

      	var Address_array = [address,city,area,streetname,apartment];
 		localStorage.setItem('booking-address',Address_array);

 		response = JSON.parse(response);
 		add_html = '';
 		if(response[1].length > 0){
      		for(var i in response[1]){
      			add_html +=  '<div class="row">'+
		                        '<div class="col-75">'+
		                          '<input type="hidden" name="from_address" id="from_address" value="'+response[1][i].villa+', '+response[1][i].street+'">'+
		                          '<input type="hidden" name="from_country" id="from_country" value="'+response[1][i].city_id+'">'+
		                          '<h4 class="address-data no-margin">'+response[1][i].villa+'</h4>'+
		                          '<p class="all-address-data no-margin">'+response[1][i].villa+', '+response[1][i].street+'</p>'+

		                        '</div>'+
		                        '<div class="col-25">'+
		                          '<input type="radio" name="from_address_selected" class="radio">'+
		                        '</div>'+
		                      '</div>';
      		}
      		$(".address-card").show();
      		$("#all_address_list").html(add_html);
      	}

    });

 		

 		// console.log(objectifyForm($(".service-form").serializeArray()));
 		// app.data.form_data = objectifyForm($(".service-form").serializeArray());

 		
 	});

 }


 if(page.route.name == "bookTruck"){ 

 	$$('.popup-address-google').on('popup:open', function (e) {
	  // alert('About popup open');
	  
	  getMapLocation();
	});
	$$('.popup-address').on('popup:open', function (e) {
	  // alert('About popup open');
	  $(".popup-address-google").hide();
	});


 	$("#clickNext").on("click", function(){

 		// console.log(objectifyForm($(".service-form").serializeArray()));
 		app.data.form_data = objectifyForm($(".service-form").serializeArray());

 		mainView.router.navigate({ name: 'review-booking-detail' });
 	});

 	var settings = {
      "url": APIURL+"api/profile/addresslist",
      "headers": {
				    "api": localStorage.getItem("api")
				  },
      "method": "POST",
      "timeout": 0,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false
    
    };
    app.preloader.show();
    $.ajax(settings).done(function (response) {

      app.preloader.hide();
        response = JSON.parse(response);
        add_html = '';
        
      	if(response[1].length > 0){
      		for(var i in response[1]){
      			add_html +=  '<div class="row">'+
		                        '<div class="col-75">'+
		                          '<input type="hidden" name="from_address" id="from_address" value="'+response[1][i].villa+', '+response[1][i].street+'">'+
		                          '<input type="hidden" name="from_country" id="from_country" value="'+response[1][i].city_id+'">'+
		                          '<h4 class="address-data no-margin">'+response[1][i].villa+'</h4>'+
		                          '<p class="all-address-data no-margin">'+response[1][i].villa+', '+response[1][i].street+'</p>'+

		                        '</div>'+
		                        '<div class="col-25">'+
		                          '<input type="radio" name="from_address_selected" class="radio">'+
		                        '</div>'+
		                      '</div>';
      		}
      		$(".address-card").show();
      		$("#all_address_list").html(add_html);
      	}
 		

    });






 	$(".save-new-address").on("click", function()/**/{

 		var address = $('#address').val();
 		var city = $('#city').val();
 		var area = $('#area').val();
 		var streetname = $('#streetname').val();
 		var apartment = $('#apartment').val();
 		var lat = localStorage.getItem("lat");
 		var long = localStorage.getItem("long");

 		if (address == '' || area == '') {
 			app.dialog.alert('This field is requied!', 'Alert');
 			return false;
 		}

 		// save to DB
 		var form = {
              "villa":apartment,
              "street":streetname,
              "area_id":area,
              "city_id":city,
              "lat":lat,
              "lng":long,
          };


      var settings = {
      "url": APIURL+"api/profile/addaddress",
      "headers": {
				    "api": localStorage.getItem("api")
				  },
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

      	var Address_array = [address,city,area,streetname,apartment];
 		localStorage.setItem('booking-address',Address_array);

 		response = JSON.parse(response);
 		add_html = '';
 		if(response[1].length > 0){
      		for(var i in response[1]){
      			add_html +=  '<div class="row">'+
		                        '<div class="col-75">'+
		                          '<input type="hidden" name="from_address" id="from_address" value="'+response[1][i].villa+', '+response[1][i].street+'">'+
		                          '<input type="hidden" name="from_country" id="from_country" value="'+response[1][i].city_id+'">'+
		                          '<h4 class="address-data no-margin">'+response[1][i].villa+'</h4>'+
		                          '<p class="all-address-data no-margin">'+response[1][i].villa+', '+response[1][i].street+'</p>'+

		                        '</div>'+
		                        '<div class="col-25">'+
		                          '<input type="radio" name="from_address_selected" class="radio">'+
		                        '</div>'+
		                      '</div>';
      		}
      		$(".address-card").show();
      		$("#all_address_list").html(add_html);
      	}

    });

 		

 		// console.log(objectifyForm($(".service-form").serializeArray()));
 		// app.data.form_data = objectifyForm($(".service-form").serializeArray());

 		
 	});

 }


 if(page.route.name == "painting-service"){ 

 	$$('.popup-address-google').on('popup:open', function (e) {
	  // alert('About popup open');
	  
	  getMapLocation();
	});
	$$('.popup-address').on('popup:open', function (e) {
	  // alert('About popup open');
	  $(".popup-address-google").hide();
	});


 	$("#clickNext").on("click", function(){

 		// console.log(objectifyForm($(".service-form").serializeArray()));
 		app.data.form_data = objectifyForm($(".service-form").serializeArray());
 		mainView.router.navigate({ name: 'review-booking-detail' });
 		
 	});

 	var settings = {
      "url": APIURL+"api/profile/addresslist",
      "headers": {
				    "api": localStorage.getItem("api")
				  },
      "method": "POST",
      "timeout": 0,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false
    
    };
    app.preloader.show();
    $.ajax(settings).done(function (response) {
      app.preloader.hide();
        response = JSON.parse(response);
        add_html = '';
        
      	if(response[1].length > 0){
      		for(var i in response[1]){
      			add_html +=  '<div class="row">'+
		                        '<div class="col-75">'+
		                          '<input type="hidden" name="from_address" id="from_address" value="'+response[1][i].villa+', '+response[1][i].street+'">'+
		                          '<input type="hidden" name="from_country" id="from_country" value="'+response[1][i].city_id+'">'+
		                          '<h4 class="address-data no-margin">'+response[1][i].villa+'</h4>'+
		                          '<p class="all-address-data no-margin">'+response[1][i].villa+', '+response[1][i].street+'</p>'+

		                        '</div>'+
		                        '<div class="col-25">'+
		                          '<input type="radio" name="from_address_selected" class="radio">'+
		                        '</div>'+
		                      '</div>';
      		}
      		$(".address-card").show();
      		$("#all_address_list").html(add_html);
      	}
 		

    });






 	$(".save-new-address").on("click", function()/**/{

 		var address = $('#address').val();
 		var city = $('#city').val();
 		var area = $('#area').val();
 		var streetname = $('#streetname').val();
 		var apartment = $('#apartment').val();
 		var lat = localStorage.getItem("lat");
 		var long = localStorage.getItem("long");

 		if (address == '' || area == '') {
 			app.dialog.alert('This field is requied!', 'Alert');
 			return false;
 		}

 		// save to DB
 		var form = {
              "villa":apartment,
              "street":streetname,
              "area_id":area,
              "city_id":city,
              "lat":lat,
              "lng":long,
          };


      var settings = {
      "url": APIURL+"api/profile/addaddress",
      "headers": {
				    "api": localStorage.getItem("api")
				  },
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

      	var Address_array = [address,city,area,streetname,apartment];
 		localStorage.setItem('booking-address',Address_array);

 		response = JSON.parse(response);
 		add_html = '';
 		if(response[1].length > 0){
      		for(var i in response[1]){
      			add_html +=  '<div class="row">'+
		                        '<div class="col-75">'+
		                          '<input type="hidden" name="from_address" id="from_address" value="'+response[1][i].villa+', '+response[1][i].street+'">'+
		                          '<input type="hidden" name="from_country" id="from_country" value="'+response[1][i].city_id+'">'+
		                          '<h4 class="address-data no-margin">'+response[1][i].villa+'</h4>'+
		                          '<p class="all-address-data no-margin">'+response[1][i].villa+', '+response[1][i].street+'</p>'+

		                        '</div>'+
		                        '<div class="col-25">'+
		                          '<input type="radio" name="from_address_selected" class="radio">'+
		                        '</div>'+
		                      '</div>';
      		}
      		$(".address-card").show();
      		$("#all_address_list").html(add_html);
      	}

    });

 		

 		// console.log(objectifyForm($(".service-form").serializeArray()));
 		// app.data.form_data = objectifyForm($(".service-form").serializeArray());

 		
 	});

 }


 if(page.route.name == "electrician"){ 

 	$$('.popup-address-google').on('popup:open', function (e) {
	  // alert('About popup open');
	  
	  getMapLocation();
	});
	$$('.popup-address').on('popup:open', function (e) {
	  // alert('About popup open');
	  $(".popup-address-google").hide();
	});


 	$("#clickNext").on("click", function(){

 		// console.log(objectifyForm($(".service-form").serializeArray()));
 		app.data.form_data = objectifyForm($(".service-form").serializeArray());
 		mainView.router.navigate({ name: 'review-booking-detail' });
 		
 	});

 	var settings = {
      "url": APIURL+"api/profile/addresslist",
      "headers": {
				    "api": localStorage.getItem("api")
				  },
      "method": "POST",
      "timeout": 0,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false
    
    };
    app.preloader.show();
    $.ajax(settings).done(function (response) {
      app.preloader.hide();
        response = JSON.parse(response);
        add_html = '';
        
      	if(response[1].length > 0){
      		for(var i in response[1]){
      			add_html +=  '<div class="row">'+
		                        '<div class="col-75">'+
		                          '<input type="hidden" name="from_address" id="from_address" value="'+response[1][i].villa+', '+response[1][i].street+'">'+
		                          '<input type="hidden" name="from_country" id="from_country" value="'+response[1][i].city_id+'">'+
		                          '<h4 class="address-data no-margin">'+response[1][i].villa+'</h4>'+
		                          '<p class="all-address-data no-margin">'+response[1][i].villa+', '+response[1][i].street+'</p>'+

		                        '</div>'+
		                        '<div class="col-25">'+
		                          '<input type="radio" name="from_address_selected" class="radio">'+
		                        '</div>'+
		                      '</div>';
      		}
      		$(".address-card").show();
      		$("#all_address_list").html(add_html);
      	}
 		

    });






 	$(".save-new-address").on("click", function()/**/{

 		var address = $('#address').val();
 		var city = $('#city').val();
 		var area = $('#area').val();
 		var streetname = $('#streetname').val();
 		var apartment = $('#apartment').val();
 		var lat = localStorage.getItem("lat");
 		var long = localStorage.getItem("long");

 		if (address == '' || area == '') {
 			app.dialog.alert('This field is requied!', 'Alert');
 			return false;
 		}

 		// save to DB
 		var form = {
              "villa":apartment,
              "street":streetname,
              "area_id":area,
              "city_id":city,
              "lat":lat,
              "lng":long,
          };


      var settings = {
      "url": APIURL+"api/profile/addaddress",
      "headers": {
				    "api": localStorage.getItem("api")
				  },
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

      	var Address_array = [address,city,area,streetname,apartment];
 		localStorage.setItem('booking-address',Address_array);

 		response = JSON.parse(response);
 		add_html = '';
 		if(response[1].length > 0){
      		for(var i in response[1]){
      			add_html +=  '<div class="row">'+
		                        '<div class="col-75">'+
		                          '<input type="hidden" name="from_address" id="from_address" value="'+response[1][i].villa+', '+response[1][i].street+'">'+
		                          '<input type="hidden" name="from_country" id="from_country" value="'+response[1][i].city_id+'">'+
		                          '<h4 class="address-data no-margin">'+response[1][i].villa+'</h4>'+
		                          '<p class="all-address-data no-margin">'+response[1][i].villa+', '+response[1][i].street+'</p>'+

		                        '</div>'+
		                        '<div class="col-25">'+
		                          '<input type="radio" name="from_address_selected" class="radio">'+
		                        '</div>'+
		                      '</div>';
      		}
      		$(".address-card").show();
      		$("#all_address_list").html(add_html);
      	}

    });

 		

 		// console.log(objectifyForm($(".service-form").serializeArray()));
 		// app.data.form_data = objectifyForm($(".service-form").serializeArray());

 		
 	});

 }



 if(page.route.name == "pest-control"){ 

 	$$('.popup-address-google').on('popup:open', function (e) {
	  // alert('About popup open');
	  
	  getMapLocation();
	});
	$$('.popup-address').on('popup:open', function (e) {
	  // alert('About popup open');
	  $(".popup-address-google").hide();
	});


 	$("#clickNext").on("click", function(){

 		// console.log(objectifyForm($(".service-form").serializeArray()));
 		app.data.form_data = objectifyForm($(".service-form").serializeArray());
 		mainView.router.navigate({ name: 'review-booking-detail' });
 		
 	});

 	var settings = {
      "url": APIURL+"api/profile/addresslist",
      "headers": {
				    "api": localStorage.getItem("api")
				  },
      "method": "POST",
      "timeout": 0,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false
    
    };
    app.preloader.show();
    $.ajax(settings).done(function (response) {
      app.preloader.hide();
        response = JSON.parse(response);
        add_html = '';
        
      	if(response[1].length > 0){
      		for(var i in response[1]){
      			add_html +=  '<div class="row">'+
		                        '<div class="col-75">'+
		                          '<input type="hidden" name="from_address" id="from_address" value="'+response[1][i].villa+', '+response[1][i].street+'">'+
		                          '<input type="hidden" name="from_country" id="from_country" value="'+response[1][i].city_id+'">'+
		                          '<h4 class="address-data no-margin">'+response[1][i].villa+'</h4>'+
		                          '<p class="all-address-data no-margin">'+response[1][i].villa+', '+response[1][i].street+'</p>'+

		                        '</div>'+
		                        '<div class="col-25">'+
		                          '<input type="radio" name="from_address_selected" class="radio">'+
		                        '</div>'+
		                      '</div>';
      		}
      		$(".address-card").show();
      		$("#all_address_list").html(add_html);
      	}
 		

    });






 	$(".save-new-address").on("click", function()/**/{

 		var address = $('#address').val();
 		var city = $('#city').val();
 		var area = $('#area').val();
 		var streetname = $('#streetname').val();
 		var apartment = $('#apartment').val();
 		var lat = localStorage.getItem("lat");
 		var long = localStorage.getItem("long");

 		if (address == '' || area == '') {
 			app.dialog.alert('This field is requied!', 'Alert');
 			return false;
 		}

 		// save to DB
 		var form = {
              "villa":apartment,
              "street":streetname,
              "area_id":area,
              "city_id":city,
              "lat":lat,
              "lng":long,
          };


      var settings = {
      "url": APIURL+"api/profile/addaddress",
      "headers": {
				    "api": localStorage.getItem("api")
				  },
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

      	var Address_array = [address,city,area,streetname,apartment];
 		localStorage.setItem('booking-address',Address_array);

 		response = JSON.parse(response);
 		add_html = '';
 		if(response[1].length > 0){
      		for(var i in response[1]){
      			add_html +=  '<div class="row">'+
		                        '<div class="col-75">'+
		                          '<input type="hidden" name="from_address" id="from_address" value="'+response[1][i].villa+', '+response[1][i].street+'">'+
		                          '<input type="hidden" name="from_country" id="from_country" value="'+response[1][i].city_id+'">'+
		                          '<h4 class="address-data no-margin">'+response[1][i].villa+'</h4>'+
		                          '<p class="all-address-data no-margin">'+response[1][i].villa+', '+response[1][i].street+'</p>'+

		                        '</div>'+
		                        '<div class="col-25">'+
		                          '<input type="radio" name="from_address_selected" class="radio">'+
		                        '</div>'+
		                      '</div>';
      		}
      		$(".address-card").show();
      		$("#all_address_list").html(add_html);
      	}

    });

 		

 		// console.log(objectifyForm($(".service-form").serializeArray()));
 		// app.data.form_data = objectifyForm($(".service-form").serializeArray());

 		
 	});

 }


 if(page.route.name == "review-booking-detail"){ 
 	// set review details
  console.log('review-booking-detail',app.data.form_data);
 	html_i = '<ul >'+
                '<li class="col-100">'+
                  '<div class="item-inner">'+
                    '<span class="sub-head text-start">Date: </span> <span class="text-end">'+app.data.form_data.date+'</span>'+
                  '</div>'+
                '</li>'+
                '<li class="col-100">'+
                  '<div class="item-inner">'+
                    '<span class="sub-head text-start">Time: </span> <span class="text-end">'+(app.data.form_data.time == undefined ? "" : app.data.form_data.time)+'</span>'+
                  '</div>'+
                '</li>'+
               '<li class="col-100">'+
                  '<div class="item-inner">'+
                    '<span class="sub-head text-start">Description: </span> <span class="text-end"> '+app.data.form_data.description+'</span>'+
                  '</div>'+
                '</li>'+
               '<li class="col-100">'+
                  '<div class="item-inner">'+
                    '<span class="sub-head text-start">Address: </span> <span class="text-end">'+app.data.form_data.from_address+'</span>'+
                  '</div>'+
                '</li>'+
              
              '</ul>';

           $("#subtotalprice").text('AED '+app.data.form_data.prices);
           $("#sub_total_pay").val(app.data.form_data.prices);
           var vat = app.data.form_data.prices * parseInt(5) / parseInt(100);
           var total = parseInt(app.data.form_data.prices) + parseInt(vat);
           $('#vat_value').val(vat);
           $('#vat_text').text('AED '+vat);
           $("#total_pay").text('AED '+total);
           $("#total_pay_price").val(total);
           $("#review-details").html(html_i);
 	         $("#clickConfirm").on("click", function(){

 		
 		if(localStorage.getItem("id") == null || localStorage.getItem("id") == undefined || localStorage.getItem("id") == ''){

 			app.dialog.alert("Please login","Alert!");
 			return;

 		}

 		if($("input[name='my-radio']:checked").val() == "card"){

 			telrService.start();
 		}else{

 			// console.log(objectifyForm($(".service-form").serializeArray()));
 		formdata = app.data.form_data;
    console.log(formdata);
    console.log(localStorage);
 		customerData = {

 			"adr1":localStorage.getItem("villa"),
 			"adr2":localStorage.getItem("area") + localStorage.getItem("street"),
 			// "city_id":Number(localStorage.getItem("city_id")),
 			"city_id":formdata.from_country,
 			"date": app.data.form_data.date,
 			"description":formdata.description,
 			"email":localStorage.getItem("email"),
 			"first_name":localStorage.getItem("name"),
 			"form_type":localStorage.getItem("type"),
 			"last_name":localStorage.getItem("last_name"),
 			"mobile":localStorage.getItem("mobile"),
 			"service_provider":[0,1,2]

 		}

 		//merging
 		customerData.meta = formdata;
    //console.log(customerData);
   // return false;
 		//console.log(JSON.stringify(JSON.stringify(customerData)));
 		var settings = {
			  "url": "https://test.zamkanapp.com/api/enquiry/create/",
			  "method": "POST",
			  "timeout": 0,
			  "headers": {
			    "api": localStorage.getItem("api")
			  },
			  "data": JSON.stringify(customerData),
			};
			app.preloader.show();
			$.ajax(settings).done(function (response) {
			  app.preloader.hide();
			  console.log(response);
        if(response[0] == false){
             app.dialog.alert(response[1]);
          return false;
        }
			  mainView.router.navigate({ name: 'booking-success' });
			  
			});
			
 		}	
 		// 

 		

 		
 	});

 }


 if(page.route.name == "myaccountSavedLocation"){ 

 	var settings = {
      "url": APIURL+"api/profile/addresslist",
      "headers": {
				    "api": localStorage.getItem("api")
				  },
      "method": "POST",
      "timeout": 0,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false
    
    };
    app.preloader.show();
    $.ajax(settings).done(function (response) {
      app.preloader.hide();
        response = JSON.parse(response);
        add_html = '';
        
      	if(response[1].length > 0){
      		for(var i in response[1]){
      			add_html +=  '<div class="row no-gap myaccount-saved-location-name-row">'+
					              '<div class="col myaccount-wallet-credit-name" style="padding-left: 10px;">'+
					                  '<span style="display: block;font-weight: bold;">'+response[1][i].villa+'</span>'+
					                  '<span style="display: block;font-size: 10px;"> '+response[1][i].street+'</span>'+
					              '</div>'+
					          '</div>';
      		}
      		
      		$("#address_list").html(add_html);
      	}
 		

    });
 }




 if(page.route.name == "myaccountPayments"){ 

 	var settings = {
      "url": APIURL+"api/user/card_list",
      "headers": {
				    "api": localStorage.getItem("api")
				  },
      "method": "POST",
      "timeout": 0,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false
    
    };

    app.preloader.show();
    $.ajax(settings).done(function (response) {
      app.preloader.hide();
        response = JSON.parse(response);
        add_html = '';
        
      	if(response[1].length > 0){
      		for(var i in response[1]){
      			add_html +=  '<div class="row myaccount-payments-note">'+
						      '<div class="col">'+
						      '<span>'+
						          'Card Holder :  '+ response[1][i].owner_name+
						        '</span><br>'+
						        '<span>'+
						          'Card Number :  '+ response[1][i].card_numer+
						        '</span>'+
						        '<br>'+
						        '<span>'+
						          'Expiry :  '+ response[1][i].card_valid+
						        '</span>'+
						        '<br>'+
						        '<span>'+
						          'CVV :  '+ response[1][i].cvv+
						        '</span>'+
						      '</div>'+
						    '</div>';
      		}
      		
      		$("#payment_card_list").html(add_html);
      	}
 		

    });
 }


 if(page.route.name == "myaccountAddCreditCard"){

 	$("#add_cards").on("click", function(){ 

 	var form = {
				    "card_numer":$("#cardNumber").val(),
				    "holder_name":$("#cardholdername").val(),
				    "card_valid":$("#cardExpiry").val(),
				    "cvv":$("#cardCVV").val()
				};

 	var settings = {
      "url": APIURL+"api/user/add_card",
      "headers": {
				    "api": localStorage.getItem("api")
				  },
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
 		mainView.router.navigate({ name: 'myaccountPayments' });
    });

 	});
   $$('#cardNumber').keypress(function(e){
       var value = $(this).val();
       if(value.length >= 16){
          e.preventDefault();
       }else{
           $('#ErrcardNumber').text('');
       }
   }).on("cut copy paste",function(e){
        e.preventDefault();
  });


 $$('#cardCVV').keypress(function(e){
       var value = $(this).val();
       if(value.length >= 3){
          e.preventDefault();
       }else{
           $('#ErrcardCVV').text('');
       }
   }).on("cut copy paste",function(e){
        e.preventDefault();
  });

 }



 if(page.route.name == "myaccount-order-history"){

 	var settings = {
      "url": APIURL+"api/user/mypurchase",
      "headers": {
				    "api": localStorage.getItem("api")
				  },
      "method": "POST",
      "timeout": 0,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false
    
    };

    app.preloader.show();
    $.ajax(settings).done(function (response) {
      	app.preloader.hide();
 		response = JSON.parse(response);
 		app.data.orderhistory_data = response;

 		if(response[0] == true){

 			html = '';
 			for(var i in response[1]){
 				for(var j in response[1][i].items){

 					html += '<div class="card no-margin">'+
					              '<div class="card-content card-btn">'+
					                '<div class="list media-list">'+
					                  '<ul>'+
					                      '<li>'+
					                      '<a href="/order-detail/" class="item-link item-content">'+
					                        '<div class="item-media"><img src="https://cdn.framework7.io/placeholder/people-160x160-1.jpg" width="80"/></div>'+
					                        '<div class="item-inner">'+
					                          '<div class="item-title-row">'+
					                            '<div class="item-title title-head"><h2 class="no-margin">'+response[1][i].items[j].product_name+'</h2></div>'+
					                          '</div>'+
					                          '<div class="item-subtitle">Qty: '+response[1][i].items[j].quantity+'</div>'+
					                          '<div class="item-text">AED '+response[1][i].items[j].price+'</div>'+
					                          '<div class="item-text">'+response[1][i].items[j].updated_at+'</div>'+
					                        '</div></a>'+
					                      '</li>'+
					                      '</ul>'+
					                '</div>'+
					              '</div>'+
					        '</div>'+
					        '<br>';
 				}
 			}

 			$("#history_list").html(html);

 		}

    });

 	
 }


if(page.route.name == "job"){ 

	var form = {
		  "villa":localStorage.getItem("villa"),
          "street":localStorage.getItem("street"),
          "area_id":22,
          "city_id":7,
          "lat":'',
          "lng":''
	};
	// var userApi = localStorage.getItem('api');
	//var userApi = 'api_bc55859464394b9f4187c940061acde5f220482120c4bc9499fa61df47e6bb2a';
	var settings = {
	  "url": "https://test.zamkanapp.com/api/user/mybookings/",
	  "method": "POST",
	  "timeout": 0,
	  "headers": {
	    "api": localStorage.getItem('api')
	  },
	  "processData": false,
	  "mimeType": "multipart/form-data",
	  "contentType": false,
	  "data": form
	};

	app.preloader.show();
	$.ajax(settings).done(function (response) {
	  app.preloader.hide();
	    response = JSON.parse(response);
	    html = '';
		if(response[0] == false){
          return; 
		}else if (response[0] == true){

		  	main_html = '<br><br>';
		  	for(var i in response[1]){

			  main_html += '<div class="card no-margin">'+
				            '<div class="card-content " style="padding: 10px 6px;">'+
				              '<div class="block job-blocks-card">'+
				                '<a href="#" class="getbookingdetail" data-id="'+response[1][i].id+'">'+
				                '<div class="row">'+
				                    '<div class="col-60">'+
				                        '<span class="job-ledger" style="display: block;">Booking</span>'+
				                       ' <span class="job-heading" style="display: block;">'+response[1][i].requirement+'</span>'+
				                        '<span class="job-heading2" style="display: block;">'+response[1][i].created_at+'</span>'+
				                        '<a href="#" class="job-action-button">'+response[1][i].status+'</a>'+
				                    '</div>'+

				                    '<div class="col-40 text-align-center">'+
				                        '<span class="job-total" style="display: block;">Total</span>'+
				                        '<span class="job-total-text">AED </span>'+
				                        '<span class="job-total-amount">'+response[1][i].amount+' </span>'+
				                    '</div>'+
				                '</div>'+
				                '</a>'+
				              '</div>'+
				            '</div>'+
				          '</div><br><br>';
		  	}

		  	html = main_html;
		  	$("#History").html(html);

		  	$('.getbookingdetail').on('click', function(){

	           var dataID = $(this).attr('data-id'); 
	           localStorage.setItem('service_BookingID',dataID);

	           mainView.router.navigate({ name: 'booking-detail' });
	          
      		});
		     
		}

	});

 }

 if(page.route.name == "booking-detail"){
    
      var bookingID = localStorage.getItem('service_BookingID');

      var form = {
		  "villa":localStorage.getItem("villa"),
          "street":localStorage.getItem("street"),
          "area_id":22,
          "city_id":7,
          "lat":'',
          "lng":''
	};
	
	// var userApi = localStorage.getItem('api');
	//var userApi = 'api_bc55859464394b9f4187c940061acde5f220482120c4bc9499fa61df47e6bb2a';
	var settings = {
	  "url": "https://test.zamkanapp.com/api/user/mybookings/",
	  "method": "POST",
	  "timeout": 0,
	  "headers": {
	    "api": localStorage.getItem('api')
	  },
	  "processData": false,
	  "mimeType": "multipart/form-data",
	  "contentType": false,
	  "data": form
	};
        app.preloader.show();
      $.ajax(settings).done(function (response) {
        app.preloader.hide();
       response = JSON.parse(response);
      html = '';
      if(response[0] == false){
        return;

      }else if (response[0] == true){
            var main_html ='';
       
            var countStatus ='';
        for(var i in response[1])
        { 
          if (response[1][i].id == bookingID) {
      
            main_html = '<div class="card">'+
                          '<div class="card-header " style="justify-content:center;"><h3 >'+response[1][i].requirement+'</h3></div>'+
                          '<div class="card-content card-content-padding">'+
                          
                          '<div class="row">'+
                              '<div class="list">'+
                                '<ul>'+
                                  '<li class="col-100">'+
                                    '<div class="item-inner">'+
                                      '<span class="sub-head text-start">Service: </span> <span class="text-end">'+response[1][i].requirement+'</span>'+
                                    '</div>'+
                                  '</li>'+
                                  '<li class="col-100">'+
                                    '<div class="item-inner">'+
                                      '<span class="sub-head text-start">Service schedule: </span> <span class="text-end">'+response[1][i].date+'</span>'+
                                    '</div>'+
                                  '</li>'+
                                  '<li class="col-100">'+
                                    '<div class="item-inner">'+
                                      '<span class="sub-head text-start">Status: </span> <span class="text-end">'+response[1][i].status+'</span>'+
                                    '</div>'+
                                  '</li>'+
                                  '<li class="col-100">'+
                                    '<div class="item-inner">'+
                                      '<span class="sub-head text-start">Customer Name: </span> <span class="text-end"> '+response[1][i].name+'</span>'+
                                    '</div>'+
                                  '</li>'+
                                  '<li class="col-100">'+
                                   ' <div class="item-inner">'+
                                      '<span class="sub-head text-start">Date Recieved: </span> <span class="text-end"> '+response[1][i].created_at+'</span>'+
                                    '</div>'+
                                  '</li>'+
                                   '<li class="col-100">'+
                                    '<div class="item-inner">'+
                                      '<span class="sub-head text-start">Additional Comments: </span> <span class="text-end"> '+response[1][i].remark+'</span>'+
                                    '</div>'+
                                  '</li>'+
                                   '<li class="col-100">'+
                                    '<div class="item-inner">'+
                                      '<span class="sub-head text-start">Payment Method: </span> <span class="text-end"> '+response[1][i].payment_mode+'</span>'+
                                    '</div>'+
                                  '</li>'+
                                  '<li class="col-100">'+
                                    '<div class="item-inner">'+
                                      '<span class="sub-head text-start">Original Price: </span> <span class="text-end"> AED '+response[1][i].amount+'</span>'+
                                    '</div>'+
                                  '</li>'+
                                  '<li class="col-100">'+
                                    '<div class="item-inner">'+
                                      '<span class="sub-head text-start">Sub Total: </span> <span class="text-end"> AED '+response[1][i].subtotal+'</span>'+
                                    '</div>'+
                                  '</li>'+
                                  '<li class="col-100">'+
                                    '<div class="item-inner">'+
                                      '<span class="sub-head text-start">VAT: </span> <span class="text-end"> AED '+response[1][i].vat+'</span>'+
                                    '</div>'+
                                  '</li>'+
                                  '<li class="col-100">'+
                                    '<div class="item-inner">'+
                                      '<span class="sub-head text-start">Final Price: </span> <span class="text-end"> AED '+response[1][i].amount+'</span>'+
                                    '</div>'+
                                  '</li>'+
                                  '<li class="col-100">'+
                                    '<div class="item-inner">'+
                                      '<span class="sub-head text-start">Address: </span> <span class="text-end"> '+response[1][i].address+', '+response[1][i].address_2+'</span>'+
                                    '</div>'+
                                  '</li>'+
                                  '<li class="col-100">'+
                                    '<div class="item-inner">'+
                                      '<span class="sub-head text-start">City: </span> <span class="text-end"> '+response[1][i].city+'</span>'+
                                    '</div>'+
                                  '</li>'+
                                
                                '</ul>'+
                                
                              '</div>'+
                            
                          '</div><br>'+
                         '</div>'+
                        '</div><br>'+
                        '<div class="card">'+
					        '<div class="card-header">Payment details</div>'+
					        '<div class="card-content card-content-padding">'+
					          '<div class="row">'+
					              '<div class="col-50">'+
					                '<span style="color: #000; font-size: 16px; font-weight: 600;">Payment Mode</span>'+
					              '</div>'+
					              '<div class="col-50" style="text-align: right;">'+
					                '<span style="color: blue; font-size: 16px; font-weight: 600;">'+response[1][i].payment_mode+'</span>'+
					              '</div>'+
					          '</div>'+
					          '<div class="row">'+
					              '<div class="col-50">'+
					                '<span style="color: #000; font-size: 16px; font-weight: 600;">Payment Status</span>'+
					              '</div>'+
					              '<div class="col-50" style="text-align: right;">'+
					                '<span style="color: blue; font-size: 16px; font-weight: 600;">'+response[1][i].payment_status+'</span>'+
					              '</div>'+
					          '</div>'+
					          '<div class="row">'+
					              '<div class="col-50">'+
					                '<span style="color: #000; font-size: 16px; font-weight: 600;">Total to pay</span>'+
					              '</div>'+
					              '<div class="col-50" style="text-align: right;">'+
					                '<span style="color: blue; font-size: 16px; font-weight: 600;">AED '+response[1][i].amount+'</span>'+
					              '</div>'+
					          '</div>'+

					        '</div>'+
					      '</div><br><br><br>';

            }

        }

      // console.log(countStatus);
        html = main_html;
        $('#bookingDetails').html(html);
      }

  });

  }

});