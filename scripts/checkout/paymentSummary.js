import {cart,totalCartQuantity} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';
import {addOrders} from '../../data/orders.js';

export function renderPaymentSummary(){
   
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    cart.forEach((cartItem)=>{
       
        const product = getProduct(cartItem.productId);
        
        productPriceCents += product.priceCents * cartItem.quantity;
        

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        
        shippingPriceCents += deliveryOption.priceCents;
    });
    
    const priceBeforeTaxCents = shippingPriceCents + productPriceCents;
    const estimatedTaxCents = (priceBeforeTaxCents*0.1); //10 percent
    const totalCents = priceBeforeTaxCents + estimatedTaxCents;

    const paymentSummaryHTML  = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalCartQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(priceBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(estimatedTaxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
    
    `
    document.querySelector('.js-payment-summary')
        .innerHTML = paymentSummaryHTML;
    
    document.querySelectorAll('.js-delivery-option')
        .forEach((element)=>{
            element.addEventListener('click',()=>{
                renderPaymentSummary();
            })

        });
    
    if(!cart.length){
      document.querySelector('.js-place-order')
        .addEventListener('click',()=>{
          alert('No items in Cart.');
        });
    }
    else{
       document.querySelector('.js-place-order')
        .addEventListener('click',async ()=>{

         try{
          const response =  await fetch('https://supersimplebackend.dev/orders',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
              },
            body : JSON.stringify({
                cart: cart
              })
            });
          const orders = await response.json();
          addOrders(orders);
         } 
         catch(error){
          console.log('Unexpected Error.Please try again later');
          console.log(error);
         }

         window.location.href = 'orders.html';
         
        });
    }
   
    
}