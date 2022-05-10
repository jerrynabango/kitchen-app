function MealOrder(snacks, drinks, stew, servings, greens) {
  this.snacks = snacks;
  this.drinks = drinks;
  this.stew = stew;
  this.servings = servings;
  this.greens = greens;
  this.address;
}

function Snacks() {
  this.Cake = 50;
  this.Bread = 30;
  this.Mandazi = 20;
  this.Samosa = 40;
  this.Kebab = 70;
}

function Drinks() {
  this.Soda = 30;
  this.Water = 30;
  this.Tea = 20;
  this.Coffee = 20;
  this.Juice = 30;
}

function Stew() {
  this.Beef = 100;
  this.Chicken = 120;
  this.Beans = 50;
  this.Ndengu = 50;
  this.Peas = 60;
}

function Servings() {
  this.Rice = 40;
  this.Chips = 100;
  this.Chapati = 40;
  this.Ugali = 40;
  this.Potatoes = 60;
}

function Greens() {
  this.Spinach = 20;
  this.Cabbage = 10;
  this.Sukuma = 10;
  this.Traditional = 20;
}

function Address(fName, lName, room) {
  this.fName = fName;
  this.lName = lName;
  this.room = room;
}

Address.prototype.fullName = function () {
  return this.fName + " " + this.lName;
};

var orderSnacks = [];
var orderDrinks = [];
var orderStew = [];
var orderServings = [];
var orderGreens = [];
var orderPrices = [];
var grandTotalsArray = [];

$(document).ready(function () {
  $(".removeOrder")
    .last()
    .click(function () {
      $(this).parentsUntil("#new-designs").remove();
    });
  $("button#addMeal").click(function () {
    $("#new-designs").append(htmlString);
    $(".checkoutHide").show();
    $(".removeOrder")
      .last()
      .click(function () {
        $(this).parentsUntil("#new-designs").remove();
      });
  });
  $("form#myForm").submit(function (event) {
    event.preventDefault();
    $(".new-design").each(function () {
      var thisSnack = [];
      var thisDrink = [];
      var thisStew = [];
      var thisServing = [];
      var thisGreens = [];
      $(this)
        .find('input[name="snack"]:checked')
        .each(function () {
          thisSnack.push(this.value);
        });
      $(this)
        .find('input[name="drink"]:checked')
        .each(function () {
          thisDrink.push(this.value);
        });
      $(this)
        .find('input[name="stew"]:checked')
        .each(function () {
          thisStew.push(this.value);
        });
      $(this)
        .find('input[name="serving"]:checked')
        .each(function () {
          thisServing.push(this.value);
        });
      $(this)
        .find('input[name="greens"]:checked')
        .each(function () {
          thisGreens.push(this.value);
        });
      orderSnacks.push(thisSnack);
      orderDrinks.push(thisDrink);
      orderStew.push(thisStew);
      orderServings.push(thisServing);
      orderGreens.push(thisGreens);
    });
    var validateResult = validate(
      orderSnacks,
      orderDrinks,
      orderStew,
      orderServings,
      orderGreens
    );
    if (validateResult === false) {
      return false;
    }
    var orderObject = new MealOrder(
      orderSnacks,
      orderDrinks,
      orderStew,
      orderServings,
      orderGreens
    );
    $("#new-designs").children().remove();
    $(".checkoutHide").hide();
    $(".yourAddress").remove();
    $(".deliveryAsk").remove();
    ordersDisplay(orderObject);
    clearOrder(orderObject);
    $(".deliveryDiv").remove();
  });
});

function validate(snacks, drinks, stew, servings, greens) {
  if (
    snacks.length < 1 &&
    drinks.length < 1 &&
    stew.length < 1 &&
    servings.length < 1 &&
    greens.length < 1
  ) {
    $(".checkoutHide").hide();
    alert("Order at least one meal");
    return false;
  }
}

