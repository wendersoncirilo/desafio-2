/* 
 * REGEX 
 * 
 * ref:https://pt.stackoverflow.com/questions/242948/validar-nome-e-sobrenome-com-express%C3%A3o-regular
 * ref:https://www.regextester.com/93648
 * 
 * regex code: ^[a-zA-Z]+((['][a-zA-Z])?([ ][a-zA-Z])?[a-zA-Z]*)*$
*/
let arrayClient = new Array();
let arrayAddress = new Array();

/*-----------------------------------------------------------------*
 * Cliente code                                                    *
 *-----------------------------------------------------------------*/


// objects from form client
const inputClientName = document.querySelector('#clientName');
const inputClientEmail = document.querySelector('#clientEmail');
const inputClientCPF = document.querySelector('#clientCPF');

const buttonSaveClient = document.querySelector("#clientSubmit");
const buttonCancelClient = document.querySelector("#clientCancel");

buttonSaveClient.addEventListener('click', addClient);
buttonCancelClient.addEventListener('click',clientCancel);

document.addEventListener('DOMContentLoaded', function() {
  listAllClients();
}, false);

function addClient(){
  let newClient = { id: -1, name: '', email: '', cpf: '' , address: []};
  let clientAddressList = getAllAddressFromTable();
 
  newClient.id = arrayClient.length;
  newClient.name = inputClientName.value;
  newClient.email = inputClientEmail.value;
  newClient.cpf = inputClientCPF.value;  
  newClient.address = clientAddressList;

  arrayClient.push(newClient); 
  saveClient(arrayClient);
  window.location.href = "/clientList.html";
}

function clientCancel(){
 inputClientName.innerHTML = '';
 inputClientEmail.innerHTML = '';
 inputClientCPF.innerHTML = '';
 window.location.href = "/clientList.html";
}

function listAllClients(){
  arrayClient = getClients();
  console.log(arrayClient);

  for (let i = 0; i < arrayClient.length; i++) {
    const client = arrayClient[i];
    console.log(client);

    insertClientInTable(client);    
  }
}

function getClients(){
  return JSON.parse(localStorage.getItem("TableClient"));
}

// private methods
function saveClient(arrayClient){
  let arrayClientJSON = JSON.stringify(arrayClient);
  localStorage.setItem("TableClient", arrayClientJSON);
}


/*-----------------------------------------------------------------*
 * Cliente address code                                            *
 *-----------------------------------------------------------------*/

// objects from form address
const inputAddressStreet = document.querySelector('#clientStreet');
const inputAddressNumber = document.querySelector('#clientHomeNumber');
const inputAddressComplement = document.querySelector('#clientComplement');
const inputAddressNeighborhood = document.querySelector('#clientNeighborhood');
const inputAddressCity = document.querySelector('#clientCity');
const inputAddressState = document.querySelector('#clientState');
const inputAddressZipCode = document.querySelector('#clientZipCode');

const tableClientAddress = document.querySelector('#clientAddressTable');

const buttonAddAddress = document.querySelector("#addAddress");
const buttonSaveAddress = document.querySelector("#saveAddress");
const buttonUpdateAddress = document.querySelector("#updateAddress");
const buttonDeleteAddress = document.querySelector("#deleteAddress");
const buttonCancelAddress = document.querySelector("#cancelAddress");


buttonSaveAddress.addEventListener('click', addAddress);
buttonUpdateAddress.addEventListener('click', updateAddress);
buttonCancelAddress.addEventListener('click', clearFormAddress);

function addAddress(){ 

  let newAddress = { 
    street: '', number: '', complement: '', 
    neighborhood: '', city: '', state: '', zipCode: ''
  }

  newAddress.street = inputAddressStreet.value;
  newAddress.number = inputAddressNumber.value;
  newAddress.complement = inputAddressComplement.value;  
  newAddress.neighborhood = inputAddressNeighborhood.value;
  newAddress.city = inputAddressCity.value;
  newAddress.state = inputAddressState.value;  
  newAddress.zipCode = inputAddressZipCode.value;  

  insertAddressInTable(newAddress);
  clearFormAddress(); // clear the form

  if(tableClientAddress.rows.length >= 4){
    buttonAddAddress.disabled = true;
  }
}

