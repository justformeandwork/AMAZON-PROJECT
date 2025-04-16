import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFomStorage,cart } from "../../data/cart.js";
describe('test suite: renderOrderSummary',()=>{
  beforeEach(()=>{
    document.querySelector('.js-test-container').innerHTML=`
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
      <div class="js-return-to-home-link"></div>
    `;
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId:'1'
      }, {
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId:'2'
      }]);
    });
    loadFomStorage();
    renderOrderSummary();
  });
  afterEach(()=>{
    document.querySelector('.js-test-container').innerHTML='';
  });
  it('displays the cart',()=>{
    expect(document.querySelectorAll('.cart-item-container').length).toEqual(2);
    expect(document.querySelector('.js-product-quantity-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').innerText).toContain('Quantity: 2');
    expect(document.querySelector('.js-product-quantity-15b6fc6f-327a-4ec4-896f-486349e85a3d').innerText).toContain('Quantity: 1');
  });
  it('remove the product',()=>{
    document.querySelector('.js-delete-link-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').click();
    expect(document.querySelectorAll('.cart-item-container').length).toEqual(1);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
  });
});