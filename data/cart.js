export let cart;
loadFomStorage();
export function loadFomStorage(){
  cart=JSON.parse(localStorage.getItem('CART'));
  if (!cart) {
    cart = [{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId:'1'
    }, {
      productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId:'2'
    }];
  }
}
export function displayQuantity(){
  let cartQuantity=0;
  cart.forEach((cartItem)=>{
      cartQuantity+=cartItem.quantity;
  });
  document.querySelector('.js-return-to-home-link').innerHTML=`${cartQuantity} items`;
}
export function saveToStorage(){
  localStorage.setItem('CART',JSON.stringify(cart));
}
export function resetCart() {
  cart = [];
  saveToStorage();
}
export function addToCart(productId){
  let matchingItem;
  let quantity=Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    cart.forEach((cartItem)=>{
      if(productId===cartItem.productId){
        matchingItem=cartItem;
      }
    });
    if(matchingItem){
      matchingItem.quantity+=quantity;
    }
    else{
    cart.push({
      productId, 
      quantity,
      deliveryOptionId:'1'
    });
    }
    saveToStorage();
}
export function addToCartFromOrders(productId){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId===cartItem.productId){
      matchingItem=cartItem;
    }
  });
  if(matchingItem){
    matchingItem.quantity+=1;
  }
  else{
  cart.push({
    productId, 
    quantity:1,
    deliveryOptionId:'1'
  });
  }
  saveToStorage();
}
export function removeFromCart(productId){
  let newCart=[];
  cart.forEach((cartItem)=>{
    if(cartItem.productId!==productId){
      newCart.push(cartItem);
    }
  });
  cart=newCart;
  saveToStorage();
  displayQuantity();
}
export function updateQuantity(productId,newQuantity){
  let matchingItem;
  cart.forEach((item)=>{
    if(item.productId===productId){
      matchingItem=item;
    }
  });
  matchingItem.quantity=newQuantity;
  saveToStorage();
  displayQuantity();
}
export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingItem;
  cart.forEach((item)=>{
    if(item.productId===productId){
      matchingItem=item;
    }
  });
  if(!matchingItem)
    return;
  matchingItem.deliveryOptionId=deliveryOptionId;
  saveToStorage();
}
export function loadCart(fun){
  let xhr=new XMLHttpRequest();
  xhr.addEventListener('load',()=>{
    console.log(xhr.response);
    fun();
  });
  xhr.open('GET','https://supersimplebackend.dev/cart');
  xhr.send();
}
export async function loadCartFetch() {
  const response = await fetch('https://supersimplebackend.dev/cart');
  const text = await response.text();
  console.log(text);
  return text;
}