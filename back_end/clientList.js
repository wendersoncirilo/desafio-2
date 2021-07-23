
var arrayClient = new Array();

// objects from client list page
const pageListClients = document.querySelector('#pageListClients');
const clientTable = document.querySelector('#clientTable');
const addressTableView = document.querySelector('#addressTableView');
const buttonCloseAddressTableView = document.querySelector('#closeAddressTableView');
const buttonClientViewAddress = document.querySelector('#clientViewAddress');


document.addEventListener('DOMContentLoaded', function() {
  listAllClients();
}, false);

buttonClientViewAddress.addEventListener('click', openTableView);
buttonCloseAddressTableView.addEventListener('click', clearAddressTableView);


function openTableView(){

  let rowId = this.dataset.row;
  let rows = clientTable.rows;
  let clientAddressList;


  for (let i = 0; i < rows.length; i++) {    
    if (rows[i].id == rowId) {  
      let clientRow = rows[i];
      let clientId = clientRow.cells[0].innerHTML;
      let client = findClient(arrayClient, clientId);      
      clientAddressList = client.address;
      break;
    }
  }

  for (let i = 0; i < clientAddressList.length; i++) {
    let address = clientAddressList[i];
    console.log(clientAddressList[i]);
    insertClientAddressInTableView(address);
  }
}

function clearAddressTableView(){
  let i = addressTableView.rows.length - 1;
  while (addressTableView.rows.length > 1) {
    addressTableView.deleteRow(i--);
  }
}

//private
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

function insertClientInTable(client) {

  let newRowIndex = clientTable.rows.length;
  let row = clientTable.insertRow();
  
  row.insertCell(0).innerHTML = client.id;
  row.insertCell(1).innerHTML = client.name;
  row.insertCell(2).innerHTML = client.email;
  row.insertCell(3).innerHTML = client.cpf;

  row.insertCell(4).innerHTML =  `<button class="btn btn-primary" id="clientViewAddress" data-row="${newRowIndex}" data-bs-toggle="modal" data-bs-target="#exampleModal">Ver endereços </button>`
  row.insertCell(5).innerHTML = ` 
      <div class="text-nowrap">
        <button  type="button" class="btn btn-primary mr-2" id="updateClient" data-row="${newRowIndex}">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="btn btn-danger" id="deleteClient" data-row="${newRowIndex}">
        <i class="fas fa-trash-alt"></i>
      </button>
      </div>`;
  clientTable.rows[newRowIndex].setAttribute("id", newRowIndex);

  row.cells[4].querySelector('#clientViewAddress').addEventListener('click', openTableView);
  //row.cells[7].querySelector('#deleteAddress').addEventListener('click', deleteAddress);
}

function insertClientAddressInTableView(address) {  
  let row = addressTableView.insertRow();
  row.insertCell(0).innerHTML = address.street;
  row.insertCell(1).innerHTML = address.number;
  row.insertCell(2).innerHTML = address.complement;
  row.insertCell(3).innerHTML = address.neighborhood;
  row.insertCell(4).innerHTML = address.city;
  row.insertCell(5).innerHTML = address.state;
  row.insertCell(6).innerHTML = address.zipCode;  
}


function findClient(array, id){
  for (let i = 0; i < array.length; i++) {
    let client = array[i];
    if (client.id == id) { 
      return client;
    }
  }
}