function ordersDisplay(orderObject) {
  $(".yourOrder").show();
  $(".orderSummary").append(
    '<div class="col-12 padTop">' +
      "<h5>Orders you just submitted</h5>" +
      "</div>"
  );
  for (var orderNum = 0; orderNum < orderObject.snacks.length; orderNum += 1) {
    var orderSn = orderObject.snacks[orderNum];
    var orderDr = orderObject.drinks[orderNum];
    var orderSt = orderObject.stew[orderNum];
    var orderSv = orderObject.servings[orderNum];
    var orderGr = orderObject.greens[orderNum];
    var orderPrice = priceDeterminer(
      orderSn,
      orderDr,
      orderSt,
      orderSv,
      orderGr
    );
    $(".orderSummary").append(
      '<div class="col-12 col-md-6 col-lg-3 padTop">' +
        '<div class="order-bg-color">' +
        "<h5>Order: " +
        (orderNum + 1).toString() +
        "</h5>" +
        "<h6>Snacks</h6>" +
        "<p>" +
        orderSn.join(", ") +
        "</p>" +
        "<h6>Drinks</h6>" +
        "<p>" +
        orderDr.join(", ") +
        "</p>" +
        "<h6>Stew</h6>" +
        "<p>" +
        orderSt.join(", ") +
        "</p>" +
        "<h6>Servings</h6>" +
        "<p>" +
        orderSv.join(", ") +
        "</p>" +
        "<h6>Greens</h6>" +
        "<p>" +
        orderGr.join(", ") +
        "</p><br><br><br>" +
        '<div class="bottom-align">' +
        "<strong><h6>Price</h6></strong>" +
        "<p>Ksh. " +
        orderPrice +
        "<p>" +
        "</div>" +
        "</div>" +
        "</div>"
    );
  }
  var orderTotals = totalPrice();
  $(".orderSummary").append(
    '<div class="col-12 padTop">' +
      "<div>" +
      '<span id="orderTotals">Total: Ksh. ' +
      orderTotals +
      "</span><br><br>" +
      "</div>" +
      "</div>" +
      '<div class="col-12 deliveryAsk">' +
      '<span id="question">Want your orders delivered? </span>' +
      '<button type="button" class="btn btn-sm btn-outline-secondary yes">Yes</button>' +
      " " +
      '<button type="button" class="btn btn-sm btn-secondary no">No</button>' +
      "</div>"
  );
  $(".no").click(function () {
    $(".deliveryAsk").remove();
    $(".deliveryDiv").remove();
    $(".yourOrder").append(
      '<div class="yourAddress">' +
        '<div class="row">' +
        '<div class="col-12">' +
        '<span class="grand-total">Grand Total: Ksh. ' +
        grandTotalPrice() +
        "</span>" +
        "</div>" +
        "</div>" +
        "</div>"
    );
  });
  $(".yes").click(function () {
    $(".deliveryAsk").remove();
    $(".deliveryDiv").remove();
    $(".yourOrder").append(
      '<div class="deliveryDiv">' +
        '<div class="row">' +
        '<div class="col-12">' +
        '<form id="deliveryForm">' +
        "<h5>Your Address</h5>" +
        '<div class="form-group">' +
        '<input type="text" class="form-control" id="firstName" placeholder="First Name" required>' +
        "</div>" +
        '<div class="form-group">' +
        '<input type="text" class="form-control" id="lastName" placeholder="Last Name" required>' +
        "</div>" +
        '<div class="form-group">' +
        '<input type="text" class="form-control" id="room" placeholder="Room" required>' +
        "</div>" +
        '<button type="submit" class="btn btn-secondary">Submit</button>' +
        "</form>" +
        "</div>" +
        "</div>" +
        "</div>"
    );
    $(document).on("submit", "#deliveryForm", function (e) {
      e.preventDefault();
      var inputtedFName = $("input#firstName").val();
      var inputtedLName = $("input#lastName").val();
      var inputtedRoom = $("input#room").val();
      $(".deliveryDiv").remove();
      var addressObject = new Address(
        inputtedFName,
        inputtedLName,
        inputtedRoom
      );
      $(".yourOrder").append(
        '<div class="yourAddress">' +
          '<div class="row">' +
          '<div class="col-12">' +
          "<h5>Your orders will be delivered here after payment:</h5>" +
          "<p>Name: " +
          addressObject.fullName() +
          "</p>" +
          "<p>Room: " +
          addressObject.room +
          "</p>" +
          "</div>" +
          "</div>" +
          '<div class="row">' +
          '<div class="col-12">' +
          '<span class="grand-total">Grand Total: Ksh. ' +
          grandTotalPrice() +
          "</span>" +
          "</div>" +
          "</div>" +
          "</div>"
      );
      $(this).off(e);
    });
  });
}

