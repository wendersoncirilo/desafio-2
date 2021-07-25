let productList = [
    {
        id: 0,
        name: 'product 1',
        category: 'category 1',
        description: 'descripton 1',
        quantity: 10,
        cost: 20.45,
        price: 56.00
    },
    {
        id: 1,
        name: 'product 2',
        category: 'category 2',
        description: 'descripton 2',
        quantity: 10,
        cost: 20.45,
        price: 56.00
    }
   
];

saveProducts(productList);

function saveProducts(productList) {
    let productListJSON = JSON.stringify(productList);
    localStorage.setItem("TableProducts", productListJSON);
}