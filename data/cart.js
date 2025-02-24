export let cart=JSON.parse(localStorage.getItem('CART'));
if (!cart) {
  cart = [{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
  }, {
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }];
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
      quantity
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