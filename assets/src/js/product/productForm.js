
let productList = new Array(0);
let updateProductId = -1;

const formProduct = document.querySelector('#productForm');
const inputProductName = document.querySelector('#productName');
const inputProductCategory = document.querySelector('#productCategory');
const inputProductDescription = document.querySelector('#productDescription');
const inputProductQuantity = document.querySelector('#productQuantity');
const inputProductUnitCostPrice = document.querySelector('#productUnitCostPrice');
const inputProductUnitSellPrice = document.querySelector('#productUnitSellPrice');

const buttonCancel = document.querySelector('#cancel');
const buttonSubmit = document.querySelector('#submit');
buttonCancel.addEventListener('click', cancelProductForm);

/*-----------------------------------------------------------------*
 * DOM methods                                                     *
 *-----------------------------------------------------------------*/
// controls the function of save button
document.addEventListener('DOMContentLoaded', function () {
  const queryString = window.location.search;
  let action = getUrlParameter('action');

  productList = getAllProducts();
  if (!productList) {
    productList = new Array(0);
    console.log(productList);
  }

  if (action == 'update') {
    updateProductId = getUrlParameter('id');    
    getProductById(updateProductId, productList);

    buttonSubmit.addEventListener('click', updateProduct);
    buttonSubmit.removeEventListener('click', addProduct);

  } else if(action == 'add')  {

    buttonSubmit.addEventListener('click', addProduct);
    buttonSubmit.removeEventListener('click', updateProduct);

  } else {
    window.location.href = '/product  List.html'
  }
}, false);

// adds a new product and store it in local storage
function addProduct() {
  let newProduct = { id: -1, name: '', category: '', description: '', quantity: -1, cost: -1, price: -1 };

  //get the last product stored in product list
  if (productList.length > 0) {
    newProduct.id = productList[(productList.length - 1)].id + 1;
  } else {
    newProduct.id = 0;
  }

  newProduct.name = inputProductName.value;
  newProduct.category = inputProductCategory.value;
  newProduct.description = inputProductDescription.value;
  newProduct.quantity = inputProductQuantity.value;
  newProduct.cost = inputProductUnitCostPrice.value;
  newProduct.price = inputProductUnitSellPrice.value;

  productList.push(newProduct);
  saveProduct(productList);
  event.preventDefault();
  window.location.href = '/productForm.html?action=add';
}

function updateProduct() {
  let updatedProduct = { id: -1, name: '', category: '', description: '', quantity: -1, cost: -1, price: -1 };
      
  updatedProduct.id = updateProductId;
  updatedProduct.name = inputProductName.value;
  updatedProduct.category = inputProductCategory.value;
  updatedProduct.description = inputProductDescription.value;
  updatedProduct.quantity = inputProductQuantity.value;
  updatedProduct.cost = inputProductUnitCostPrice.value;
  updatedProduct.price = inputProductUnitSellPrice.value;
  
  for (let i = 0; i < productList.length; i++) {
    const product = productList[i];
    if (updatedProduct.id == product.id) {
      productList[i].name = updatedProduct.name;
      productList[i].category = updatedProduct.category;
      productList[i].description = updatedProduct.description;
      productList[i].quantity = updatedProduct.quantity;
      productList[i].cost = updatedProduct.cost;
      productList[i].price = updatedProduct.price;
      break;
    }  
  }
  saveProduct(productList);
  window.location.href = '/productList.html';
}

function cancelProductForm(){ 
 event.preventDefault();
 window.location.href = '/index.html';
}

/*-----------------------------------------------------------------*
 * private methods                                                 *
 *-----------------------------------------------------------------*/

// gets the url parameters
function getUrlParameter(parameter) {
  let vars = {};
  let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    function (m, key, value) {
      vars[key] = value;
    });

  return vars[parameter];
}

//loads the product from list and set the inputs text values with product values
function getProductById(id, productList){

  let productExists = false;

  for (let i = 0; i < productList.length; i++) {
    const product = productList[i];
    if (id == product.id) {
      inputProductName.value = product.name;
      inputProductCategory.value = product.category;
      inputProductDescription.value = product.description;
      inputProductQuantity.value = product.quantity;
      inputProductUnitCostPrice.value = product.cost;
      inputProductUnitSellPrice.value = product.price;
      productExists = true;
      break;
    }    
  }

  if (!productExists) {
    alert('O produto não existe !!!');
    window.location.href = '/productList.html'
  }
}

// get all products from local storage
function getAllProducts() {
  return JSON.parse(localStorage.getItem("TableProducts"));
}

// save all products in local storage
function saveProduct(productList) {
  let productListJSON = JSON.stringify(productList);
  localStorage.setItem("TableProducts", productListJSON);
}