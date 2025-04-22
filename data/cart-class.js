class Cart{
  cartItems;
  #storageKey;
  constructor(storageKey){
    this.#storageKey=storageKey;
    this.#loadFomStorage();
  }
  #loadFomStorage(){
    this.cartItems=JSON.parse(localStorage.getItem(this.#storageKey));
    if (!this.cartItems) {
      this.cartItems = [{
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
  displayQuantity(){
    let cartQuantity=0;
    this.cartItems.forEach((cartItem)=>{
        cartQuantity+=cartItem.quantity;
    });
    document.querySelector('.js-return-to-home-link').innerHTML=`${cartQuantity} items`;
  }
  saveToStorage(){
    localStorage.setItem(this.#storageKey,JSON.stringify(this.cartItems));
  }
  addToCart(productId){
    let matchingItem;
    let quantity=Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
      this.cartItems.forEach((cartItem)=>{
        if(productId===cartItem.productId){
          matchingItem=cartItem;
        }
      });
      if(matchingItem){
        matchingItem.quantity+=quantity;
      }
      else{
      this.cartItems.push({
        productId, 
        quantity,
        deliveryOptionId:'1'
      });
      }
      this.saveToStorage();
  }
  removeFromCart(productId){
    let newCart=[];
    this.cartItems.forEach((cartItem)=>{
      if(cartItem.productId!==productId){
        newCart.push(cartItem);
      }
    });
    this.cartItems=newCart;
    this.saveToStorage();
    this.displayQuantity();
  }
  updateQuantity(productId,newQuantity){
    let matchingItem;
    this.cartItems.forEach((item)=>{
      if(item.productId===productId){
        matchingItem=item;
      }
    });
    matchingItem.quantity=newQuantity;
    this.saveToStorage();
    this.displayQuantity();
  }
  updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;
    this.cartItems.forEach((item)=>{
      if(item.productId===productId){
        matchingItem=item;
      }
    });
    if(!matchingItem)
      return;
    matchingItem.deliveryOptionId=deliveryOptionId;
    this.saveToStorage();
  }
}
let cart=new Cart('cart-oop');
let bussinessCart=new Cart('cart-bussiness');
console.log(cart);
console.log(bussinessCart);