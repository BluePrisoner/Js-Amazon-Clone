import { orders } from "../data/orders.js";
import { loadProductsFetch } from "../data/products.js";
import { getProduct } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {totalCartQuantity} from '../data/cart.js';


async function renderTracking(){
    await loadProductsFetch();
    document.querySelector('.js-cart-quantity').innerText = totalCartQuantity();
    DOMtracking();
    progessBar();

}

const url  = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

let matchingOrder,orderElement;
    orders.forEach((orderItem)=>{
        if(orderItem.id===orderId)
            orderElement = orderItem;
        orderItem.products.forEach((product)=>{
            if(productId===product.productId)
                matchingOrder = product;
        });
    })

renderTracking();

    
function trackingHTML(){

    
    let trackHTML = '';
    const matchingProduct = getProduct(productId);
    
    
    trackHTML = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>
    
        <div class="delivery-date">
          Arriving on ${formatDate(matchingOrder.estimatedDeliveryTime)}
        </div>

        <div class="product-info">
          ${matchingProduct.getProductName()}
        </div>

        <div class="product-info">
          Quantity: ${matchingOrder.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.getImage()}">

        <div class="progress-labels-container">
          <div class="progress-label js-progress-preparing">
            Preparing
          </div>
          <div class="progress-label js-progress-shipped">
            Shipped
          </div>
          <div class="progress-label js-progress-out-for-delivery">
            Out for delivery
          </div>
          <div class="progress-label js-progress-delivered">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar js-progress-bar"></div>
        </div>`
     
     return trackHTML;   
}

function DOMtracking(){
    document.querySelector('.js-order-tracking')
        .innerHTML = trackingHTML();
}
function formatDate(dateTimeInfo){

    const date = dayjs(dateTimeInfo);
    const formattedDate = date.format('dddd, MMMM D');
    return formattedDate;
  
  }

function percentOfProgress(){
     const currentTime = new dayjs();
    const deliveryTime = new dayjs(matchingOrder.estimatedDeliveryTime);
    const orderTime = new dayjs(orderElement.orderTime);
    
    const percentOfProgress = (Number(currentTime.diff(orderTime))/Number(deliveryTime.diff(orderTime))*100);
    
    return Math.round(percentOfProgress);
}

 function progessBar(){
   const progressLevel = percentOfProgress();

   console.log(progressLevel);
   
   if(progressLevel<=33)
   {
    document.querySelector('.js-progress-preparing')
        .classList.add('current-status');
        document.querySelector('.progress-bar')
            .style.animation = 'fillBar-1 2s ease-in-out forwards';    
   }
        
    else if(progressLevel>33 && progressLevel<=66){
        document.querySelector('.js-progress-shipped')
        .classList.add('current-status');
        document.querySelector('.progress-bar')
            .style.animation = 'fillBar-2 2s ease-in-out forwards';    
    }
    else if(progressLevel>66 && progressLevel<=99){
        document.querySelector('.js-progress-out-for-delivery')
        .classList.add('current-status');
        document.querySelector('.progress-bar')
            .style.animation = 'fillBar-3 2s ease-in-out forwards';    
    }
    else{
      document.querySelector('.js-progress-delivered')
        .classList.add('current-status');
        document.querySelector('.progress-bar')
            .style.animation = 'fillBar-4 2s ease-in-out forwards';  
    }

}




