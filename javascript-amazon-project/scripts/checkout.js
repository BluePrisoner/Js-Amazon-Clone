import {cart, removeFromCart,totalCartQuantity,updateDeliveryOption} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';

function updateCheckoutItem()
{
  document.querySelector('.js-return-home-link')
   .innerHTML = `${totalCartQuantity()} items`;
}

updateCheckoutItem();


let cartSummaryHTML = '';

cart.forEach((cartItem)=>{

   
  let matchingProduct,deliveryOptionId;
  products.forEach((product)=>{
    const productId = product.id;
    if(productId===cartItem.productId)
    {
      matchingProduct = product;
      deliveryOptionId = cartItem.deliveryOptionId;
      
    }
  });

  

  

  
    cartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date js-delivery-date">
              Delivery date: ${dateString(deliveryOptionId)}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id ="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
               ${deliveryOptionsHTML(matchingProduct)}
              </div>
            </div>
          </div>
    `
    
});

  function deliveryOptionsHTML(matchingProduct){
    
    let html = ``;
    deliveryOptions.forEach((deliveryOption) => {

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays,'days');

     

      const dateString = deliveryDate.format('dddd, MMMM D');

      

      const priceString = deliveryOption.priceCents === 0
        ?'FREE'
        :`$${formatCurrency(deliveryOption.priceCents)} -`;
       
        
      html += 
      `<div class="delivery-option js-delivery-option"
         data-product-id = "${matchingProduct.id}"
         data-delivery-option-id = "${deliveryOption.id}">
            <input type="radio"
              class="delivery-option-input"
             name="delivery-option-${matchingProduct.id}" ${checkedRadio(deliveryOption)}>
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
 
  //Selecting defualt radio option

  function checkedRadio(deliveryOption){
    if(deliveryOption.id==='1')
        return 'checked';
  }
 
  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;


document.querySelectorAll('.js-delete-link')
  .forEach((link)=>{
    link.addEventListener('click',()=>{
      let productId = (link.dataset.productId);
      removeFromCart(productId);
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      
      container.remove();
      updateCheckoutItem();
     
  }); 
});

document.querySelectorAll('.js-delivery-option')
  .forEach((element)=>{
    element.addEventListener('click',()=>{
     
     const {productId,deliveryOptionId} = element.dataset;  //shorthand property
    
     
      updateDeliveryOption(productId,deliveryOptionId);
     
      
    });
  });

  function dateString(deliveryOptionId){
  
  let dateString;
   deliveryOptions.forEach((deliveryOption) => {
    if(deliveryOptionId === deliveryOption.id){
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
      dateString = deliveryDate.format('dddd, MMMM D');
      
    }
   });
   return dateString
  }
  