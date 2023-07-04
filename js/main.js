const doc = document;
const productsSelector = '.products';
const cart = {
  1: 9,
  2: 5,
  3: 3,
};

renderProducts(products, productsSelector);
renderCart(products, cart, 'body');

function renderProducts(dataArr, insertSelector) {
  for (let product of dataArr) {
    renderProduct(product, insertSelector);
  }
}

function renderProduct(prodObj, insertSelector) {
  const parentEl = doc.querySelector(insertSelector);
  const 
    product = doc.createElement('div'),
    productImgWrap = doc.createElement('div'),
    productImg = doc.createElement('img'),
    productTitle = doc.createElement('h3'),
    productPriceBlock = doc.createElement('div'),
    productPrice = doc.createElement('span'),
    addCart = doc.createElement('button'),
    productCategory = doc.createElement('span');
/*
append, prepend, before, after, replaceWith
*/ 

  const {id, title, category, img, price} = prodObj;
  const imgPath = `./img/products/${category}/${img}`;

  if (!parentEl) {
    console.error(`[${insertSelector}]: Parent element not found !!!`);
    return false;
  }

  product.className = 'product';
  product.dataset.id = id;

  productImgWrap.className = 'product-img';
  productImg.src = imgPath;
  productImg.alt = img;
  productImgWrap.append(productImg);

  productTitle.className = 'product-title';
  productTitle.innerHTML = title;

  productPriceBlock.className = 'product-price-block';
  productPrice.className = 'product-price';
  productPrice.innerHTML = price;
  
  addCart.className = 'add-cart';
  addCart.innerHTML = 'Add cart'
  productPriceBlock.append(productPrice, addCart);

  productCategory.className = 'product-category';
  productCategory.innerText = category;

  product.append(
    productImgWrap,
    productTitle,
    productPriceBlock,
    productCategory
  );

  parentEl.append(product);

  addCart.onclick = addCartHandler;
}

function renderCart(dataArr, cartProdsObj, insertSelector) {
  const parentEl = doc.querySelector(insertSelector);

  const 
    cart = doc.createElement('div'),
    cartTitle = doc.createElement('h3'),
    cartProds = doc.createElement('ul');

  if (!parentEl) {
    console.error(`[${insertSelector}]: Parent element not found !!!`);
    return false;
  }

  cart.className = 'cart';

  cartTitle.className = 'cart-title';
  cartTitle.innerText = 'Cart';

  cartProds.className = 'cart-prods';

  parentEl.append(cart);
  cart.append(cartTitle, cartProds);

  renderCartProds(dataArr, cartProdsObj, '.cart-prods');
  renderCartTotal(5000, '.cart');
}

function renderCartProds(dataArr, cartProdsObj, insertSelector) {
  let count = 1;

  for (id in cartProdsObj) {
    const qty = cartProdsObj[id];
    const prod = dataArr.find(item => item.id == id);

    renderCartProd(prod, qty, count, insertSelector);
    count ++;
  }
}

function renderCartProd(prodObj, cartProdQty, count,  insertSelector) {
  const parentEl = doc.querySelector(insertSelector);

  
}

function renderCartTotal(totalSum, insertSelector) {
  const parentEl = doc.querySelector(insertSelector);

  
}

function addCartHandler() {
  const id = this.closest('.product').dataset.id;
  
  cart[id] = !cart[id] ? 1 : cart[id] + 1;
}