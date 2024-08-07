import {cart,totalCartQuantity} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';


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

          <button class="place-order-button button-primary">
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
    
}