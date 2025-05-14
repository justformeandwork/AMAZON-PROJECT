import { products,getProduct,loadProductsFetch } from "../data/products.js";
import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
await loadProductsFetch();
let url=new URL(window.location.href);
let product=getProduct(url.searchParams.get('productId'));
let orderId=url.searchParams.get('orderId');
let order;
let orderProduct;
orders.forEach(element => {
  if(element.id===orderId)
    order=element;
});
order.products.forEach(element => {
  if(element.productId===url.searchParams.get('productId'))
    orderProduct=element;
});
const today = dayjs();
const orderTime = dayjs(order.orderTime);
const deliveryTime = dayjs(orderProduct.estimatedDeliveryTime);
const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;
const deliveredMessage = today < deliveryTime ? 'Arriving on' : 'Delivered on';
let trackingHTML=`
<div class="order-tracking">
  <button class="view-all-orders">
    View all orders
  </button>

  <div class="delivery-date">
    ${deliveredMessage} ${dayjs(orderProduct.estimatedDeliveryTime).format('dddd, MMMM D')}
  </div>

  <div class="product-info">
    ${product.name}
  </div>

  <div class="product-info">
    Quantity: ${orderProduct.quantity}
  </div>

  <img class="product-image" src="${product.image}">

  <div class="progress-labels-container">
    <div class="progress-label ${percentProgress < 50 ? 'current-status' : ''}">
      Preparing
    </div>
    <div class="progress-label ${
      (percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''
    }">
      Shipped
    </div>
    <div class="progress-label ${
      percentProgress >= 100 ? "current-status" : ''
    }">
      Delivered
    </div>
  </div>

  <div class="progress-bar-container">
    <div class="progress-bar" style="width:${percentProgress}%"></div>
  </div>
</div>
`;
document.querySelector('.main').innerHTML=trackingHTML;
document.querySelector('.view-all-orders').addEventListener('click',()=>{
  window.location.href='orders.html';
});