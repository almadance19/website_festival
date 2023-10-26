
// after loading 
window.addEventListener('DOMContentLoaded', getInit);


///get data
function getInit() {
  //initPayPalButton();
  //getData();
  getUser();
};

// call API COURSES
const url = 'https://script.google.com/macros/s/AKfycbwKUYsgJEnRJcFJaR2_9-RL16mK6uqaKgMmIxqiJJUXRS3aaAA76aSB2uQaf6hm8L3j/exec';

const url_ticket = 'https://script.google.com/macros/s/AKfycbxxMBD8CovNgtVky37G6Kkfvp3ba-xHgsjvTqewz8nLaNoorZElDcry7se8RMW5Yfmz/exec';

//get buttons 
const output = document.querySelector('.output');
const btn_ticket = document.getElementById('get_ticket_btn');

//event listener buttons 
btn_ticket.addEventListener('click', showPayment);

//get user fields

const emailinput = document.getElementById("User_email");
const nameinput = document.getElementById("User_name");  
const coursesinput = document.getElementById("User_courses");  
const idinput = document.getElementById("User_id");  
const activeinput = document.getElementById("User_active"); 
const lastpaymentinput = document.getElementById("User_lastpayment");  
const saldoinput = document.getElementById("User_saldo");  
const anmerkungeninput = document.getElementById("User_anmerkungen");  
const nextpaymentinput = document.getElementById("User_nextpayment");


// get users data 
function getUser() {
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const param_value = urlParams.get('code')
    console.log(param_value);
    nextpaymentinput.value = param_value ;
    //var email_value = document.querySelector('input[name=email]').value;
    //var param_value = 'cs_test_b1xpdTLVaCKt08hp62mdGKfbCsVarlBfNacqwabzJFFreUYbnfWmU6QUzk';
      if (param_value != '') {

        urlapi = url+"?code="+param_value
        console.log(urlapi);
        output.innerHTML = "Data loading...";
        console.log("fetching user data");
        fetch(urlapi).then(function (rep) {
          return rep.json()
        }).then(function (data) {
          console.log(data);

          if (data=="NOTHING FOUND") {
            output.innerHTML = "";
            document.getElementById("success_message").innerHTML = "Ticket already Processed";
            document.getElementById("name_display").innerHTML = "You can still send you the ticket to another Email." ;
            
            idinput.value = "";

          } else {
          output.innerHTML = "";
          console.log("creating ticket payment");
  
            document.getElementById("name_display").innerHTML = data["user"][5];
            document.getElementById("user_message").innerHTML = "Eine Email von info@alma-dance.com mit dem Ticket wurde geschickt. Bitte prüft auch deinen Spamordner.";
            document.getElementById("success_message").innerHTML = "Your Booking is completed";
            activeinput.innerHTML = "You can send you the ticket to another Email.";
            
            emailinput.innerHTML = data["user"][3];
            nameinput.innerHTML = data["user"][5];
            coursesinput.innerHTML = data["user"][9];
            idinput.value = data["user"][3];
            
            lastpaymentinput.innerHTML = data["user"][13];
            saldoinput.innerHTML = data["user"][7]+' '+data["user"][15];
            anmerkungeninput.innerHTML = "You received just now an Email with the Ticket & Invoice. Please check also in your spam folder.";

            }

        });
        } else {
          output.innerHTML = "Valides Email eingeben";
        }
  }


// get users data 
function showPayment() {
    const email = idinput.value;
    const param_value = nextpaymentinput.value;
    console.log(param_value+email);
    //var email_value = document.querySelector('input[name=email]').value;
    //var param_value = 'cs_test_b1xpdTLVaCKt08hp62mdGKfbCsVarlBfNacqwabzJFFreUYbnfWmU6QUzk';
      if (param_value != '') {

        urlapi = url_ticket+"?code="+param_value+"&mail="+email
        console.log(urlapi);
        output.innerHTML = "Data loading...";
        console.log("fetching user data");
        fetch(urlapi).then(function (rep) {
          return rep.json()
        }).then(function (data) {
          console.log(data);

          if (data=="NOTHING FOUND") {
            output.innerHTML = "";
            document.getElementById("success_message").innerHTML = "Ticket already Processed";
            document.getElementById("name_display").innerHTML = "You can still send you the ticket to another Email." ;

          } else {
          output.innerHTML = "";
          console.log("fetching payment");
  
            document.getElementById("name_display").innerHTML = data["user"][5];
            document.getElementById("user_message").innerHTML = "Eine Email von info@alma-dance.com mit dem Ticket wurde geschickt. Bitte prüft auch deinen Spamordner.";
            document.getElementById("success_message").innerHTML = "Your Ticket was sent:";
            
            emailinput.innerHTML = data["user"][3];
            nameinput.innerHTML = data["user"][5];
            coursesinput.innerHTML = data["user"][9];
            idinput.innerHTML = "";
            activeinput.innerHTML = "";
            lastpaymentinput.innerHTML = data["user"][13];
            saldoinput.innerHTML = data["user"][7]+' '+data["user"][15];
            anmerkungeninput.innerHTML = "You received just now an Email with the Ticket & Invoice. Please check also in your spam folder.";
            nextpaymentinput.innerHTML = "";

            }

        });
        } else {
          output.innerHTML = "Valides Email eingeben";
        }
  }

//// MESSAGES -----------------------------------------------

const url_message = 'https://script.google.com/macros/s/AKfycbwKUYsgJEnRJcFJaR2_9-RL16mK6uqaKgMmIxqiJJUXRS3aaAA76aSB2uQaf6hm8L3j/exec';

const form_message = document.getElementById("summit");

form_message.addEventListener('click', handleFormSubmit);



function handleFormSubmit(formObject){
var firstname = document.getElementById("first_name").value;
var message = document.getElementById("message").value;
var email = document.getElementById("email").value;

if(firstname != '' && message != ''   && email != '' ) {
  document.getElementById("summit").disabled = true;
  document.getElementById("display_success").innerHTML = "Loading your Subscription/ Deine Anmeldung wird hochgeladen";
//send menssage 
  let arr = [ firstname,message,email];
  console.log(arr);
  sData(arr);

} else {
  var alert = "There are misssing informations, please fill out the form/ Die Angaben sind unvollständig, bitte füllen Sie das Formular aus";
  //document.getElementById("output").innerHTML = innerHTML = '<div class="alert alert-danger" role="alert">'+ alert +'!</div>'; 
}
}


      // Save Booking hl
function sData(arr) {
  let formData = new FormData();
  formData.append('data', JSON.stringify(arr));
  console.log("posting registration in API")
  fetch(url_message, {
    method: 'POST'
    , body: formData
  }).then(function (rep) {
    return rep.json()
  }).then(function (data) {
     console.log("Subscribed");
  })
};