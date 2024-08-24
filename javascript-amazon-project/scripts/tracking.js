import { orders } from "../data/orders.js";
import { loadProductsFetch } from "../data/products.js";
import { getProduct } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


async function renderTracking(){
    await loadProductsFetch();
    console.log('loaded');
    DOMtracking();
}

renderTracking();

function trackingHTML(){

    const url  = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');
    let trackHTML = '';
    const matchingProduct = getProduct(productId);
    let matchingOrder;
    orders.forEach((orderItem)=>{
        orderItem.products.forEach((product)=>{
            if(productId===product.productId)
                matchingOrder = product;
        });
    })
    
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
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
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

