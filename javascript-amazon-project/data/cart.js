export const cart = []; //modules

export function addToCart(productId) {
    let matchingItem;
  
    let selectedQuantity = 0;
    selectedQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    cart.forEach((item) => {
      if (productId === item.productId)
        matchingItem = item;
    });
  
    if (matchingItem) {
      matchingItem.quantity += selectedQuantity;
    } else {
      cart.push({
        productId: productId,
        quantity: selectedQuantity
      });
    }
  }