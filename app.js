

//constants
const publishablekey="pk_test_51NAggdEW0riwgQYpd5vtjW54xcKe1pvCKXheET6QOLWRb5NqLIdvibn4KtDhjX42btzJpwn2kdX0MLCTfG41B7fb00UwLLzjj3";
const stripe_fullpass_link="buy_btn_1Np3uQEW0riwgQYpGVHaURt4";
const stripe_partypass_link="buy_btn_1NqE6uEW0riwgQYpKxStaK0o";


//get buttons
const btnStripeFullpass = document.getElementById('button-fullpass-stripe');
const btnStripePartypass = document.getElementById('button-partypass-stripe');
const btnPaypalFullpass = document.getElementById('button-fullpass-paypal');
const btnPaypalPartypass = document.getElementById('button-partypass-paypal');

//Displayable Sections
const btnArtists = document.getElementById('titleArtists');
const btnDJs = document.getElementById('titleDJs');
const btnWorkshops = document.getElementById('titleWorkshops');
const btnPerformers = document.getElementById('titlePerformers');

//event listener sections
btnArtists.addEventListener('click', displayArtistSection );
btnDJs.addEventListener('click', displayDJsSection );
btnWorkshops.addEventListener('click', displayWorkshopssSection );
btnPerformers.addEventListener('click', displayPerformersSection );

//event listener buttons
btnStripeFullpass.addEventListener('click', function () { showStripebutton(stripe_fullpass_link);});
btnStripePartypass.addEventListener('click', function () { showStripebutton(stripe_partypass_link);});


btnPaypalFullpass.addEventListener('click', function () { showPaypalbutton(stripe_fullpass_link);});
btnPaypalPartypass.addEventListener('click', function () { showPaypalbutton(stripe_partypass_link);});

//show sections 
function displayArtistSection() {
  var x = document.getElementById("Artistscontainer");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  } 
};

function displayDJsSection() {
  var x = document.getElementById("DJscontainer");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  } 
};

function displayPerformersSection() {
  var x = document.getElementById("ContainerPerformers");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  } 
};

function displayWorkshopssSection() {
  var x = document.getElementById("ContainerWorkshops");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  } 
};





//show stripe payment
function showStripebutton(id) { 


    var displayTable = ""
    displayTable += "<stripe-buy-button";
    displayTable += " id=\""+id+"\" buy-button-id=\""+id+"\"  publishable-key=\""+publishablekey+"\">";
    displayTable += "</stripe-buy-button>";


    const element_stripe = document.getElementById('stripe');
    element_stripe.innerHTML = displayTable;
    const element_paypal = document.getElementById('paypal_div');
    element_paypal.innerHTML = "";
    
};


function showPaypalbutton() {
    var ticket = "Fullpass";
    var price_ticket = "99 EUR";

    var displayTable = ""
    displayTable +='<div id="smart-button-container">';
    displayTable +='<div style="text-align: center;">';
    displayTable +='<div style="margin-bottom: 1.25rem;">';
    displayTable +='<p>FRANKFURT SPRING BACHATHON 2023</p>';
    displayTable +='<select id="item-options"><option value="Ticket" >'+ticket+"-"+price_ticket+'</option></select>';
    displayTable +='<select style="visibility: hidden" id="quantitySelect"></select>';
    displayTable +='</div>';
    displayTable +='<div id="paypal-button-container"></div>';
    displayTable +='</div>';
    displayTable +='</div>';

    const element_stripe = document.getElementById('stripe');
    element_stripe.innerHTML = "";
    const element_paypal = document.getElementById('paypal_div');
    element_paypal.innerHTML = displayTable;

    initPayPalButton();


    
};

/// NUR BESTIMMTE ZAHLUNGSARTEN ZULASSEN
///https://developer.paypal.com/sdk/js/configuration/#disable-funding

