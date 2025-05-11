import { loadCart } from '../data/cart.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
//import '../data/cart-class.js';
//import '../data/BACKEND-PRATICE.js';
//import '../data/car.js';
async function loadPage(){
  try{
    //throw 'error';
    await loadProductsFetch();
    await new Promise((resolve,reject)=>{
      loadCart(()=>{
        //reject('error');
        resolve();
      });
    });
    renderOrderSummary();
    renderPaymentSummary();
  }catch(error){
    console.log('Unexpected error. Please try again later.');
  }
}
loadPage();
/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  })
]).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
*/
/*
new Promise((resolve)=>{
  loadProducts(()=>{
    resolve();
  });
}).then(()=>{
  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  });
}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
*/
/*
loadProducts(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
*/