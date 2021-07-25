
let clientList = new Array(0);

// objects from client list page
const clientTable = document.querySelector('#clientTable');
const spanClientNameAddressView = document.querySelector('#clientName');
const addressTableView = document.querySelector('#addressTableView');
const buttonCloseAddressTableView = document.querySelector('#closeAddressTableView');
const buttonAddClient = document.querySelector('#addClient');
buttonAddClient.addEventListener('click',addClient);

/*-----------------------------------------------------------------*
 * DOM methods                                                     *
 *-----------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function() {
  listAllClients();
}, false);

function addClient(){
  window.location.href = '/clientForm.html?' + 'action=' + 'add';
}

function updateClient(){
  let clientId = this.dataset.clientid;
  window.location.href = '/clientForm.html?' + 'action=' + 'update' + '&' + 'id=' + clientId;
}

function deleteClient(){
  let clientId = this.dataset.clientid;
  deleteClientById(clientId, clientList);  
  window.location.href = '/clientList.html';
}


buttonCloseAddressTableView.addEventListener('click', clearAddressTableView);
/*-----------------------------------------------------------------*
 * private methods                                                 *
 *-----------------------------------------------------------------*/

// get all clients from local storage and insert in the table
function listAllClients(){
  clientList = getAllClients();
  if (clientList) {
    for (let i = 0; i < clientList.length; i++) {
      const client = clientList[i];     
      insertClientInTable(client);
    }
  }
}

// insert client on table
function insertClientInTable(client) {

  let newRowIndex = clientTable.rows.length;
  let row = clientTable.insertRow();
  
  row.insertCell(0).innerHTML = client.id;
  row.insertCell(1).innerHTML = client.name;
  row.insertCell(2).innerHTML = client.email;
  row.insertCell(3).innerHTML = client.cpf;

  row.insertCell(4).innerHTML =  
    `<button class="btn btn-primary" id="clientViewAddress" data-clientid="${client.id}" 
        data-bs-toggle="modal" data-bs-target="#exampleModal">Ver endereço</button>`

  row.insertCell(5).innerHTML = 
    `<div class="text-nowrap">
        <button  type="button" class="btn btn-primary mr-2" id="updateClient" data-clientid="${client.id}">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="btn btn-danger" id="deleteClient" data-clientid="${client.id}">
        <i class="fas fa-trash-alt"></i>
      </button>
      </div>`;

  clientTable.rows[newRowIndex].setAttribute("id", client.id); 
  row.cells[4].querySelector('#clientViewAddress').addEventListener('click', openTableAddressView);

  row.cells[5].querySelector('#updateClient').addEventListener('click', updateClient);
  row.cells[5].querySelector('#deleteClient').addEventListener('click', deleteClient);
}

//-----------------------------------------------------------------------------------------------------

// open the address modal table
function openTableAddressView() {
  let clientId = this.dataset.clientid; 
  let client = getClientById(clientId, clientList);

  spanClientNameAddressView.innerHTML = client.name;  
  insertClientAddressInTableView(client.address); 
}

// insert client address on modal table
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

// remove data from address modal table
function clearAddressTableView(){
  let i = addressTableView.rows.length - 1;
  while (addressTableView.rows.length > 1) {
    addressTableView.deleteRow(i--);
  }
}

//-----------------------------------------------------------------------------------------------------

// delete client from product list using client id
function deleteClientById(clientId, clientList){
 for (let i = 0; i < clientList.length; i++) {
   const client = clientList[i];

   if(client.id == clientId){
    clientList.splice(i, 1);
    break;
  }      
 }
 saveClients(clientList); 
}

// returns the client from client list using id
function getClientById(clientId, clientList){
  for (let i = 0; i < clientList.length; i++) {
    let client = clientList[i];
    if (client.id == clientId) { 
      return client;
    }
  }
}

//-----------------------------------------------------------------------------------------------------

// get all clients from local storage
function getAllClients(){
  return JSON.parse(localStorage.getItem("TableClients"));
}

// save all clients in local storage
function saveClients(clientList){
  let clientListJSON = JSON.stringify(clientList);
  localStorage.setItem("TableClients", clientListJSON);
}