function initPayPalButton() {
var shipping = 0;
var quantity = parseInt();
var quantitySelect = document.querySelector("#smart-button-container #quantitySelect");
if (!isNaN(quantity)) {
quantitySelect.style.visibility = "visible";
}
var orderDescription = 'FRANKFURT SPRING BACHATHON 2023';
if(orderDescription === '') {
orderDescription = 'Item';
}
paypal.Buttons({
style: {
  shape: 'rect',
  color: 'gold',
  layout: 'vertical',
  label: 'paypal',
  
},
createOrder: function(data, actions) {
  var selectedItemDescription = "FULLPASS";
  var selectedItemPrice = parseFloat(99);
  var tax = (0 === 0 || false) ? 0 : (selectedItemPrice * (parseFloat(0)/100));
  //selectedItemPrice*.19 Umsatzsteuer 
  quantity = 1;
  
  tax *= quantity;
  tax = Math.round(tax * 100) / 100;
  console.log(tax);
  var priceTotal = quantity * selectedItemPrice + parseFloat(shipping) + tax;
  priceTotal = Math.round(priceTotal * 100) / 100;
  var itemTotalValue = Math.round((selectedItemPrice * quantity) * 100) / 100;

  return actions.order.create({
    purchase_units: [{
      description: orderDescription,
      amount: {
        currency_code: 'EUR',
        value: priceTotal,
        breakdown: {
          item_total: {
            currency_code: 'EUR',
            value: itemTotalValue,
          },
          shipping: {
            currency_code: 'EUR',
            value: shipping,
          },
          tax_total: {
            currency_code: 'EUR',
            value: tax,
          }
        }
      },
      items: [{
        name: selectedItemDescription,
        unit_amount: {
          currency_code: 'EUR',
          value: selectedItemPrice,
        },
        quantity: quantity
      }]
    }]
  });
},
onApprove: function(data, actions) {
  return actions.order.capture().then(function(orderData) {
    
    // Full available details
    console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

    // Show a success message within this page, e.g.
    const element = document.getElementById('paypal-button-container');
    element.innerHTML = '';
    element.innerHTML = '<h3>Thank you for your payment!</h3>';

    // Or go to another URL:  actions.redirect('thank_you.html');

  });
},
onError: function(err) {
  console.log(err);
},
}).render('#paypal-button-container');
}


/*

function initPayPalButton() {
    var shipping = 0;
    var itemOptions = document.querySelector("#smart-button-container #item-options");
    console.log(itemOptions);
var quantity = parseInt();
var quantitySelect = document.querySelector("#smart-button-container #quantitySelect");
if (!isNaN(quantity)) {
  quantitySelect.style.visibility = "visible";
}
var orderDescription = 'FRANKFURT SPRING BACHATHON 2023';
if(orderDescription === '') {
  orderDescription = 'Item';
}
paypal.Buttons({
  style: {
    shape: 'rect',
    color: 'gold',
    layout: 'vertical',
    label: 'paypal',
    
  },
  createOrder: function(data, actions) {
    var selectedItemDescription = itemOptions.options[itemOptions.selectedIndex].value;
    var selectedItemPrice = parseFloat(itemOptions.options[itemOptions.selectedIndex].getAttribute("price"));
    var tax = (0 === 0 || false) ? 0 : (selectedItemPrice * (parseFloat(0)/100));
    if(quantitySelect.options.length > 0) {
      quantity = parseInt(quantitySelect.options[quantitySelect.selectedIndex].value);
    } else {
      quantity = 1;
    }

    tax *= quantity;
    tax = Math.round(tax * 100) / 100;
    var priceTotal = quantity * selectedItemPrice + parseFloat(shipping) + tax;
    priceTotal = Math.round(priceTotal * 100) / 100;
    var itemTotalValue = Math.round((selectedItemPrice * quantity) * 100) / 100;

    return actions.order.create({
      purchase_units: [{
        description: orderDescription,
        amount: {
          currency_code: 'EUR',
          value: priceTotal,
          breakdown: {
            item_total: {
              currency_code: 'EUR',
              value: itemTotalValue,
            },
            shipping: {
              currency_code: 'EUR',
              value: shipping,
            },
            tax_total: {
              currency_code: 'EUR',
              value: tax,
            }
          }
        },
        items: [{
          name: selectedItemDescription,
          unit_amount: {
            currency_code: 'EUR',
            value: selectedItemPrice,
          },
          quantity: quantity
        }]
      }]
    });
  },
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(orderData) {
      
      // Full available details
      console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

      // Show a success message within this page, e.g.
      const element = document.getElementById('paypal-button-container');
      element.innerHTML = '';
      element.innerHTML = '<h3>Thank you for your payment!</h3>';

      // Or go to another URL:  actions.redirect('thank_you.html');

    });
  },
  onError: function(err) {
    console.log(err);
  },
}).render('#paypal-button-container');
}


*/