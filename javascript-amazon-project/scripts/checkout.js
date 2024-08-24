import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {loadProductsFetch } from "../data/products.js";
// import '../data/backend-practice.js';


Promise.all([
    loadProductsFetch()
]).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});