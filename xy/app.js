//define ui vars
const form = document.querySelector('#form');
const inputValue=document.getElementById('item-value');
const addItemBtn = document.querySelector('#add-item');
const clearItemBtn = document.querySelector('#clear-item');
const ul=document.querySelector('.item-add');

// const edit=document.querySelector('.edit');
// const deleteList=document.querySelector('.delete');

//load all event listener

loadEventListeners();

function loadEventListeners(){
    document.addEventListener('DOMContentLoaded', getItems);
    form.addEventListener('submit',addItem);
    ul.addEventListener('click',linkAction);
    clearItemBtn.addEventListener('click',clearItem);

    
}
function getItems(){
    let items;
    if(localStorage.getItem('items')==null){
        items=[];
    }else{
        items=JSON.parse(localStorage.getItem('items'));
    }
    items.forEach(function(item){
        const li=document.createElement('li');
    li.className='item-list d-flex justify-content-between';
    li.appendChild(document.createTextNode(item));
    const span=document.createElement('span');
    span.className='links';
    const link1=document.createElement('a');
    const link2=document.createElement('a');
    const link3=document.createElement('a');
    link1.className='entered text-success px-2';
    link1.innerHTML='<i class="far fa-check-circle"></i>';
    link2.className='edit text-primary px-2';
    link2.innerHTML='<i class="fas fa-edit"></i>';
    link3.className='delete text-danger px-2';
    link3.innerHTML='<i class="fas fa-times"></i>';
    span.appendChild(link1);
    span.appendChild(link2);
    span.appendChild(link3);
    li.appendChild(span);
        ul.appendChild(li);
    });
}

function addItem(e) {
  
    var input = document.getElementById('item-value').value;
    if(input===''){
        alert('add item');
    }else{
    //     const output=`<li class="item-list">
    //     ${input}
    //     <a href="#" class="text-green"><i class="far fa-check-circle"></i></a>
    //     <a href="#" class="text-primary"><i class="fas fa-edit"></i></a>
    //     <a href="#" class="text-danger"><i class="fas fa-times"></i></a>
    // </li>`;
    const li=document.createElement('li');
    li.className='item-list d-flex justify-content-between';
    li.appendChild(document.createTextNode(input));
    const span=document.createElement('span');
    span.className='links';
    const link1=document.createElement('a');
    const link2=document.createElement('a');
    const link3=document.createElement('a');
    link1.className='entered text-success px-2';
    link1.innerHTML='<i class="far fa-check-circle"></i>';
    link2.className='edit text-primary px-2';
    link2.innerHTML='<i class="fas fa-edit"></i>';
    link3.className='delete text-danger px-2';
    link3.innerHTML='<i class="fas fa-times"></i>';
    span.appendChild(link1);
    span.appendChild(link2);
    span.appendChild(link3);
    li.appendChild(span);
        ul.appendChild(li);
        
        storeListInLocalStorage(input);
        input='';
        
    }
    e.preventDefault();
}

function storeListInLocalStorage(input){
    let items;
    if(localStorage.getItem('items')==null){
        items=[];
    }else{
        items=JSON.parse(localStorage.getItem('items'));
    }
    items.push(input);
    localStorage.setItem('items',JSON.stringify(items));
}

function linkAction(e){
    console.log(e.target);
    if (e.target.parentElement.classList.contains('edit')) {
       let input=prompt("Please enter the edited text");
       const previousValue=e.target.parentElement.parentElement.parentElement.firstChild.nodeValue;
       
          e.target.parentElement.parentElement.parentElement.firstChild.nodeValue=input;
          updateItemInLocalStorage(input,previousValue);
       
      }
    if (e.target.parentElement.classList.contains('delete')) {
       if(confirm('are you sure?')){

       console.log(e.target.parentElement.parentElement.parentElement);
       e.target.parentElement.parentElement.parentElement.remove();
       removeItemFromLocalStorage(e.target.parentElement.parentElement.parentElement);
    }
      }
    e.preventDefault();
}

function updateItemInLocalStorage(newValue,previousValue){
    let items;
    if (localStorage.getItem('items') === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem('items'));
    }
    
    items.forEach(function (item, index) {
      if (previousValue === item) {
        items.splice(index, 1, newValue);
      }
    });
    localStorage.setItem('items', JSON.stringify(items));
}

function removeItemFromLocalStorage(itemList){
    let items;
  if (localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  
  items.forEach(function (item, index) {
    if (itemList.textContent === item) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem('items', JSON.stringify(items));
}

function clearItem(){
    while(ul.firstChild){
        ul.removeChild(ul.firstChild);
    }
    clearLocalStorage();
}

function clearLocalStorage(){
    localStorage.clear();
}