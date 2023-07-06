const doc = document;
const productsSelector = '.products';
const cart = {
  // 1: 9,
  // 2: 5,
  // 3: 3,
};

const cartBlock = '.cart';
const cartBtn = doc.querySelector('.cart-button');
const cartProdBtnPlus = doc.querySelector('.cart-prod-P');

renderProducts(products, productsSelector);

cartBtn.onclick = function () {
  if (isElementPresent(cartBlock)) {
    removeElement(cartBlock);
  } else {
    renderCart(products, cart, 'body');
  }
}

function findElement(selector) {
  return document.querySelector(selector);
}
function isElementPresent(selector) {
  return !!findElement(selector);
}

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

  const { id, title, category, img, price } = prodObj;
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
    cartEl = doc.createElement('div'),
    cartTitle = doc.createElement('h3'),
    cartProds = doc.createElement('ul');

  if (!parentEl) {
    console.error(`[${insertSelector}]: Parent element not found !!!`);
    return false;
  }

  cartEl.className = cartBlock.replace('.', '');

  cartTitle.className = 'cart-title';
  cartTitle.innerText = 'Cart';

  cartProds.className = 'cart-prods';

  parentEl.append(cartEl);
  cartEl.append(cartTitle, cartProds);

  renderCartProds(dataArr, cartProdsObj, '.cart-prods');
  renderCartTotal(totalSum(products, cart), '.cart');
}

function renderCartProds(dataArr, cartProdsObj, insertSelector) {
  let count = 1;

  for (id in cartProdsObj) {
    const qty = cartProdsObj[id];
    const prod = dataArr.find(item => item.id == id);

    renderCartProd(prod, qty, count, insertSelector);
    count++;
  }
}

function renderCartProd(prodObj, cartProdQty, count, insertSelector) {
  const parentEl = doc.querySelector(insertSelector);

  const
    cartProd = doc.createElement('li'),
    cartProdNumber = doc.createElement('span'),
    cartProdTitle = doc.createElement('h4'),
    cartProdBtns = doc.createElement('div'),
    cartProdBtnP = doc.createElement('span'),
    cartProdBtnM = doc.createElement('span'),
    cartProdQty_ = doc.createElement('span'),
    cartProdPrice = doc.createElement('span'),
    cartProdSum = doc.createElement('span'),
    cartProdDelBtn =  doc.createElement('span');
    
  cartProd.className = 'cart-prod';
  cartProdNumber.className = 'cart-prod-number';
  cartProdTitle.className = 'cart-prod-title';
  cartProdBtns.className = 'cart-prod-btns';
  cartProdBtnP.className = 'cart-prod-P';
  cartProdBtnM.className = 'cart-prod-M';
  cartProdQty_.className = 'cart-prod-qty';
  cartProdPrice.className = 'cart-prod-price';
  cartProdSum.className = 'cart-prod-sum';
  cartProdDelBtn.className = 'cart-prod-del-btn'

  cartProdNumber.innerText = count;
  cartProdTitle.innerText = prodObj.title;
  cartProdBtnP.innerText = '+';
  cartProdBtnM.innerText = '-';
  cartProdQty_.innerText = cartProdQty;
  cartProdPrice.innerText = prodObj.price;
  cartProdSum.innerText = prodObj.price * cartProdQty;
  cartProdDelBtn.innerText = 'X'

  // cartProdBtnP.onclick = function () {
  //   addProd(this.parentNode.parentNode, cart);
  // };

  cartProdDelBtn.onclick = function(){
    removeElement();
  }

  parentEl.append(cartProd);
  cartProd.append(cartProdNumber, cartProdTitle, cartProdBtns, cartProdQty_, cartProdPrice, cartProdSum, cartProdDelBtn);
  cartProdBtns.append(cartProdBtnP, cartProdBtnM);
}

function renderCartTotal(totalSum, insertSelector) {
  const parentEl = doc.querySelector(insertSelector);

  const
    cartTotal = doc.createElement('div'),
    cartTotalTitle = doc.createElement('span'),
    cartTotalNumber = doc.createElement('span');

  cartTotal.className = 'cart-total';
  cartTotalNumber.className = 'cart-total-value';

  cartTotalTitle.innerText = 'Total:';
  cartTotalNumber.innerText = totalSum;

  parentEl.append(cartTotal);
  cartTotal.append(cartTotalTitle, cartTotalNumber);
}

function addProd(element, cartProdsObj) {
}




function totalSum(dataArr, cartProdsObj) {
  let sum = 0;
  for (let product of dataArr) {
    const productId = product.id.toString();
    if (productId in cartProdsObj) {
      sum += cartProdsObj[productId] * product.price;
    }
  }
  return sum;
}

function addCartHandler() {
  const id = this.closest('.product').dataset.id;
  cart[id] = !cart[id] ? 1 : cart[id] + 1;

  if (isElementPresent(cartBlock)) {
    removeElement(cartBlock);
    renderCart(products, cart, 'body');
  }
}

function removeElement(element) {
  doc.querySelector(element).remove();
}