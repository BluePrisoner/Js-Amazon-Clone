import { orders } from "../data/orders.js";
import { formatCurrency } from "./utils/money.js";
import { getProduct,loadProductsFetch,products } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {totalCartQuantity} from '../data/cart.js';

async function loadOrderPage(){
  await loadProductsFetch();
  OrdersPage();
  document.querySelector('.js-cart-quantity').innerText = totalCartQuantity();

}

function OrdersPage(){
    let ordersHTML = '';

    

    if (!orders || orders.length === 0) {
      ordersHTML = '<div>No orders available.</div>';
  } else {

    orders.forEach((order)=>{
        ordersHTML += `
        <div class="order-container">

          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formatDate(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${OrderDetailsgrid()}
          </div>
        </div>`
    });
  } 

    document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
}


function OrderDetailsgrid(){
  let orderHTML = '';
  let matchingProduct;


  orders.forEach((order)=>{

    
    order.products.forEach((orderItem)=>{
    
    matchingProduct = getProduct(orderItem.productId)
  

    
   
    orderHTML += ` <div class="product-image-container">
              <img src="${matchingProduct.getImage()}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.getProductName()}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${formatDate(orderItem.estimatedDeliveryTime)}
              </div>
              <div class="product-quantity">
                Quantity: ${orderItem.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${matchingProduct.id}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>`
  });
  });
 
  return orderHTML;
}

export function formatDate(dateTimeInfo){

  const date = dayjs(dateTimeInfo);
  const formattedDate = date.format('MMMM D');
  return formattedDate;

}

loadOrderPage();
