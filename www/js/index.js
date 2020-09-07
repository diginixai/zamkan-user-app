// In page events:
$$(document).on('page:init', function (e, page) {

		if(page.route.name == "login"){

			$(".signin-button").on("click",function(){
				var email = $("#username").val();
				var password = $("#password").val();

				if(email == ""){
					app.dialog.alert('Please enter email id.',"");
				  	return;
				}else if(password == ""){
					app.dialog.alert('Please enter password.',"");
				  	return;
				}
				jsonDATA = {

					"email":$('#username').val(),
					"password":$('#password').val()
				}

				var settings = {
				  "url": "https://test.zamkanapp.com/api/login/login/",
				  "method": "POST",
				  "timeout": 0,
				  "processData": false,
				  "mimeType": "multipart/form-data",
				  "contenttype":"application/json",
				  "data": JSON.stringify(jsonDATA)
				};

				$.ajax(settings).done(function (response) {
				  
				  	response = JSON.parse(response);

				  	if(response[0] == false){

				  		app.dialog.alert(response[1],"LOGIN FAILURE!");
				  		return;

				  	}else if (response[0] == true){

				  		// set local storage
				  		localStorage.setItem("id",response[1].id);
				  		localStorage.setItem("type",response[1].type);
				  		localStorage.setItem("name",response[1].name);
				  		localStorage.setItem("last_name",response[1].last_name);
				  		localStorage.setItem("mobile",response[1].mobile);
				  		localStorage.setItem("email",response[1].email);
				  		localStorage.setItem("city_id",response[1].city_id);
				  		localStorage.setItem("country",response[1].country);
				  		localStorage.setItem("area",response[1].area);
				  		localStorage.setItem("street",response[1].street);
				  		localStorage.setItem("villa",response[1].villa);
				  		localStorage.setItem("email_verified",response[1].email_verified);
				  		localStorage.setItem("package",response[1].package);
				  		localStorage.setItem("review",response[1].review);
				  		localStorage.setItem("profile",response[1].profile);
				  		localStorage.setItem("updated_at",response[1].updated_at);
				  		localStorage.setItem("api",response[1].api);


				  		mainView.router.navigate({ name: 'index' });

				  	}else{

				  		app.dialog.alert('Unable to logged in.',"LOGIN FAILURE!");
				  		return;
				  	}



				  	if(localStorage.getItem("cart_total") == undefined || localStorage.getItem("cart_total") == '' || localStorage.getItem("cart_total") == null){
						$(".cart_count_span").html('0');
					}else{
						$(".cart_count_span").html(localStorage.getItem("cart_total"));
					}
				  	

				});

			})
		}


		if(page.route.name == "registration"){

			getcitylist();

			$(".submit-register").on("click", function(){

				var fname = $("#first_name").val();
				var email = $("#email").val();
				var location = $("#location").val();
				var last_name = $("#last_name").val();
				var phone_no = $("#phone_no").val();
				var mainpassword = $("#mainpassword").val();
				var retypepassword = $("#retypepassword").val();

				if(fname == ""){
					app.dialog.alert('Please enter first name.',"");
				  	return;
				}else if(email == ""){
					app.dialog.alert('Please enter email id.',"");
				  	return;
				}else if(location == ""){
					app.dialog.alert('Please location.',"");
				  	return;
				}else if(phone_no == ""){
					app.dialog.alert('Please enter mobile number.',"");
				  	return;
				}else if(mainpassword == ""){
					app.dialog.alert('Please enter password.',"");
				  	return;
				}else if(retypepassword == ""){
					app.dialog.alert('Please enter retype password.',"");
				  	return;
				}else if(retypepassword != mainpassword){
					app.dialog.alert('Retype password are not matching.',"");
				  	return;
				}

				// jsonDATA = {

				// 	"first_name":fname,
				// 	"last_name":email,
				// 	"email":location,
				// 	"mobile":phone_no,
				// 	"password":mainpassword,
				// 	"password2":mainpassword,
				// 	"city":1
				// }


				var form = new FormData();
				form.append("first_name", fname);
				form.append("last_name", last_name);
				form.append("email", email);
				form.append("mobile", phone_no);
				form.append("password", mainpassword);
				form.append("password2", retypepassword);
				form.append("city", "1");



				var settings = {
				  "url": "https://test.zamkanapp.com/api/login/register/",
				  "method": "POST",
				  "timeout": 0,
				  "processData": false,
				  "mimeType": "multipart/form-data",
				  "contentType": false,
				  "data": form
				};

				$.ajax(settings).done(function (response) {
				  
				  	response = JSON.parse(response);

				  	if(response[0] == false){

				  		app.dialog.alert(response[1],"REGISTRATION FAILED!");
				  		return;

				  	}else if (response[0] == true){

				  		app.dialog.alert("You are successfully registered to zamkan.","REGISTRATION SUCCESS!");
				  		setTimeout(function(){  
				  			mainView.router.navigate({ name: 'login-type' });
				  		}, 3000);

				  	}else{

				  		app.dialog.alert('Unable to logged in.',"REGISTRATION FAILED!");
				  		return;
				  	}

				});

			})

		}



		// $(".logout-account").on("click", function(){
		// 	// myApp.closePanel();
		// 	localStorage.clear();
		// 	localStorage.setItem("first_open_app_page","1");
		// 	mainView.router.navigate({ name: 'index' });
		// });


		$(".myaccount-check").on("click", function(){
			// myApp.closePanel();
			if(localStorage.getItem("id") != "" && localStorage.getItem("id") != null && localStorage.getItem("id") != undefined)
		    {
		  
		        mainView.router.navigate({ name: 'myaccount' });

		    }else{
		        mainView.router.navigate({ name: 'login-type' });
		    } 

		});

		$(".myjobs-check").on("click", function(){
			// myApp.closePanel();
			if(localStorage.getItem("id") != "" && localStorage.getItem("id") != null && localStorage.getItem("id") != undefined)
		    {
		        mainView.router.navigate({ name: 'job' });
		    }else{
		        mainView.router.navigate({ name: 'login-type' });
		    } 
		});

	    if(page.route.name == "myaccount"){
	    	var firstname = localStorage.getItem('name');
		    var lastname = (localStorage.getItem('last_name') != 'null')?localStorage.getItem('last_name'):'';
		    var country = (localStorage.getItem('country') != 'null')?localStorage.getItem('country'):'';
	
	    	$(".myaccount-username").html(firstname+' '+lastname);
	    	$('.myaccount-username-location').html(country);
	    }
 
		if(page.route.name == "select-location"){

			app.preloader.show();
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
				  		var respData = respon[1];
				  		var optionHtml = ''; 
				  		for (var i = 0; i < respData.length; i++) {
				  			if (localStorage.getItem('selected-location') == undefined || localStorage.getItem('selected-location') == null  || localStorage.getItem('selected-location') == '') {
					  			if (i == 0) {
					  				var optioncheck = 'checked';
					  			}else{
					  				var optioncheck = '';
					  			}
				  			}else{
				  				if (localStorage.getItem('selected-location') == respData[i].name) {
				  					var optioncheck = 'checked';
				  				}else{
				  					var optioncheck = '';
				  				}
				  			}

				  			optionHtml += '<li>'+
							                '<label class="item-radio item-radio-icon-end item-content">'+
							                 '<input type="radio" '+optioncheck+' class="location-select" name="citylocation" data-name="'+respData[i].name+'" value="'+respData[i].id+'"/>'+
							                 '<i class="icon icon-radio"></i>'+
							                  '<div class="item-inner">'+
							                    '<div class="item-title" style="text-transform: uppercase;">'+respData[i].name+'</div>'+
							                  '</div>'+
							                '</label>'+
							              '</li>';
				  	
				  		}
				  		
				  		$('.citylistloc').html(optionHtml);

				  		$('input:radio[name="citylocation"]').change(
				  			
					    function(){
					        if ($(this).is(':checked')) {
					            // append goes here
					            var thisvalue = $(this).attr('data-name');
					            $('#setvaluecity').val(thisvalue);
				 				
					        }
					    });
				  	}
				  	app.preloader.hide();	
				});
				
	    	
	    	    
			 
			
			$(".savelocation").on("click", function(){
				
				 if($('.location-select').is(':checked')){ 
				 	var datacheckedname = $('#setvaluecity').val();
				 
				 	localStorage.setItem('selected-location',datacheckedname);
				    mainView.router.navigate({ name: 'index' });
				 
				 }else{
				 	// alert('dsdsf');
				 }
			});

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
				  		for (var i = 0; i < respData.length; i++) {
				  			
				  			optionHtml += '<option value="'+respData[i].id+'">'+respData[i].name+'</option>';
				  	
				  		}
				  		$('.citylist').html(optionHtml);

				  	}
				  	
				});
			}

	 //    $("body").on('click', '.toggle-password', function() {
		//     $(this).toggleClass("fa-eye-slash fa-eye");
		//     var input = $("#password");
		//     if (input.attr("type") === "password") {
		//       input.attr("type", "text");
		//     } else {
		//       input.attr("type", "password");
		//     }

		// });

});


