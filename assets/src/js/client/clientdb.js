let clientList = [
    {
        id: 0,
        name: 'Usuario 1',
        email: 'email@email.com',
        cpf: '11232345323',
        address:{
            street: 'rua',
            number: '111',
            complement: 'casa',
            neighborhood: 'centro',
            city: 'senador firmino',
            state: 'minas gerais',            
            zipCode: '36540-000'
        }
    },
    {
        id: 1,
        name: 'Usuario 2',
        email: 'email@email.com',
        cpf: '11232345334',
        address:{
            street: 'rua',
            number: '111',
            complement: 'casa',
            neighborhood: 'centro',
            city: 'firmino',
            state: 'são paulo',            
            zipCode: '36545-000'
        }
    }
];


saveClients(clientList);

function saveClients(clientList) {
    let clientListJSON = JSON.stringify(clientList);
    localStorage.setItem("TableClients", clientListJSON);
}