/* 
 * REGEX 
 * 
 * ref:https://pt.stackoverflow.com/questions/242948/validar-nome-e-sobrenome-com-express%C3%A3o-regular
 * ref:https://www.regextester.com/93648
 * 
 * regex code: ^[a-zA-Z]+((['][a-zA-Z])?([ ][a-zA-Z])?[a-zA-Z]*)*$
*/

let clientList = new Array(0);
let updateClientId = -1;

// inputs for client personal data
const inputClientName = document.querySelector('#clientName');
const inputClientEmail = document.querySelector('#clientEmail');
const inputClientCPF = document.querySelector('#clientCPF');

// inputs for client address data
const inputAddressStreet = document.querySelector('#clientStreet');
const inputAddressNumber = document.querySelector('#clientHomeNumber');
const inputAddressComplement = document.querySelector('#clientComplement');
const inputAddressNeighborhood = document.querySelector('#clientNeighborhood');
const inputAddressCity = document.querySelector('#clientCity');
const inputAddressState = document.querySelector('#clientState');
const inputAddressZipCode = document.querySelector('#clientZipCode');

// buttons of client form
const buttonSaveClient = document.querySelector("#clientSubmit");
const buttonCancelClient = document.querySelector("#clientCancel");
buttonCancelClient.addEventListener('click', cancelClientForm);

/*-----------------------------------------------------------------*
 * DOM methods                                                     *
 *-----------------------------------------------------------------*/

// controls the function of save button
document.addEventListener('DOMContentLoaded', function () {
  
  let action = getUrlParameter('action'); 
  clientList = getAllClients();
  if (!clientList) {
    clientList = new Array(0);
    // console.log(clientList);
  }

  if (action == 'update') {

    updateClientId = getUrlParameter('id');    
    getClientById(updateClientId, clientList);

    buttonSaveClient.addEventListener('click', updateClient);
    buttonSaveClient.removeEventListener('click', addClient);

  } else if(action == 'add')  {

    buttonSaveClient.addEventListener('click', addClient);
    buttonSaveClient.removeEventListener('click', updateClient);

  } else {
    window.location.href = '/clientList.html'
  }

  inputOnlyNumbers();
}, false);

function addClient() {
 let newClient = {
   id: -1, name: '', email: '', cpf: '',
   address:{ street: '', number: -1, complement: '', neighborhood: '', city: '', state: '', zipCode: -1 }
  }

  //get the last client stored in client list
  if (clientList.length > 0) {
    newClient.id = clientList[(clientList.length - 1)].id + 1;
  } else {
    newClient.id = 0;
  }
  
  newClient.name = inputClientName.value;
  newClient.email = inputClientEmail.value;
  newClient.cpf = inputClientCPF.value;
  
  newClient.address.street = inputAddressStreet.value;
  newClient.address.number = inputAddressNumber.value;
  newClient.address.complement = inputAddressComplement.value;
  newClient.address.neighborhood = inputAddressNumber.value;
  newClient.address.city = inputAddressCity.value;
  newClient.address.state = inputAddressState.value;
  newClient.address.zipCode = inputAddressZipCode.value;
     
  clientList.push(newClient);
  saveClient(clientList);
  event.preventDefault();
  window.location.href = '/clientForm.html?action=add';
}

function updateClient() {
  let updateClient = {
   id: -1, name: '', email: '', cpf: '',
   address:{ street: '', number: -1, complement: '', neighborhood: '', city: '', state: '', zipCode: -1 }
  }

  updateClient.id = updateClientId;
  updateClient.name = inputClientName.value;
  updateClient.email = inputClientEmail.value;
  updateClient.cpf = inputClientCPF.value;

  updateClient.address.street = inputAddressStreet.value;
  updateClient.address.number = inputAddressNumber.value;
  updateClient.address.complement = inputAddressComplement.value;
  updateClient.address.neighborhood = inputAddressNumber.value;
  updateClient.address.city = inputAddressCity.value;
  updateClient.address.state = inputAddressState.value;
  updateClient.address.zipCode = inputAddressZipCode.value;
  
  for (let i = 0; i < clientList.length; i++) {
    const client = clientList[i];
    if (updateClient.id == client.id) {      
      
      clientList[i].name =  updateClient.name;
      clientList[i].email =  updateClient.email;
      clientList[i].cpf = updateClient.cpf;

      clientList[i].address.street =  updateClient.address.street;
      clientList[i].address.number =  updateClient.address.number;
      clientList[i].address.complement =  updateClient.address.complement;
      clientList[i].address.neighborhood =  updateClient.address.neighborhood;
      clientList[i].address.city =  updateClient.address.city;
      clientList[i].address.state =  updateClient.address.state;
      clientList[i].address.zipCode = updateClient.address.zipCode;
      break;
    }  
  }
  saveClient(clientList);
  event.preventDefault();
  window.location.href = '/clientList.html';
}

function cancelClientForm(){ 
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
function getClientById(id, clientList) {

  let clientExists = false;

  for (let i = 0; i < clientList.length; i++) {
    const client = clientList[i];
    if (id == client.id) {

      // client personal data
      inputClientName.value = client.name;
      inputClientEmail.value = client.email;
      inputClientCPF.value = client.cpf;

      // client address data
      inputAddressStreet.value = client.address.street;
      inputAddressNumber.value =  client.address.number;
      inputAddressComplement.value =  client.address.complement;
      inputAddressNeighborhood.value =  client.address.neighborhood;
      inputAddressCity.value =  client.address.city;
      inputAddressState.value =  client.address.state;
      inputAddressZipCode.value =  client.address.zipCode;
      clientExists = true;
      break;
    }
  }

  if (!clientExists) {
    alert('O produto não existe !!!');
    window.location.href = '/clientList.html'
  }
}

//------------------------------------------------------------------------------------------------

// get all clients from local storage
function getAllClients() {
  return JSON.parse(localStorage.getItem("TableClients"));
}

// save all clients in local storage
function saveClient(clientList) {
  let clientListJSON = JSON.stringify(clientList);
  localStorage.setItem("TableClients", clientListJSON);
}

//------------------------------------------------------------------------------------------------


//validation inputs
function inputOnlyNumbers(){
  inputClientCPF.addEventListener('keypress', onlynumber)
  inputAddressNumber.addEventListener('keypress', onlynumber)
  inputAddressZipCode.addEventListener('keypress', onlynumber)
}

function onlynumber(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key ); 
  var regex = /^[0-9]+$/;
  if( !regex.test(key) ) {
     theEvent.returnValue = false;
     if(theEvent.preventDefault) theEvent.preventDefault();
  }
}
