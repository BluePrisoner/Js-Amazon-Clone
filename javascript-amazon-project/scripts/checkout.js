import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {loadProductsFetch } from "../data/products.js";
// import '../data/backend-practice.js';

async function loadPage(){

    try{
        await loadProductsFetch();
        renderOrderSummary();
        renderPaymentSummary();
    }
    catch(error){
        console.log('Unexpected Error. Please try again later');
        console.log(error);
    }
    
}
loadPage(); //Using async await

/* Promise.all([
    loadProductsFetch()
]).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
}); */ //Using promise