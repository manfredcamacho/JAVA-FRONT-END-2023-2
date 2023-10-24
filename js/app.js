let form = document.getElementById("buy-tickets-form");
let name = document.getElementById("name");
let lastname = document.getElementById("lastname");
let email = document.getElementById("email");
let category = document.getElementById("category");
let quantity = document.getElementById("quantity");
let total = document.getElementById("total");

const TICKET_PRICE = 200;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let subtotal = TICKET_PRICE * quantity.value;
  let discount = getPercentageDiscount(category.value) * subtotal;

  total.innerHTML = subtotal - discount;
});

form.addEventListener("reset", (event) => {
  total.innerHTML = 0;
});

const getPercentageDiscount = (category) => {
  if (category == 1) return 0.8;
  if (category == 2) return 0.5;
  return 0.15;
};
