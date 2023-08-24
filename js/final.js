import { products } from './data.js';

const doc = document;
const productContainer = doc.querySelector('.product-container');
const userDataBlock = doc.querySelector('.user-data-block');

window.addEventListener('DOMContentLoaded', () => {
    const selectedProductId = localStorage.getItem('selectedProductId');
    const userDataStr = localStorage.getItem('form');
    const userData = eval('(' + userDataStr + ')');


    const product = findProductById(Number(selectedProductId));
    const { id, price } = product;
    const { name, email, phone } = userData;

    userDataBlock.innerHTML = `
        <div>
            <h2>Name: ${name}</h2>
            <h2>Email: ${email}</h2>
            <h2>Phone: ${phone}</h2>
        </div>
    `;

    productContainer.innerHTML = `
        <div class="product" id="${id}">
            <h3>${product.name}</h3>
            <p>${price}</p>
        </div>`;
});

function findProductById(id) {
    return products.find(product => product.id === id);
}
