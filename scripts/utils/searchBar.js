import { loadProductsFetch, products} from "../../data/products.js";



async function searchFunction(){

    try{

        await loadProductsFetch();

        
        
        document.querySelector('.js-search-button')
            .addEventListener('click',()=>{searchElement()});
        document.querySelector('.js-search-bar')
            .addEventListener('keydown',(event)=>{
                
                if(event.key ==='Enter')
                    searchElement();
            });

    }
    catch(error)
    {
        console.log('Unexpected error. Please try again later')
    }

}

function searchElement(){

    const url = new URL(window.location.href);
    let productHTML = '';
                const searchInput = (document.querySelector('.js-search-bar').value).toLowerCase();
                
                url.searchParams.set('search', `${searchInput}`);
                window.history.pushState({}, '', url);
                
                products.forEach((product)=>{
                    
                
                    const bool1 = product.keywords.some((keyword)=>{

                            const boolean= keyword.includes(searchInput);
                                if(boolean)
                                    return boolean;
                        });


                    
                    const caseLowered = (product.name).toLowerCase();
                    
                    const bool2 = caseLowered.includes(searchInput);
                    
                    if(bool1 || bool2)
                    {   
                        
                        productHTML += filterListHTML(product);
                    }
                
                });

            document.querySelector('.js-products-grid')
                .innerHTML = productHTML;  
                

}

function filterListHTML(product){

    let productHTML = '';
    productHTML = `<div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class = "js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${product.id}">
              Add to Cart
            </button>
          </div>`
     return productHTML;     
}

searchFunction();