function priceDeterminer(orderSn, orderDr, orderSt, orderSv, orderGr) {
  var snackObj = new Snacks();
  var drinkObj = new Drinks();
  var stewObj = new Stew();
  var servingObj = new Servings();
  var greensObj = new Greens();
  var orderPrice = 0;
  orderSn.forEach(function (ordSn) {
    orderPrice = orderPrice + snackObj[ordSn];
  });
  orderDr.forEach(function (ordDr) {
    orderPrice = orderPrice + drinkObj[ordDr];
  });
  orderSt.forEach(function (ordSt) {
    orderPrice = orderPrice + stewObj[ordSt];
  });
  orderSv.forEach(function (ordSv) {
    orderPrice = orderPrice + servingObj[ordSv];
  });
  orderGr.forEach(function (ordGr) {
    orderPrice = orderPrice + greensObj[ordGr];
  });
  orderPrices.push(orderPrice);
  return orderPrice;
}

function totalPrice() {
  var total = 0;
  orderPrices.forEach(function (orderPrice) {
    total = total + orderPrice;
  });
  clearOrderPrices();
  grandTotalsArray.push(total);
  return total;
}

function clearOrderPrices() {
  for (var index = 0; index <= orderPrices.length + 1; index += 1) {
    orderPrices.pop();
  }
}

function grandTotalPrice() {
  var total = 0;
  grandTotalsArray.forEach(function (grandTotal) {
    total = total + grandTotal;
  });
  return total;
}

function clearOrder(orderObject) {
  for (var index = 0; index <= orderObject.snacks.length + 1; index += 1) {
    orderObject.snacks.pop();
    orderObject.drinks.pop();
    orderObject.stew.pop();
    orderObject.servings.pop();
    orderObject.greens.pop();
    orderSnacks.pop();
    orderDrinks.pop();
    orderStew.pop();
    orderServings.pop();
    orderGreens.pop();
  }
}