function clearFormAddress(){
  inputAddressStreet.value = '';
  inputAddressNumber.value = '';
  inputAddressComplement.value = '';  
  inputAddressNeighborhood.value = '';
  inputAddressCity.value = '';
  inputAddressState.value = '';  
  inputAddressZipCode.value = '';   
}

function updateAddress(){
  let rowId = this.dataset.row;
  let rows = tableClientAddress.rows;
  let updateRow = '';
  
  for (let i = 0; i < rows.length; i++) {    
    if (rows[i].id == rowId) {      
      updateRow = rows[i];
    }
  }

  let address = getAddressFromTableRow(updateRow);
  
  setAddressInFormAddress(address);
  buttonSaveAddress.removeEventListener('click', addAddress, false);
  buttonSaveAddress.addEventListener('click', updateAddressRow); 

  function updateAddressRow(){     

    updateRow.cells[1].innerHTML = inputAddressStreet.value;
    updateRow.cells[2].innerHTML = inputAddressNumber.value;
    updateRow.cells[3].innerHTML = inputAddressComplement.value; 
    updateRow.cells[4].innerHTML = inputAddressNeighborhood.value;
    updateRow.cells[5].innerHTML = inputAddressCity.value;
    updateRow.cells[6].innerHTML = inputAddressState.value; 
    updateRow.cells[7].innerHTML = inputAddressZipCode.value; 
    clearFormAddress();

    buttonSaveAddress.removeEventListener('click', updateAddressRow);
    buttonSaveAddress.addEventListener('click', addAddress, false); 
    
  }
  
  
}

function deleteAddress() {
  let rows = tableClientAddress.rows;
  let rowId = this.dataset.row;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (row.id == rowId) {
      tableClientAddress.deleteRow(row.rowIndex);
    }
  }

  if(tableClientAddress.rows.length < 4){
    buttonAddAddress.disabled = false;
  }
}

// private methods
function insertAddressInTable(address) {
  let newRowIndex = tableClientAddress.rows.length;
  let row = tableClientAddress.insertRow();
  tableClientAddress.rows[newRowIndex].setAttribute("id", newRowIndex);

  row.insertCell(0).innerHTML = address.street;
  row.insertCell(1).innerHTML = address.number;
  row.insertCell(2).innerHTML = address.complement;
  row.insertCell(3).innerHTML = address.neighborhood;
  row.insertCell(4).innerHTML = address.city;
  row.insertCell(5).innerHTML = address.state;
  row.insertCell(6).innerHTML = address.zipCode;
  row.insertCell(7).innerHTML = ` 
      <div class="text-nowrap">
        <button  type="button" class="btn btn-primary mr-2" id="updateAddress" data-row="${newRowIndex}" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="btn btn-danger" id="deleteAddress" data-row="${newRowIndex}">
        <i class="fas fa-trash-alt"></i>
      </button>
      </div>`;

  row.cells[7].querySelector('#updateAddress').addEventListener('click', updateAddress);
  row.cells[7].querySelector('#deleteAddress').addEventListener('click', deleteAddress);

}

function getAllAddressFromTable(){
  let addressList = new Array();

  let rows = tableClientAddress.rows;
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    addressList.push( getAddressFromTableRow(row) );
  }
  console.log(addressList);
  return addressList;
}

function getAddressFromTableRow(row){
  let address = { 
    street: '', number: '', complement: '', 
    neighborhood: '', city: '', state: '', zipCode: ''
  };

  address.street = row.cells[0].innerHTML;
  address.number = row.cells[1].innerHTML;
  address.complement = row.cells[2].innerHTML;
  address.neighborhood = row.cells[3].innerHTML;
  address.city = row.cells[4].innerHTML;
  address.state = row.cells[5].innerHTML;
  address.zipCode = row.cells[6].innerHTML;

  return address;
}

function setAddressInFormAddress(address){
  inputAddressStreet.value = address.street;
  inputAddressNumber.value =  address.number;
  inputAddressComplement.value = address.complement;  
  inputAddressNeighborhood.value = address.neighborhood;
  inputAddressCity.value =  address.city;
  inputAddressState.value = address.state;  
  inputAddressZipCode.value = address.zipCode; 
}