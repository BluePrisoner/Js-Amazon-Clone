
let ObjArray =JSON.parse(localStorage.getItem('to-do-storage'))|| [];

renderList();





function enterkey(event)
{
    if(event.key==='Enter')
        {
            Add();
        }
}

function Add() {
    let obj = {};
    let tempName = (document.querySelector('.js-input-todo').value);
    let tempDate = (document.querySelector('.date-input').value);
    obj.Name = tempName;
    obj.dueDate = tempDate;
    ObjArray.push(obj);
    localStorage.setItem('to-do-storage',JSON.stringify(ObjArray));
    
    renderList();
    document.querySelector('.js-input-todo').value = '';  
    document.querySelector('.date-input').value = '';  
    
    }

function renderList()
{
    let htmlCode = '' ;

    ObjArray.forEach((tempObj,index)=>{
        
        let tempHTML =`
           <div class="list">
            <div class="list-obj">${tempObj.Name}</div>
            <div class="list-obj">${tempObj.dueDate}</div>
            <button  class ="delete-button js-delete-button">Delete</button>
           </div>
        `;
        htmlCode += tempHTML;
    });
    
    document.querySelector('.js-list-display')
        .innerHTML = htmlCode;

    document.querySelectorAll('.js-delete-button') //NodeList
        .forEach((deleteElementButton,index) =>
        {
            deleteElementButton.addEventListener('click', ()=>
            {
                ObjArray.splice(index,1);
                deleteElement(index);
            });
        }
    )

    
    
    
    

        
}

function deleteElement(i)
{
   localStorage.removeItem('to-do-storage');
   localStorage.setItem('to-do-storage',JSON.stringify(ObjArray));
   renderList();
  
}
