
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
  inputProductName.focus();
  
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

  } else if (action == 'add') {

    buttonSubmit.addEventListener('click', addProduct);
    buttonSubmit.removeEventListener('click', updateProduct);

  } else {
    window.location.href = '/productList.html'
  }

  setValidationInputs();
  inputOnlyNumbers();
}, false);

// adds a new product and store it in local storage
function addProduct() {

  if (isFormValid() == true) {

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
    window.location.href = '/productList.html';

  } else {

    alert('dados incorretos');
    event.preventDefault();
    event.stopPropagation();
  }
}

function updateProduct() {

  if (isFormValid() == true) {

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

  } else {

    alert('dados incorretos');
    event.preventDefault();
    event.stopPropagation();
  }
}

function cancelProductForm() {
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
function getProductById(id, productList) {

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

//------------------------------------------------------------------------------------------------

// get all products from local storage
function getAllProducts() {
  return JSON.parse(localStorage.getItem("TableProducts"));
}

// save all products in local storage
function saveProduct(productList) {
  let productListJSON = JSON.stringify(productList);
  localStorage.setItem("TableProducts", productListJSON);
}

//------------------------------------------------------------------------------------------------

//validation inputs

function isFormValid() {


  if (inputProductName.classList.contains('is-invalid') == true) {
    return false
  }

  if (inputProductCategory.classList.contains('is-invalid') == true) {
    return false
  }

  if (inputProductDescription.classList.contains('is-invalid') == true) {
    return false
  }

  //---------------------------------------------------------------------

  if (inputProductQuantity.classList.contains('is-invalid') == true) {
    return false
  }

  if (inputProductUnitCostPrice.classList.contains('is-invalid') == true) {
    return false
  }

  if (inputProductUnitSellPrice.classList.contains('is-invalid') == true) {
    return false
  }

  return true;
}

function setValidationInputs() {
  inputProductName.addEventListener("blur", validateInputsText);
  inputProductCategory.addEventListener("blur", validateInputsText);
  inputProductDescription.addEventListener("blur", validateInputsText);
  inputProductQuantity.addEventListener("blur", validateInputNumber);
  inputProductUnitCostPrice.addEventListener("blur", validateInputNumber);
  inputProductUnitSellPrice.addEventListener("blur", validateInputNumber);
}

function validateInputsText() {
  if (this.value == '') {
    this.classList.add('is-invalid');
    this.classList.remove('is-valid');
  } else {
    this.classList.add('is-valid');
    this.classList.remove('is-invalid');
  }
}

function validateInputNumber() {
  if (this.value.length < 0 || this.value == '') {
    this.classList.add('is-invalid');
    this.classList.remove('is-valid');
  } else {
    this.classList.add('is-valid');
    this.classList.remove('is-invalid');
  }

}

function inputOnlyNumbers() {
  inputProductQuantity.addEventListener('keypress', onlynumber)
  inputProductUnitCostPrice.addEventListener('keypress', onlynumber)
  inputProductUnitSellPrice.addEventListener('keypress', onlynumber)
}

function onlynumber(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode(key);
  var regex = /^[0-9.]+$/;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
}
