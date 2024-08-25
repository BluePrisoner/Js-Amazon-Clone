

function Cart(localStorageKey){
    const cart  = {
        cartItems: undefined,
        loadFromStorage(){
            this.cartItems  = JSON.parse(localStorage.getItem(localStorageKey)) || 
              [{
                productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:2,
                deliveryOptionId:'1'
              },{
                productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity:1,
                deliveryOptionId:'1'
              }];
        },
        
        saveToStorage(){ 
            localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
        },
    
        addToCart(productId) {
            let matchingItem;
          
            let selectedQuantity = 1; //change
            
           
            
            this.cartItems.forEach((cartItem) => {
              if (productId === cartItem.productId)
                matchingItem = cartItem;
            });
          
            if (matchingItem) {
              matchingItem.quantity += selectedQuantity;
            } else {
              this.cartItems.push({
                productId: productId,
                quantity: selectedQuantity,
                deliveryOptionId:'1'
              });
            }
            this.saveToStorage();
          },
        removeFromCart(productId){
            const newCart = [];
            this.cartItems.forEach((cartItem)=>{
              if(cartItem.productId!==productId){
                newCart.push(cartItem);
              }
            });
            this.cartItems  = newCart;
            this.saveToStorage();
            
        },
        totalCartQuantity(){
            let totalCartQuantity = 0;
            this.cartItems.forEach((cartItem) => {
            totalCartQuantity += cartItem.quantity;
            });
            return totalCartQuantity;
        },
    
        updateDeliveryOption(productId,deliveryOptionId){
            let matchingItem;
        
            this.cartItems.forEach((cartItem) => {
              if (productId === cartItem.productId)
                matchingItem = cartItem;
            });
        
            matchingItem.deliveryOptionId = deliveryOptionId;
            
            this.saveToStorage();
        }
    
    };

    return cart;
}



const cart = Cart('cart-oop');
const buisnessCart = Cart('cart-buisness');

buisnessCart.loadFromStorage();
cart.loadFromStorage();

console.log(cart);
console.log(buisnessCart);




  

  

  
  