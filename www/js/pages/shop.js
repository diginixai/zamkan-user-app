//Shop
// In page events:
var APIURL = "https://test.zamkanapp.com/";
$$(document).on('page:init', function (e, page) {
  
  
	function updateCart(key,q){

		var form = {
					    "customer_id":localStorage.getItem("id"),
					    "quantity":q,
					    "cart_key":key,
					};


     	var settings = {
		  "url": APIURL+"api/user/update_cart",
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
			app.dialog.alert('Cart successfully updated!', 'Success');

		});
	}

	function deleteCart(key,q){

		var form = {
					    "customer_id":localStorage.getItem("id"),
					    "cart_key":key,
					};


     	var settings = {
		  "url": APIURL+"api/user/remove_cart",
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
			// response = JSON.parse(response);
			localStorage.setItem("cart_total",response[1].length);
			$(".cart_count_span").html(response[1].length);

			app.dialog.alert('Item successfully deleted from cart!', 'Success');
			$("#items_list_inner_"+key).hide(100);

		});

	}


  function getsubcategory(){

  	/*
	**** Sub category list
  	*/
  	// var form = "{\r\n    \"category_id\":\"12\"\r\n}";
	var settings = {
	  "url": APIURL+"api/shop/getCategories",
	  "method": "GET",
	  "timeout": 0,
	  "processData": false,
	  "mimeType": "multipart/form-data",
	  "contentType": false
	};
	 app.preloader.show();
	$.ajax(settings).done(function (response) {
		// console.log(response); return false;
		// console.log(JSON.parse('{\n    \"form_type\": \"international-movers\",\n    \"first_name\": \"Nishant\",\n    \"last_name\":\"Pandey\",\n    \"mobile\":\"+919889797416\",\n    \"email\": \"nnishantsigra@gmail.com\",\n    \"adr1\": \"adr1\",\n    \"adr2\": \"adr2\",\n    \"date\":\"2020-07-30\",\n    \"city_id\": \"6\",\n    \"description\": \"test enquiry\",\n    \"service_provider\": [1,2,3,4,5,6],\n    \"meta\": {\n       \"type\": \"international\",\n       \"from_country\":\"UAE\",\n       \"from_address\":\"Flat123\",\n       \"from_country\": \"India\",\n       \"from_address\": \"Flat123,234,345345\",\n       \"date\":\"2020-07-30\",\n       \"move_size\":\"2 Bedroom Apartment\",\n       \"Handyman\":true,\n       \"storage\":true,\n       \"carshipping\":true,\n       \"detail\":\"please send me the quote asap\"\n   }\n   \n\n}'));
		 app.preloader.hide();

	  response = JSON.parse(response);
      // console.log(response);
	  // set up html
	  html = '';

	  if(response[0] == true){

	  	main_html = '';
	  	for(var i in response[1])
	  	{

			subcat_html = '';
		    for(var j in response[1][i].subcat)
	  		{
	  			subcat_html += '<li class="accordion-item">'+
				                    '<a href="/product-list/" class="item-content item-link">'+response[1][i].subcat[j].name+'</a>'+
							    '</li>';
	  		}

			main_html += '<li class="accordion-item"><a href="#" class="item-content item-link">'+
					        '<div class="item-inner">'+
					            '<div class="item-title" style="color: #4a5256;">'+response[1][i].name+'</div>'+
					        '</div></a>'+
					        '<div class="accordion-item-content">'+
					            '<div class="block">'+
                                    '<ul>'+
						               subcat_html+
								    '</ul>'+
					            '</div>'+
					        '</div>'+
					     '</li>';
	  	}

	  	html = main_html;

	  }
	   $("#all-subcategory").html(html);

	});
  }


    
  function getproductDetails(){

  	if(localStorage.getItem("cart_total") == undefined || localStorage.getItem("cart_total") == '' || localStorage.getItem("cart_total") == null){
		$(".cart_count_span").html('0');
	}else{
		$(".cart_count_span").html(localStorage.getItem("cart_total"));
	}


  	/*
	**** Product Detail
  	*/
  	var prdid = localStorage.getItem('productID');

  	var form = "{\r\n    \"id\":\""+prdid+"\"\r\n}";
	var settings = {
	  "url": APIURL+"api/serviceprovider/getProductById",
	  "method": "POST",
	  "timeout": 0,
	  "processData": false,
	  "mimeType": "multipart/form-data",
	  "contentType": false,
	  "data": form
	
	};
	// app.preloader.show();
	$.ajax(settings).done(function (response) {
		
		
		// app.preloader.hide();

	  	response = JSON.parse(response); 
	  	app.data.selected_product = response;
	   	html = '';

		  if(response != ''){

		  	
		  		// console.log(response[1][i].id);
		  	var	main_html = '<div class="row"><img src="'+APIURL+response.product_image+'" class="col-100" alt="banner1"> </div>'+
							    '<div class="block">'+
							      '<div class="prductlist  content-block">'+
							          '<h2 class="maintitle col-100 ">'+response.name+'</h2>'+
							          '<h3 class="col-100 color-green">AED '+response.sku.regular_price+'</h3>'+
							          '<p class=""> This product is already at its best price</p>'+
							    '</div>'+
						        '<hr>'+
						        '<div class="content-block productdata ">'+
						          '<h3 class="col-100">Description</h3>'+              
						          '<p>'+response.description+'</p>'+
						        '</div>'+
						       '</div><br><br>';


		  	html = main_html;
		  	$("#all-productDetails").html(html);
		  	$(".productView").html(response.name);
		  	$("#addtocart").attr("data-itemid",response.id);
        }
	  

	});
  }
   
   if(page.route.name == "categories"){


     getsubcategory();

   }

   if(page.route.name == "product-list"){

   	$$("#my_cart_top").on('click', function(){
   	 	if(localStorage.getItem("id") == "" || localStorage.getItem("id") == null || localStorage.getItem("id") == undefined)
	    {
	        mainView.router.navigate({ name: 'login-type' });
	    }else{
	    	mainView.router.navigate({ name: 'my-cart' });
	    }
   	 });

   	
    function getproductList(){

    	//set cart total
    	if(localStorage.getItem("cart_total") == undefined || localStorage.getItem("cart_total") == '' || localStorage.getItem("cart_total") == null){
			$(".cart_count_span").html('0');
    	}else{
			$(".cart_count_span").html(localStorage.getItem("cart_total"));
    	}
    	



	  	/*
		**** Product List
	  	*/
	  	// var form = "{\r\n    \"category_id\":\"12\"\r\n}";
		var settings = {
		  "url": APIURL+"api/serviceprovider/getAllActiveProducts",
		  "method": "GET",
		  "timeout": 0,
		  "processData": false,
		  "mimeType": "multipart/form-data",
		  "contentType": false
		
		};
		// app.preloader.show();
		$.ajax(settings).done(function (response) {
			
			// console.log(JSON.parse('{\n    \"form_type\": \"international-movers\",\n    \"first_name\": \"Nishant\",\n    \"last_name\":\"Pandey\",\n    \"mobile\":\"+919889797416\",\n    \"email\": \"nnishantsigra@gmail.com\",\n    \"adr1\": \"adr1\",\n    \"adr2\": \"adr2\",\n    \"date\":\"2020-07-30\",\n    \"city_id\": \"6\",\n    \"description\": \"test enquiry\",\n    \"service_provider\": [1,2,3,4,5,6],\n    \"meta\": {\n       \"type\": \"international\",\n       \"from_country\":\"UAE\",\n       \"from_address\":\"Flat123\",\n       \"from_country\": \"India\",\n       \"from_address\": \"Flat123,234,345345\",\n       \"date\":\"2020-07-30\",\n       \"move_size\":\"2 Bedroom Apartment\",\n       \"Handyman\":true,\n       \"storage\":true,\n       \"carshipping\":true,\n       \"detail\":\"please send me the quote asap\"\n   }\n   \n\n}'));
			// app.preloader.hide();

		  response = JSON.parse(response);

		   html = '';

		  if(response != ''){

		  	main_html = '';
		  	for(var i in response)
		  	{
		  		// console.log(response[1][i].id);
		  		main_html += '<div class="card col-50" >'+
		  		                '<a href="#" data-pid="'+response[i].id+'" class="productid" >'+
		  		                   '<div class="banner productblock"> <img src="'+APIURL+response[i].product_image+'" class="col-100" alt="banner1" style="border-radius: 5px 5px 0px 0px;height: 130px;"> </div>'+
		  		                   '<div class="card-content">'+
		  		                       '<div class="content-block productdata ">'+
			  		                      '<h3 class="maintitle col-100 " style="color: #000;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">'+response[i].name+'</h3>'+
			  		                      '<h3 class="col-40" style="font-weight: 500;">AED '+response[i].sku.regular_price+'</h3>'+
			  		                      '<div class="clear"></div>'+
			  		                   '</div>'+
			  		               '</div>'+
			  		            '</a>'+
	            			  '</div>';

		  	}

		  	html = main_html;
		  	$("#all-productList").html(html);
		    $(".productid").on("click", function(){ 

		     var pid = $(this).attr('data-pid');
		     // alert(pid);
		     localStorage.setItem('productID',pid);

		     mainView.router.navigate({ name: 'productdetails' });

		    });

		  }
		   

		});

	  } 
     getproductList();

       

   }
   if(page.route.name == "productdetails"){
   	 $$("#my_cart_top2").on('click', function(){
   	 	if(localStorage.getItem("id") == "" || localStorage.getItem("id") == null || localStorage.getItem("id") == undefined)
	    {
	        mainView.router.navigate({ name: 'login-type' });
	    }else{
	    	mainView.router.navigate({ name: 'my-cart' });
	    }
   	 });


     getproductDetails();

     $$("#addtocart").on('click', function(){
      	
      	if(localStorage.getItem("id") == "" || localStorage.getItem("id") == null || localStorage.getItem("id") == undefined)
	    {
	  
	        mainView.router.navigate({ name: 'login-type' });

	    }else{


     	app.data.itemIdToCart = $("#addtocart").data("itemid");

     	// add to cart
     	var form = {
					    "customer_id":localStorage.getItem("id"),
					    "items": [
					        {
					            "id":app.data.itemIdToCart,
					            "quantity":"1"
					        }
					    ]
					};


     	var settings = {
		  "url": APIURL+"api/user/add_cart",
		  "method": "POST",
		  "timeout": 0,
		  "processData": false,
		  "mimeType": "multipart/form-data",
		  "contentType": false,
		  "data": JSON.stringify(form)
		
		};

		app.preloader.show();
		$.ajax(settings).done(function (response) {

			response = JSON.parse(response);
			app.preloader.hide();
			app.notification.create({
			  
			  title: 'Added',
			  titleRightText: 'now',
			  subtitle: 'Success',
			  text: 'New item added to cart',
			  closeTimeout: 2000,
			});
			localStorage.setItem("cart_total",response[1].length);
			$(".cart_count_span").html(response[1].length);
			mainView.router.navigate({ name: 'my-cart' });
		});
	}
     
	    });


   }

   if(page.route.name == "my-cart"){

   		var form = {
					    "customer_id":localStorage.getItem("id")
					};


     	var settings = {
		  "url": APIURL+"api/user/get_cart",
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
				
				response = JSON.parse(response);
				html = '';
				total = 0;
				for(var i in response[1]){
					options='';
					for(var k=1;k<=response[1][i].quantity;k++){
						options += '<option value='+k+'>'+k+'</option>';
					}
					total += response[1][i].total;
					html += '<div class="card tablet-50" id="items_list_inner_'+response[1][i].key+'">'+
				                '<div class="card-content"> '+
				                    '<div class="banner productblock"> '+
				                      '<img src="'+APIURL+response[1][i].image+'" class="col-100" alt="banner1"> '+
				                      '<a class="cartfloating floating-button color-red cart_delete" data-itemid="'+response[1][i].key+'" href="#" ><i class="fa fa-trash"></i></a>'+ 
				                      
				                      '<select class="qselect" data-itemid="'+response[1][i].key+'">'+
				                        options+
				                      '</select> '+
				                    '</div>'+
				                    '<div class="content-block productdata ">'+
				                        '<h2 class="maintitle col-100 ">'+response[1][i].name+'</h2>'+
				                        '<h3 class="col-100">$ '+response[1][i].price+'</h3>'+
				                        '<div class="item-subtitle star color-amber ">★★★★☆</div>'+
				                        '<div class="clear"></div>'+
				                    '</div>'+
				                    '<div class="clear"></div>'+
				                '</div>'+
				            '</div>';
				}

				$("#cart_list_div").html(html);
				$("#item_total").html(total);

				localStorage.setItem("cart_total_amount",total);
				localStorage.setItem("cart_total",response[1].length);
				$(".cart_count_span").html(response[1].length);

				$(".qselect").on("change",function(){
					
					updateCart($(this).data("itemid"),$(this).val());
				});


				$(".cart_delete").on("click",function(){
					
					deleteCart($(this).data("itemid"),$(this).val());
				});

		});

   }


   if(page.route.name == "shopreview"){

   		
   		$("#total_amount").html(localStorage.getItem("cart_total_amount"));

   		_afterVat = (5 * Number(localStorage.getItem("cart_total_amount"))) / 100;
   		
   		$("#afterVAT").html(_afterVat);

   		_total_to_pay = Number(_afterVat) + Number(localStorage.getItem("cart_total_amount"));

   		$("#total_to_pay").html(_total_to_pay);


   	$("#clickConfirm").on("click", function(){

 		
 		if(localStorage.getItem("id") == null || localStorage.getItem("id") == undefined || localStorage.getItem("id") == ''){

 			app.dialog.alert("Please login","Alert!");
 			return;

 		}

 		if($("input[name='my-radio']:checked").val() == "card"){

 			telrService.start();

 		}else{

 			// console.log(objectifyForm($(".service-form").serializeArray()));
 		// formdata = app.data.form_data;
 		// customerData = {

 		// 	"adr1":localStorage.getItem("villa"),
 		// 	"adr2":localStorage.getItem("area") + localStorage.getItem("street"),
 		// 	// "city_id":Number(localStorage.getItem("city_id")),
 		// 	"city_id":6,
 		// 	"date":"2020/07/24",
 		// 	"description":localStorage.getItem("review"),
 		// 	"email":localStorage.getItem("email"),
 		// 	"first_name":localStorage.getItem("name"),
 		// 	"form_type":"NA",
 		// 	"last_name":localStorage.getItem("last_name"),
 		// 	"mobile":localStorage.getItem("mobile"),
 		// 	"service_provider":[0,1,2]

 		// }

 		// //merging
 		// customerData.meta = formdata;
 		// console.log(JSON.stringify(JSON.stringify(customerData)));
 		// var settings = {
			//   "url": "https://test.zamkanapp.com/api/enquiry/create/",
			//   "method": "POST",
			//   "timeout": 0,
			//   "headers": {
			//     "api": localStorage.getItem("api")
			//   },
			//   "data": JSON.stringify(customerData),
			// };
			// app.preloader.show();
			// $.ajax(settings).done(function (response) {
			//   app.preloader.hide();
			//   console.log(response);
			//   mainView.router.navigate({ name: 'booking-success' });
			  
			// });
			mainView.router.navigate({ name: 'booking-success' });
 		}	
 		// 

 		

 		
 	});
   		
   }
   



});