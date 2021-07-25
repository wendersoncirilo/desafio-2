
let productList = new Array();

const productTable = document.querySelector('#tableProductsList');
const buttonAddProduct = document.querySelector('#addProduct');

/*-----------------------------------------------------------------*
 * DOM methods                                                     *
 *-----------------------------------------------------------------*/
buttonAddProduct.addEventListener('click', addProduct);

document.addEventListener('DOMContentLoaded', function() {
    productList = getAllProducts();
    listAllProducts();
}, false);  

function addProduct(){
    window.location.href = '/productForm.html?' + 'action=' + 'add';
}

function updateProduct(){
    let productId = this.dataset.productid;
    window.location.href = '/productForm.html?' + 'action=' + 'update' + '&' + 'id=' + productId;
}

function deleteProduct(){
    let productId = this.dataset.productid;
    deleteProductById(productId, productList);  
    window.location.href = '/productList.html';
}

/*-----------------------------------------------------------------*
 * private methods                                                 *
 *-----------------------------------------------------------------*/

// get all products from local storage and insert in the table
function listAllProducts() {
    let productList = getAllProducts();
    if (productList) {
        for (let i = 0; i < productList.length; i++) {
            const product = productList[i];
            insertProductInTable(product);
        }
    }
}

// insert product on table
function insertProductInTable(product){

    let newRowIndex = productTable.rows.length;
    let newRow = productTable.insertRow();
    
    newRow.insertCell(0).innerHTML = product.id;
    newRow.insertCell(1).innerHTML = product.name;
    newRow.insertCell(2).innerHTML = product.category;
    newRow.insertCell(3).innerHTML = product.description;
    newRow.insertCell(4).innerHTML = product.quantity;
    newRow.insertCell(5).innerHTML = product.cost;
    newRow.insertCell(6).innerHTML = product.price;  
    
    newRow.insertCell(7).innerHTML = 
    ` <div class="text-nowrap">
          <button  type="button" class="btn btn-primary mr-2" id="updateProduct" data-productid="${product.id}">
          <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="btn btn-danger" id="deleteProduct" data-productid="${product.id}">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>`;

    productTable.rows[newRowIndex].setAttribute("id", product.id);  
    newRow.cells[7].querySelector('#updateProduct').addEventListener('click', updateProduct);
    newRow.cells[7].querySelector('#deleteProduct').addEventListener('click', deleteProduct);
}

//-------------------------------------------------------------------------------------

// get all products from local storage
function getAllProducts(){
    return JSON.parse(localStorage.getItem("TableProducts"));
}

// deletes the product by id and update the list stored in local storage
function deleteProductById(productId, productList){
    for (let i = 0; i < productList.length; i++) {
        const product = productList[i];
        if(product.id == productId){
            productList.splice(i, 1);
            break;
        }
    }

    saveProduct(productList);
}

//-------------------------------------------------------------------------------------

// save all products in local storage
function saveProduct(productList){
    let productListJSON = JSON.stringify(productList);
    localStorage.setItem("TableProducts", productListJSON);
}

