import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {loadProductsFetch } from "../data/products.js";
// import '../data/backend-practice.js';

async function loadPage(){
    await loadProductsFetch();
    renderOrderSummary();
    renderPaymentSummary();

}
loadPage(); //Using async await

/* Promise.all([
    loadProductsFetch()
]).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
}); */ //Using promise