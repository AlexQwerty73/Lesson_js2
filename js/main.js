import { products } from './data.js';

const doc = document;
const shopContainer = doc.querySelector('.shop');
const productElements = doc.querySelectorAll('.product');

renderProducts(products, '.shop')

shopContainer.addEventListener('click', function (e) {
  const product = e.target.closest('.product');
  if (product) {
    const productId = product.getAttribute('id');
    
    localStorage.setItem('selectedProductId', productId);
    window.location.href = `./single.html`;
  }
});

function renderProducts(array, parentElementSelector) {
  const parEl = doc.querySelector(parentElementSelector);

  const html = array
    .map(product =>
      `<div class="product" id="${product.id}">
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      <button>Buy</button>
    </div>`).join('');

  parEl.innerHTML = html

  // for (let prod of array) {
  //   const { id, name, price } = prod

  //   const product = doc.createElement('div');
  //   product.id = id;
  //   product.className = 'product';

  //   const
  //     nameProd = doc.createElement('h3'),
  //     priceProd = doc.createElement('p'),
  //     btnProd = doc.createElement('button');

  //   nameProd.innerText = name;
  //   priceProd.innerText = price;
  //   btnProd.innerText = 'Buy'

  //   parEl.append(product);
  //   product.append(nameProd, priceProd, btnProd)

  //   btnProd.onclick = (e) => {
  //     e.preventDefault();
  //   }
  // }
}