export let cart = JSON.parse(localStorage.getItem('cart')) || [];


export function addToCart(productId) {
    let matchingItem;
  
    let selectedQuantity = 0;
    selectedQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId)
        matchingItem = cartItem;
    });
  
    if (matchingItem) {
      matchingItem.quantity += selectedQuantity;
    } else {
      cart.push({
        productId: productId,
        quantity: selectedQuantity
      });
    }
    saveToStorage();
  }

  export function saveToStorage()
  {
    localStorage.setItem('cart',JSON.stringify(cart));
    console.log(JSON.parse(localStorage.getItem('cart')));
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