const doc = document;
const productsSelector = '.products';
const cart = {
  1: 2,
  2: 1,
  4: 5,
};

let cartBtn = doc.querySelector('.mini-cart');

renderProducts(products, productsSelector);
cartBtn.dataset.count = getCartObjCount(products ,cart);

cartBtn.onclick = function(){
  const cartElem = '.cart';
  if(isElementPresent(cartElem)){
    removeElement(cartElem);
  }else{
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
  if (!parentEl) {
    console.error(`[${insertSelector}]: Parent element not found !!!`);
    return false;
  }

  const
    product = doc.createElement('div'),
    productImgWrap = doc.createElement('div'),
    productImg = doc.createElement('img'),
    productTitle = doc.createElement('h3'),
    productPriceBlock = doc.createElement('div'),
    productPrice = doc.createElement('span'),
    addCart = doc.createElement('button'),
    productCategory = doc.createElement('span');

  const { id, title, category, img, price } = prodObj;
  const imgPath = `./img/products/${category}/${img}`;

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
  if (!parentEl) {
    console.error(`[${insertSelector}]: Parent element not found !!!`);
    return false;
  }

  let cart = doc.querySelector('.cart');
  if (cart) {
    cart.remove();
  }

  cart = doc.createElement('div');

  const
    cartTitle = doc.createElement('h3'),
    cartProds = doc.createElement('ul');

  const totalSum = getTotalCartSum(dataArr, cartProdsObj);

  cart.className = 'cart';

  cartTitle.className = 'cart-title';
  cartTitle.innerText = 'Cart';

  cartProds.className = 'cart-prods';

  parentEl.prepend(cart);
  cart.append(cartTitle, cartProds);

  renderCartProds(dataArr, cartProdsObj, '.cart-prods');
  renderCartTotal(totalSum, '.cart');
}

function renderCartProds(dataArr, cartProdsObj, insertSelector) {
  let count = 1;

  for (id in cartProdsObj) {
    const qty = cartProdsObj[id];
    const prod = dataArr.find(item => item.id == id);

    renderCartProd(count, prod, qty, insertSelector, cartProdsObj);
    count++;
  }
}

function renderCartProd(count, prodObj, cartProdQty, insertSelector, cartProdsObj) {
  const parentEl = doc.querySelector(insertSelector);
  if (!parentEl) {
    console.error(`[${insertSelector}]: Parent element not found !!!`);
    return false;
  }

  const
    product = doc.createElement('li'),
    productNumber = doc.createElement('span'),
    productTitle = doc.createElement('h4'),

    productQty = doc.createElement('label'),
    productQtySpinerPlus = doc.createElement('span'),
    productQtyInput = doc.createElement('input'),
    productQtySpinerMinus = doc.createElement('span'),

    productPrice = doc.createElement('span'),
    productSum = doc.createElement('span'),
    pruductDel = doc.createElement('button');

  const { id, title, price } = prodObj;
  const productSumValue = cartProdQty * price;

  product.className = 'cart-prod';
  product.dataset.id = id;

  productNumber.className = 'cart-prod-number';
  productNumber.innerText = count;

  productTitle.className = 'cart-prod-title';
  productTitle.innerText = title;

  productQty.className = 'cart-prod-qty';
  productQtySpinerPlus.className = 'cart-prod-qty-spinner spinner-plus';
  productQtySpinerPlus.innerHTML = '<i class="fa-solid fa-plus"></i>'
  productQtyInput.value = cartProdQty;
  productQtySpinerMinus.className = 'cart-prod-qty-spinner spinner-minus';
  productQtySpinerMinus.innerHTML = '<i class="fa-solid fa-minus"></i>';

  productPrice.className = 'cart-prod-price';
  productPrice.innerText = price;

  productSum.className = 'cart-prod-sum';
  productSum.innerText = productSumValue;

  pruductDel.className = 'cart-prod-del';
  pruductDel.innerHTML = '<i class="fa-solid fa-trash"></i>';

  productQty.append(
    productQtySpinerPlus,
    productQtyInput,
    productQtySpinerMinus
  );

  product.append(
    productNumber,
    productTitle,
    productQty,
    productPrice,
    productSum,
    pruductDel
  );

  parentEl.append(product);

  productQtySpinerPlus.onclick = function () {
    addNItemToCart(cartProdsObj, prodObj);
    renderCart(products, cart, 'body');
  }
  productQtySpinerMinus.onclick = function () {
    minNItemToCart(cartProdsObj, prodObj);
    renderCart(products, cart, 'body');
  }
  pruductDel.onclick = function () {
    deleteCartProdObj(cartProdsObj, prodObj)
    renderCart(products, cart, 'body');
  }
}

function renderCartTotal(totalSum, insertSelector) {
  const parentEl = doc.querySelector(insertSelector);

  if (!parentEl) {
    console.error(`[${insertSelector}]: Parent element not found !!!`);
    return false;
  }

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

function getTotalCartSum(dataArr, cartProdsObj) {
  let total = 0;

  for (let id in cartProdsObj) {
    const qty = cartProdsObj[id];
    const prod = dataArr.find(item => item.id.toString() === id);
    const cost = prod.price * qty;
    total += cost;
  }

  return total;
}

function addNItemToCart(cartProdsObj, prodObj) {
  const id = prodObj.id;
  cartProdsObj[id] += 1;
  cartBtn.dataset.count = getCartObjCount(products ,cart);
}
function minNItemToCart(cartProdsObj, prodObj) {
  const productId = prodObj.id;

  if (productId in cartProdsObj) {
    cartProdsObj[productId]--;
    if (cartProdsObj[productId] <= 0) {
      deleteCartProdObj(cartProdsObj, prodObj)
    }
  }
  cartBtn.dataset.count = getCartObjCount(products ,cart);
}
function deleteCartProdObj(cartProdsObj, prodObj){
    delete cartProdsObj[prodObj.id];
    cartBtn.dataset.count = getCartObjCount(products ,cart);
}

function removeElement(element) {
  doc.querySelector(element).remove();
}

function addCartHandler() {
  const id = this.closest('.product').dataset.id;
  cart[id] = !cart[id] ? 1 : cart[id] + 1;

  const cartElem = '.cart';

  cartBtn.dataset.count = getCartObjCount(products ,cart);

  if(isElementPresent(cartElem)){
    renderCart(products, cart, 'body');
  }
}

function getCartObjCount(dataArr, cartProdsObj){
  let count = 0;
  for(let item of dataArr){
    if(item.id in cartProdsObj){
      count+=cartProdsObj[item.id];
    }
  }
  return count;
}