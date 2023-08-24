import { products } from './data.js';

const doc = document;
const container = doc.querySelector('.container')

window.addEventListener('DOMContentLoaded', () => {
    const selectedProductId = localStorage.getItem('selectedProductId');

    const product = findProductById(Number(selectedProductId));
    const { id, name, price } = product;

    container.innerHTML = `
        <div class="product" id="${id}">
            <h3>${name}</h3>
            <p>${price}</p>
            <button>Order</button>
        </div>`;
});

container.addEventListener('click', function (e) {
    const product = e.target.closest('.product');
    if (product) {
        const productId = product.getAttribute('id');

        localStorage.setItem('selectedProductId', productId);
        window.location.href = `./order.html`;
    }
});

function findProductById(id) {
    return products.find(product => product.id === id);
}