/*----HTML ORDER FORM----*/
var htmlString =
  '<div class="new-design">' +
  '<div class="meal-design-form">' +
  '<div class="row padding">' +
  '<div class="col-12 text-right">' +
  '<span class="removeOrder"><span class="fa fa-times-circle"></span></span>' +
  "</div>" +
  "</div>" +
  '<div class="row">' +
  "<!--Snacks-->" +
  '<div class="col-12 col-md-6">' +
  "<h4>Snacks</h4>" +
  '<table class="table table-borderless table-hover table-sm">' +
  "<thead>" +
  '<th scope="col">Snack</th>' +
  '<th scope="col">Price</th>' +
  "</thead>" +
  "<tbody>" +
  "<tr>" +
  "<td>" +
  '<div class="form-group form-check">' +
  '<input type="checkbox" name="snack" value="Cake">' +
  "<label>Cake</label>" +
  "</div>" +
  "</td>" +
  "<td>50</td>" +
  "</tr>" +
  "<tr>" +
  "<td>" +
  '<div class="form-group form-check">' +
  '<input type="checkbox" name="snack" value="Bread">' +
  "<label>Bread</label>" +
  "</div>" +
  "</td>" +
  "<td>30</td>" +
  "</tr>" +
  "<tr>" +
  "<td>" +
  '<div class="form-group form-check">' +
  '<input type="checkbox" name="snack" value="Mandazi">' +
  "<label>Mandazi</label>" +
  "</div>" +
  "</td>" +
  "<td>20</td>" +
  "</tr>" +
  "<tr>" +
  "<td>" +
  '<div class="form-group form-check">' +
  '<input type="checkbox" name="snack" value="Samosa">' +
  "<label>Samosa</label>" +
  "</div>" +
  "</td>" +
  "<td>40</td>" +
  "</tr>" +
  "<tr>" +
  "<td>" +
  '<div class="form-group form-check">' +
  '<input type="checkbox" name="snack" value="Kebab">' +
  "<label>Kebab</label>" +
  "</div>" +
  "</td>" +
  "<td>70</td>" +
  "</tr>" +
  "</tbody>" +
  "</table>" +
  "</div>" +
  "<!--Drinks-->" +
  '<div class="col-12 col-md-6">' +
  "<h4>Drinks</h4>" +
  '<table class="table table-borderless table-hover table-sm">' +
  "<thead>" +
  '<th scope="col">Drink</th>' +
  '<th scope="col">Price</th>' +
  "</thead>" +
  "<tbody>" +
  "<tr>" +
  "<td>" +
  '<div class="form-group form-check">' +
  '<input type="checkbox" name="drink" value="Soda">' +
  "<label>Soda</label>" +
  "</div>" +
  "</td>" +
  "<td>30</td>" +
  "</tr>" +
  "<tr>" +
  "<td>" +
  '<div class="form-group form-check">' +
  '<input type="checkbox" name="drink" value="Water">' +
  "<label>Water</label>" +
  "</div>" +
  "</td>" +
  "<td>30</td>" +
  "</tr>" +
  "<tr>" +
  "<td>" +
  '<div class="form-group form-check">' +
  '<input type="checkbox" name="drink" value="Tea">' +
  "<label>Tea</label>" +
  "</div>" +
  "</td>" +
  "<td>20</td>" +
  "</tr>" +
  "<tr>" +
  "<td>" +
  '<div class="form-group form-check">' +
  '<input type="checkbox" name="drink" value="Coffee">' +
  "<label>Coffee</label>" +
  "</div>" +
  "</td>" +
  "<td>20</td>" +
  "</tr>" +
  "<tr>" +
  "<td>" +
  '<div class="form-group form-check">' +
  '<input type="checkbox" name="drink" value="Juice">' +
  "<label>Mango juice</label>" +
  "</div>" +
  "</td>" +
  "<td>30</td>" +
  "</tr>" +
  "</tbody>" +
  "</table>" +
  "</div>" +
  "<!--Stew-->" +
  '<div class="col-12 col-md-6">' +
  "<h4>Stew</h4>" +
  '<table class="table table-borderless table-hover table-sm">' +
  "<thead>" +
  '<th scope="col">Stew</th>' +
  '<th scope="col">Price</th>' +
  "</thead>" +
  "<tbody>" +
  "<tr>" +
  "<td>" +
  '<div class="form-group form-check">' +
  '<input type="checkbox" name="stew" value="Beef">' +
  "<label>Beef</label>" +
  "</div>" +
  "</td>" +
  "<td>100</td>" +
  "</tr>" +
  "<tr>" +
  "<td>" +
  '<div class="form-group form-check">' +
  '<input type="checkbox" name="stew" value="Chicken">' +
  "<label>Chicken</label>" +
  "</div>" +
  "</td>" +
  "<td>120</td>" +
  "</tr>" +
  "<tr>" +
  "<td>" +
  '<div class="form-group form-check">' +
  '<input type="checkbox" name="stew" value="Beans">' +
  "<label>Beans</label>" +
  "</div>" +
  "</td>" +
  "<td>50</td>" +
  "</tr>" +
  "<tr>" +
  "<td>" +
  '<div class="form-group form-check">' +
  '<input type="checkbox" name="stew" value="Ndengu">' +
  "<label>Ndengu</label>" +
  "</div>" +
  "</td>" +
  "<td>50</td>" +
  "</tr>" +
  "<tr>" +
  "<td>" +
  '<div class="form-group form-check">' +
  '<input type="checkbox" name="stew" value="Peas">' +
  "<label>Peas</label>" +
  "</div>" +
  "</td>" +
  "<td>60</td>" +
  "</tr>" +
  "</tbody>" +
  "</table>" +
  "</div>" +
  "<!--Served with-->" +
  '<div class="col-12 col-md-6">' +
  "<h4>Served with</h4>" +
  '<table class="table table-borderless table-hover table-sm">' +
  "<thead>" +
  '<th scope="col">Serving</th>' +
  '<th scope="col">Price</th>' +
  "</thead>" +
  "<tbody>" +
  "<tr>" +
  "<td>" +
  '<div class="form-group form-check">' +
  '<input type="checkbox" name="serving" value="Rice">' +
  "<label>Rice</label>" +
  "</div>" +
  "</td>" +
  "<td>40</td>" +
  "</tr>" +
  "<tr>" +
  "<td>" +
  '<div class="form-group form-check">' +
  '<input type="checkbox" name="serving" value="Chips">' +
  "<label>Chips</label>" +
  "</div>" +
  "</td>" +
  "<td>100</td>" +
  "</tr>" +
  "<tr>" +
  "<td>" +
  '<div class="form-group form-check">' +
  '<input type="checkbox" name="serving" value="Chapati">' +
  "<label>Chapati</label>" +
  "</div>" +
  "</td>" +
  "<td>40</td>" +
  "</tr>" +
  "<tr>" +
  "<td>" +
  '<div class="form-group form-check">' +
  '<input type="checkbox" name="serving" value="Ugali">' +
  "<label>Ugali</label>" +
  "</div>" +
  "</td>" +
  "<td>40</td>" +
  "</tr>" +
  "<tr>" +
  "<td>" +
  '<div class="form-group form-check">' +
  '<input type="checkbox" name="serving" value="Potatoes">' +
  "<label>Mashed Potatoes</label>" +
  "</div>" +
  "</td>" +
  "<td>60</td>" +
  "</tr>" +
  "</tbody>" +
  "</table>" +
  "</div>" +
  '<div class="col-12 col-md-6">' +
  "<h4>Greens</h4>" +
  '<table class="table table-borderless table-hover table-sm">' +
  "<thead>" +
  '<th scope="col">Greens</th>' +
  '<th scope="col">Price</th>' +
  "</thead>" +
  "<tbody>" +
  "<tr>" +
  "<td>" +
  '<div class="form-group form-check">' +
  '<input type="checkbox" name="greens" value="Spinach">' +
  "<label>Spinach</label>" +
  "</div>" +
  "</td>" +
  "<td>20</td>" +
  "</tr>" +
  "<tr>" +
  "<td>" +
  '<div class="form-group form-check">' +
  '<input type="checkbox" name="greens" value="Cabbage">' +
  "<label>Cabbage</label>" +
  "</div>" +
  "</td>" +
  "<td>10</td>" +
  "</tr>" +
  "<tr>" +
  "<td>" +
  '<div class="form-group form-check">' +
  '<input type="checkbox" name="greens" value="Sukuma">' +
  "<label>Sukuma Wiki</label>" +
  "</div>" +
  "</td>" +
  "<td>10</td>" +
  "</tr>" +
  "<tr>" +
  "<td>" +
  '<div class="form-group form-check">' +
  '<input type="checkbox" name="greens" value="Traditional">' +
  "<label>Traditional</label>" +
  "</div>" +
  "</td>" +
  "<td>20</td>" +
  "</tr>" +
  "</tbody>" +
  "</table>" +
  "</div>" +
  "</div>" +
  "</div>" +
  "</div>";
