export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart  = JSON.parse(localStorage.getItem('cart')) || 
    [{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:2,
      deliveryOptionId:'1'
    },{
      productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity:1,
      deliveryOptionId:'1'
    }];
}    


export function addToCart(productId) {
    let matchingItem;
  
    let selectedQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value) || 1;
    
   
    
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId)
        matchingItem = cartItem;
    });
  
    if (matchingItem) {
      matchingItem.quantity += selectedQuantity;
    } else {
      cart.push({
        productId: productId,
        quantity: selectedQuantity,
        deliveryOptionId:'1'
      });
    }
    saveToStorage();
  }

  export function saveToStorage()
  {
    localStorage.setItem('cart',JSON.stringify(cart));
    
  }

  export function removeFromCart(productId){
    const newCart = [];
    cart.forEach((cartItem)=>{
      if(cartItem.productId!==productId){
        newCart.push(cartItem);
      }
    });
    cart  = newCart;
    saveToStorage();
    
  }

  export function totalCartQuantity()
  {
    let totalCartQuantity = 0;
    cart.forEach((cartItem) => {
      totalCartQuantity += cartItem.quantity;
    })
    return totalCartQuantity;
  }

  export function updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;

   

    cart.forEach((cartItem) => {
      if (productId === cartItem.productId)
        matchingItem = cartItem;
    });

   
    matchingItem.deliveryOptionId = deliveryOptionId;

    

   

 

    saveToStorage();
  }