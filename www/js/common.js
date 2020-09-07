/****************************************************
 *  Function: validateEmail
 *  Description: Function to validate email address
 *              provided by the user
 ****************************************************/
function validateEmail(email) {

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

var calendarModal = app.calendar.create({
  inputEl: '#demo-calendar-modal',
  openIn: 'customModal',
  header: true,
  footer: true,
});

