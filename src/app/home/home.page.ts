import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiginixService } from '../diginix.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

user:any={name:'',last_name:''};
selected_city:any={id:0,name:"Select City",name_ar:"اختر مدينة"}
app_banner:any=[];


slideOptsOne = {
 initialSlide: 0,
 slidesPerView: 1,
 autoplay:true
};


services:any=[
{
title:"Cleaning Services",
title_ar:"التنظيف",
products:[ 
	{
		title:"Home Cleaning",
		title_ar:"المنزل",
		image:"https://content3.jdmagicbox.com/comp/chennai/s8/044pxx44.xx44.190325110016.a4s8/catalogue/safai-house-cleaning-services-chennai-0btwq3ivpi.jpg?clr=3a3a2c",
		form_id:77,
		slug:"servicehomecleaning",
	},
	{
		title:"Deep Cleaning",
		title_ar:"عميق",
		image:"https://homeprofessionals.org/wp-content/uploads/house-cleaning-service-5.jpg",
		form_id:34,
		slug:"servicedeepcleaning",
	},
	{
		title:"Senitization Services",
		title_ar:"التشيخ",
		image:"https://cdn.mrright.in/cdn/content/assets/2020-5/medium/0bc788ef8da746e2a95fdf4ffbbc84c2-shutterstock_1682326498.jpg",
		form_id:38,
		slug:"servicesanitization",
	}
]
},


{
title:"Maintenance Services",
title_ar:"الصيانة",
products:[
	{
		title:"AC Cleaning",
		title_ar:"المكيفات",
		image:"https://www.maproservices.com/images/resource/ac_1.jpg",
		form_id:72,
		slug:"servicehandyman",
		payload:{}
	},
	{
		title:"Appliance Repair and Installation",
		title_ar:"إصلاح الأجهزة وتركيبها",
		image:"https://3.imimg.com/data3/BJ/TC/MY-20266512/fridge-repair-500x500.jpeg",
		form_id:71,
		slug:"serviceappliancerepair",
		payload:{}
	},
	{
		title:"AC Repair",
		title_ar:"إصلاح مكيفات الهواء",
		image:"https://clareservices.com/wp-content/uploads/2020/07/air-conditioning-repair-service-hyderabad.jpg",
		form_id:72,
		slug:"servicehandyman",
		payload:{service_type:'ac_repair'}
	},
	{
		title:"Handyman",
		title_ar:"عامل يدوي",
		image:"https://www.venturef0rth.com/wp-content/uploads/2019/09/handyman-business-names.jpg",
		form_id:43,
		slug:"servicehandyman",
		payload:{service_type:'general_work'}
	},
	{
		title:"Electrician",
		title_ar:"عامل الكهرباء",
		image:"https://professional-electrician.com/wp-content/uploads/2019/05/NICEIC.jpg",
		form_id:78,
		slug:"servicehandyman",
		payload:{service_type:'electrical_work'}
	},
	{
		title:"Plumber",
		title_ar:"سباك",
		image:"https://3gt0nhu0ij8432xn03lq3lff-wpengine.netdna-ssl.com/wp-content/uploads/2015/11/VIGILANT-plumber-fixing-a-sink-shutterstock_132523334-e1448389230378-620x400.jpg",
		form_id:79,
		slug:"servicehandyman",
		payload:{service_type:'plumbing'}
	},
	
]
},



{
title:"Moving and storage services",
title_ar:"خدمات النقل والتخزين",
products:[
	{
		title:"Moving my home",
		title_ar:"نقل منزلي",
		image:"https://coolbuzz.org/wp-content/uploads/2014/08/Moving-House.jpg",
		form_id:36,
		slug:"servicemovingmyhome",
		payload:{}
	},
	{
		title:"Book a truck",
		title_ar:"احجز شاحنة",
		image:"https://dial2hire.com/images/img_large_1.jpg",
		form_id:99,
		slug:"servicebookatruck",
		payload:{}
	},
	{
		title:"Moving Internationally",
		title_ar:"تتحرك دوليا",
		image:"https://www.chessmoving.com.au/images/Blog/2015/06_June/7_Ways_to_Reduce_Stress_During_an_International_Move-259017.jpg",
		form_id:37,
		slug:"servicemoveinternational",
		payload:{}
	},
	{
		title:"Storage",
		title_ar:"تخزين",
		image:"https://www.arbycartage.com/wp-content/uploads/2017/02/storage.jpg",
		form_id:48,
		slug:"servicestorage",
		payload:{}
	},
	
]
},



{
title:"Pest Control",
title_ar:"مكافحة الآفات",
products:[ 
	{
		title:"Cockroaches",
		title_ar:"الصراصير",
		image:"https://5.imimg.com/data5/MC/LC/GLADMIN-48799173/cockroaches-control-service-500x500.jpg",
		form_id:85,
		slug:"servicepestcontrol",
		payload:{service_type:'cockroaches'}
	},
	{
		title:"Ants",
		title_ar:"النمل",
		image:"https://thegardeningcook.com/wp-content/uploads/2018/03/ant-trail.jpg",
		form_id:85,
		slug:"servicepestcontrol",
		payload:{service_type:'ants'}
	},
	{
		title:"Bed Bugs",
		title_ar:"بق الفراش",
		image:"https://www.nyccarpetcleaners.com/uploads/712335c526f006b180e242fbebde4a3e1c874d65-248",
		form_id:85,
		slug:"servicepestcontrol",
		payload:{service_type:'bed_bugs'}
	},
	{
		title:"Pest Control",
		title_ar:"مكافحة الآفات",
		image:"https://media.istockphoto.com/photos/man-spraying-pesticide-in-kitchen-picture-id928077000?k=6&m=928077000&s=612x612&w=0&h=Va-V9eMYC6msiJC_kCHOMw-HgXKQYUD9gp8GheMsHgE=",
		form_id:85,
		slug:"servicepestcontrol",
		payload:{service_type:'general'}
	},
]
},



{
title:"Painting",
title_ar:"لوحة",
products:[
	{
		title:"Move in move out painting",
		title_ar:"اللوحة",
		image:"https://handymanrepair.com.sg/wp-content/uploads/2019/09/painting-service-1.jpg",
		form_id:0,
		slug:"",
		payload:{}
	},
	{
		title:"Have a custom request?",
		title_ar:"لديك طلب مخصص؟",
		image:"https://i.pinimg.com/originals/fd/4a/2d/fd4a2d32637ac45181ab5cce0dfae38a.jpg",
		form_id:0,
		slug:"",
		payload:{}
	},
	
]
},




{
title:"Specialty Cleaning",
title_ar:"المتخصص",
products:[
	{
		title:"Carpet Cleaning",
		title_ar:"السجاد",
		image:"https://5.imimg.com/data5/ID/PV/MY-49748500/carpet-cleaning-services-500x500.jpg",
		form_id:52,
		slug:"servicecarpetcleaning",
		payload:{}
	},
	{
		title:"Mattress Cleaning",
		title_ar:"تنظيف",
		image:"https://thehappyhousecleaning.co.uk/wp-content/uploads/2018/08/Mattress-cleaning-services-page-pic1.jpg",
		form_id:53,
		slug:"servicemattresscleaning",
		payload:{}
	},
	{
		title:"Sofa Cleaning",
		title_ar:"الأريكة",
		image:"https://5.imimg.com/data5/ZK/YW/HC/SELLER-96092479/sofa-cleaning-services-500x500.jpg",
		form_id:54,
		slug:"servicesofacleaning",
		payload:{}
	},
	{
		title:"Water Tank Cleaning",
		title_ar:"تنظيف خزانات المياه",
		image:"https://www.maxicareme.com/images/residential-water-tank-cleaning.jpg",
		form_id:70,
		slug:"servicewatertankcleaning",
		payload:{}
	}
	
]
}

];



loadform(data){

	if(data.form_id==0){
		this.diginix.toast(this.diginix.translate("Form not available","النموذج غير متوفر"),200);
		return false;
	}
	if(data.slug==""){
		this.diginix.toast(this.diginix.translate("Form not available, Slug Connection pending.","النموذج غير متاح ، اتصال Slug معلق."),200);
		return false;
	}

this.router.navigate(["/"+data.slug],{ queryParams: data.payload });
//this.router.navigate(["/"+data.slug],{ queryParams: { title: data.title,form_id:data.form_id } });

}



  constructor(private router: Router,public diginix:DiginixService,) { 


  

  }


  ngOnInit() {


  this.diginix.callapi('data/appbanner',"",{},true).then((d)=>{
  	this.app_banner=d;
  	console.log(d);
  });

  this.user=JSON.parse(window.localStorage.getItem("user"));
  console.log('this is we',this.diginix.selected_city);
  this.selected_city=this.diginix.selected_city;

  
  }

homecleaning(){
  	this.router.navigate(['/servicehomecleaning'],{ queryParams: { name: 'nishantpandey' } })
  }


change_language(){
	this.diginix.language_switch();
}

}
