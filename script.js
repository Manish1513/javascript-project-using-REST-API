
function saveToLocalStorage(event) {
    event.preventDefault();
    const sellingPrice = document.getElementById('sellingPrice').value;
    const productName = document.getElementById('productName').value;

    const product = {
        sellingPrice,
        productName
    };

    axios.post("https://crudcrud.com/api/ca399d15f2244b7aa6d0be6cb96b2465/productdetails", product)
        .then((response) => {
            showNewProductOnScreen(response.data);
        })
        .catch((err) => {
            console.log(err);
        });

    // Clear the form inputs
    document.getElementById('sellingPrice').value = '';
    document.getElementById('productName').value = '';
}

window.addEventListener('DOMContentLoaded', () => {
    axios.get("https://crudcrud.com/api/ca399d15f2244b7aa6d0be6cb96b2465/productdetails")
        .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
                showNewProductOnScreen(response.data[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

function showNewProductOnScreen(product) {
    const parentNode = document.getElementById('ListOfProducts');

    const listItem = document.createElement('li');
    listItem.textContent = `${product.sellingPrice} - ${product.productName}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
        deleteProduct(product._id);
    };

    const editButton = document.createElement('button');
   editButton.textContent = 'Edit';
    editButton.onclick = function () {
    editUserDetails(product.sellingPrice, product.productName, product._id);
};
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);

    parentNode.appendChild(listItem);
}
function editUserDetails(sellingPrice,productName,productId){
    document.getElementById('sellingPrice').value = sellingPrice;
    document.getElementById('productName').value = productName;


    deleteProduct(productId)
}

function deleteProduct(productId) {
    axios.delete(`https://crudcrud.com/api/ca399d15f2244b7aa6d0be6cb96b2465/productdetails/${productId}`)
        .then((response) => {
            removeProductFromScreen(response);
        })
        .catch((err) => {
            console.log(err);
        });
}

function removeProductFromScreen(productId) {
    const listItemToRemove = document.getElementById(productId);
    if (listItemToRemove) {
        listItemToRemove.remove();
    }
}