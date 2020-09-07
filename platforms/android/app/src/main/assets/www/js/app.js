// Dom7
var $$ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}


// Init App
var app = new Framework7({
  popover: {
    closeByBackdropClick: false,
  },
  id: 'io.framework7.testapp',
  root: '#app',
  theme: theme,
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
      form_data:{}
    };
  },
  methods: {
    click: function () {
      app.dialog.alert('Hello World!');
    },
  },
  routes: routes,
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },
});

var mainView = app.views.create('.view-main');
var popover  = app.popover.create({ /* parameters */ });

var swipeToClosePopup = app.popup.create({
  el: '.popup-swipe-to-close',
  swipeToClose: true,
});

var calendarModal = app.calendar.create({
  inputEl: '#demo-calendar-modal',
  openIn: 'customModal',
  header: true,
  footer: true,
});

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

  if(localStorage.getItem("lang_rotation") == null || localStorage.getItem("lang_rotation") == undefined){
      localStorage.setItem("lang_rotation","ltr");
    }

     //alert("yesss");
    // /**********************************
    // check if already logged in
    // **********************************/
    // if(localStorage.getItem("id") != "" && localStorage.getItem("id") != null && localStorage.getItem("id") != undefined)
    // {
        // mainView.router.navigate({ name: 'dashboard' });
    // }

    /***************************************
     *      Handling the click event
     *      of mobile Back Button
     ***************************************/
    document.addEventListener("backbutton", onBackKeyDown, false);  
    function onBackKeyDown(e) {
        // alert(app.views.main.router.currentRoute.name);
        if(app.views.main.router.currentRoute.name == "index"){

          navigator.app.exitApp();

        }else if(app.views.main.router.currentRoute.name == "/" || app.views.main.router.currentRoute.name == "home" || app.views.main.router.currentRoute.name === undefined){

          navigator.app.exitApp();

        }else{

          app.views.main.router.back();

        }
        
    }
}