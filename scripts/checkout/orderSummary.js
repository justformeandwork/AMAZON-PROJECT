import {cart,removeFromCart,displayQuantity,updateQuantity,updateDeliveryOption} from '../../data/cart.js';
import {products,getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {calculateDeliveryDate, deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
export function renderOrderSummary(){
  let cartSummaryHTML='';
  cart.forEach((cartItem)=>{
    let productId=cartItem.productId;
    let matchingProduct=getProduct(productId);
    let deliveryOptionId=cartItem.deliveryOptionId;
    let deliveryOption=getDeliveryOption(deliveryOptionId);
    let dateString=calculateDeliveryDate(deliveryOption);
    cartSummaryHTML+=`
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name js-product-name-${matchingProduct.id}">
              ${matchingProduct.name}
            </div>
            <div class="product-price js-product-price-${matchingProduct.id}">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input class="quantity-input js-quantity-input-${matchingProduct.id}">
              <span class="save-quantity-link js-save-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
              <span class="delete-quantity-link link-primary
              js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct,cartItem)}
          </div>
        </div>
      </div>
    `;
  });
  function deliveryOptionsHTML(matchingProduct,cartItem){
    let html='';
    deliveryOptions.forEach((deliveryOption)=>{
      const dateString=calculateDeliveryDate(deliveryOption);
      const priceString=deliveryOption.priceCents===0?'FREE':`$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked=deliveryOption.id===cartItem.deliveryOptionId;
      html+=`
        <div class="delivery-option js-delivery-option
        js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked?'checked':''}
            class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    });
    return html;
  }
  if(cart.length<=0){
    document.querySelector('.js-order-summary').innerHTML=`
  <div>
  Your cart is empty.
  </div>
  <div>
  <button class="view-products">View products</button>
  <button class="view-orders">View orders</button>
  </div>
  `;
  document.querySelector('.view-products').addEventListener('click',()=>{
    window.location.href='amazon.html';
  });
  document.querySelector('.view-orders').addEventListener('click',()=>{
    window.location.href='orders.html';
  });
  }
  else{
  document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;
  document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click',()=>{
      let productId=link.dataset.productId;    
      removeFromCart(productId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
  displayQuantity();
  document.querySelectorAll('.js-update-quantity-link').forEach((item)=>{
    item.addEventListener('click',()=>{
      let productId=item.dataset.productId;
      document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
    });
  });
  document.querySelectorAll('.js-save-link').forEach((item)=>{
    item.addEventListener('click',()=>{
      let productId=item.dataset.productId;
      document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
      let newQuantity=Number(document.querySelector(`.js-quantity-input-${productId}`).value);
      if(newQuantity<=0 || newQuantity>1000){
        alert('Quantity must be at least 0 and less than 1000');
      }
      else{
      updateQuantity(productId,newQuantity);
      document.querySelector(`.js-cart-item-container-${productId} .quantity-label`).innerHTML=newQuantity;
      }
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click',()=>{
      const productId=element.dataset.productId;
      const deliveryOptionId=element.dataset.deliveryOptionId;
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
}