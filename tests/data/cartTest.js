import {addToCart,cart, loadFomStorage, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
describe('test suite:addtocart',()=>{
  beforeEach(()=>{
    spyOn(localStorage,'setItem');
  });
  it('adds an existing product to cart',()=>{
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',quantity:1,
        deliveryOptionId:'1'
      }]);
    });
    loadFomStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('CART',JSON.stringify([{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',quantity:2,
      deliveryOptionId:'1'
    }]));
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });
  it('add a new product to the cart',()=>{
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
    loadFomStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.setItem).toHaveBeenCalledWith('CART',JSON.stringify([
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }
    ]));
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
});
  describe('test suite: removefromcart',()=>{
    beforeEach(()=>{
      spyOn(localStorage,'setItem');
      spyOn(localStorage,'getItem').and.callFake(()=>{
        return JSON.stringify([{
          productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',quantity:1,
          deliveryOptionId:'1'
        }]);
      });
      loadFomStorage();
    });
    it('check if it remove existing element',()=>{
      removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart.length).toEqual(0);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('CART','[]');
    });
    it('check if it doesnot remove anything if the element not exist',()=>{
      removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c3');
      expect(cart.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('CART',JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]));
    });
  });
  describe('test suite: updatedeliveryoption',()=>{
    beforeEach(()=>{
      spyOn(localStorage,'setItem');
      spyOn(localStorage,'getItem').and.callFake(()=>{
        return JSON.stringify([{
          productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',quantity:1,
          deliveryOptionId:'1'
        }]);
      });
      loadFomStorage();
    });
    it('update delivery option for a exist product',()=>{
      updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6','3');
      expect(cart.length).toEqual(1);
      expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart[0].quantity).toEqual(1);
      expect(cart[0].deliveryOptionId).toEqual('3');
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('CART',JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',quantity:1,
        deliveryOptionId:'3'
      }]));
    });
    it('update delivery option for a non-exist product',()=>{
      updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c3','3');
      expect(cart.length).toEqual(1);
      expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart[0].quantity).toEqual(1);
      expect(cart[0].deliveryOptionId).toEqual('1');
      expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
  });