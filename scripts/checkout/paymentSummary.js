import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";
export function renderPaymentSummary(){
  let productPriceCents=0;
  let shippingPriceCents=0;
  let cartQuantity=0;
  cart.forEach((cartItem)=>{
    let product=getProduct(cartItem.productId);
    productPriceCents+=product.priceCents*cartItem.quantity;
    let deliveryOption=getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents+=deliveryOption.priceCents;
    cartQuantity+=cartItem.quantity;
  });
  let totalBeforeCost=productPriceCents+shippingPriceCents;
  let taxCents=totalBeforeCost*0.1;
  let totalCents=taxCents+totalBeforeCost;
  const paymentSummaryHTML=`
      <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${cartQuantity}):</div>
        <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money js-payment-summary-shipping">$${formatCurrency(shippingPriceCents)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeCost)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money js-payment-summary-total">$${formatCurrency(totalCents)}</div>
      </div>

      <button class="place-order-button button-primary js-place-order">
        Place your order
      </button>
  `;
  document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;
  document.querySelector('.js-place-order').addEventListener('click',async ()=>{
    try{
      let respone=await fetch('https://supersimplebackend.dev/orders',{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({
          cart:cart
        })
      });
      let order=await respone.json();
      addOrder(order);
    }catch(error){
      console.log('Unexpected error. Please try again later.');
    }
    window.location.href='orders.html';
  });
}