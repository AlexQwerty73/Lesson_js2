const doc = document;
const productsSelector = '.products';
let cartBtn = doc.querySelector('.mini-cart');
const cartElem = '.cart';
let cart = {};
const urls = {
  products: 'http://localhost:3000/products',
  cart: 'http://localhost:3000/cart',
  users: 'http://localhost:3000/users'
}
const addItemBtn = doc.querySelector('.add-item');

let products = [];
let user = '';

// queries
//get, post...
fetch(urls.products)
  .then(res => res.json())
  .then(data => {
    products = data;

    renderProducts(products, productsSelector)
  });

fetch(urls.cart)
  .then(res => res.json())
  .then(data => {
    cart = data;

    cartBtn.dataset.count = getCartObjCount(products, cart);
  });


renderProducts(products, productsSelector);
renderLogInIcon('.login-container');

cartBtn.dataset.count = getCartObjCount(products, cart);

cartBtn.onclick = function () {
  if (isElementPresent(cartElem)) {
    removeElement(cartElem);
  } else {
    fetch(urls.cart)
      .then(res => res.json())
      .then(data => {
        cart = data;

        cartBtn.dataset.count = getCartObjCount(products, cart);
        renderCart(products, cart, 'body');
      });
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

  let cart = doc.querySelector(cartElem);
  if (cart) {
    cart.remove();
  }

  cart = doc.createElement('div');

  const
    cartTitle = doc.createElement('h3'),
    cartProds = doc.createElement('ul'),
    cartCloseBtn = doc.createElement('button');

  const totalSum = getTotalCartSum(dataArr, cartProdsObj);

  cart.className = 'cart';

  cartCloseBtn.className = 'cart-close-btn'
  cartCloseBtn.innerText = 'X'

  cartTitle.className = 'cart-title';
  cartTitle.innerText = 'Cart';

  cartProds.className = 'cart-prods';

  parentEl.prepend(cart);
  cart.append(cartCloseBtn, cartTitle, cartProds);

  renderCartProds(dataArr, cartProdsObj, '.cart-prods');
  renderCartTotal(totalSum, cartElem);

  cartCloseBtn.onclick = function () {
    removeElement(cartElem);
  }
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
  cartBtn.dataset.count = getCartObjCount(products, cart);
}
function minNItemToCart(cartProdsObj, prodObj) {
  const productId = prodObj.id;

  if (productId in cartProdsObj) {
    cartProdsObj[productId]--;
    if (cartProdsObj[productId] <= 0) {
      deleteCartProdObj(cartProdsObj, prodObj)
    }
  }
  cartBtn.dataset.count = getCartObjCount(products, cart);
}
function deleteCartProdObj(cartProdsObj, prodObj) {
  delete cartProdsObj[prodObj.id];
  cartBtn.dataset.count = getCartObjCount(products, cart);
}

function removeElement(element) {
  doc.querySelector(element).remove();
}

function renderAddProduct(insertSelector) {
  const parentEl = doc.querySelector(insertSelector);

  const
    addProduct = doc.createElement('div'),
    addProductTitle = doc.createElement('h2'),
    addProductForm = doc.createElement('form'),
    addProductFormTitleLabel = doc.createElement('label'),
    addProductFormTitleInput = doc.createElement('input'),
    addProductFormCategoryLabel = doc.createElement('label'),
    addProductFormCategoryInput = doc.createElement('input'),
    addProductFormPriceLabel = doc.createElement('label'),
    addProductFormPriceInput = doc.createElement('input'),
    addProductFormImgInput = doc.createElement('input'),
    addProductFormImgLabel = doc.createElement('label'),
    addProductFormBtn = doc.createElement('button'),
    addProductCloseBtn = doc.createElement('button');

  addProduct.className = 'add-product-block';
  addProductForm.className = 'add-produc';
  addProductFormTitleInput.className = 'add-product-title';
  addProductFormCategoryInput.className = 'add-product-category';
  addProductFormPriceInput.className = 'add-product-img';
  addProductFormImgInput.className = 'add-product-price';
  addProductFormBtn.className = 'add-product-btn';
  addProductCloseBtn.className = 'add-product-close-btn'

  addProductTitle.innerText = 'Add Product';
  addProductFormTitleLabel.innerText = 'Title:';
  addProductFormCategoryLabel.innerText = 'Category:'
  addProductFormPriceLabel.innerText = 'Price:';
  addProductFormImgLabel.innerText = 'Img:';
  addProductFormBtn.innerText = 'Add';
  addProductCloseBtn.innerText = 'X';

  parentEl.append(addProduct);
  addProduct.append(addProductTitle, addProductForm);
  addProductForm.append(
    addProductFormTitleLabel,
    addProductFormTitleInput,
    addProductFormCategoryLabel,
    addProductFormCategoryInput,
    addProductFormPriceLabel,
    addProductFormPriceInput,
    addProductFormImgLabel,
    addProductFormImgInput,
    addProductFormBtn,
    addProductCloseBtn
  );

  addProductFormBtn.onclick = function (e) {
    e.preventDefault();

    const newId = products[products.length - 1].id + 1;
    const title = addProductFormTitleInput.value;
    const category = addProductFormCategoryInput.value;
    const price = addProductFormPriceInput.value;
    const img = addProductFormImgInput.value;

    console.log(newId, title, category, price, img);

    const newProduct = {
      title: title,
      category: category,
      price: price,
      img: img
    };

    fetch(urls.products, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        products.push(data);
        renderProduct(data, productsSelector);
      });
  }

  addProductCloseBtn.onclick = function (e) {
    e.preventDefault();

    const element = '.add-product-block'
    removeElement(element);

  }
}
function renderModalWindow(insertSelector, renderClassName, title) {
  const parentEl = checkPresentElements(insertSelector, renderClassName);
  if (!parentEl) {
    return false;
  }

  const
    modalWindow = doc.createElement('div'),
    modalWindowTitle = doc.createElement('h3'),
    modalWindowContent = doc.createElement('div'),
    modalWindowCloseBtn = doc.createElement('button');

  modalWindow.className = renderClassName;

  modalWindowTitle.className = `${renderClassName}-title`;
  modalWindowTitle.innerText = title;

  modalWindowContent.className = `${renderClassName}-content`;

  modalWindowCloseBtn.className = `${renderClassName}-close-btn`;
  modalWindowCloseBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

  parentEl.prepend(modalWindow);
  modalWindow.append(
    modalWindowTitle,
    modalWindowContent,
    modalWindowCloseBtn
  );

  // events

  modalWindowCloseBtn.onclick = function () {
    modalWindow.remove();
  };

  return modalWindowContent;
}
function renderLoginForm(insertSelector, renderClassName) {
  const parentEl = checkPresentElements(insertSelector, renderClassName);
  if (!parentEl) {
    return false;
  }

  const modalWindow = renderModalWindow('body', 'modal-window', 'Enter auth data');

  const
    loginForm = doc.createElement('form'),
    loginInput = doc.createElement('input'),
    pwdInput = doc.createElement('input'),
    submitBtn = doc.createElement('button');

  loginInput.name = 'login';
  loginInput.placeholder = 'enter login';

  pwdInput.name = 'pwd';
  pwdInput.placeholder = 'enter pwd';
  pwdInput.type = 'password';

  submitBtn.innerText = 'login';

  loginForm.append(
    loginInput,
    pwdInput,
    submitBtn
  );

  modalWindow.append(loginForm);

  submitBtn.onclick = function (e) {
    e.preventDefault();

    let userArr = [];
    fetch(urls.users)
      .then(res => res.json())
      .then(data => {
        userArr = data;

        const inputLogVal = loginInput.value;
        const inputPasVal = pwdInput.value;
        let user__ = '';
        for (let user_ of userArr) {
          if (user_.login == inputLogVal && user_.password == inputPasVal) {
            user__ = inputLogVal;
            break;
          }
        }
        if (user__ == '') {
          alert('Login or password is incorrect!')
        } else {
          removeElement('.' + renderClassName);
          renderAddItemBtn('.user-action');
          user = user__;
          console.log(`User ${user} is logged in!`);
        }

        renderLogInIcon('.login-container');

      });
  }
}
function renderLogInIcon(insertSelector) {
  const parentEl = doc.querySelector(insertSelector);

  const
    btnLogin = doc.createElement('button'),
    icon = doc.createElement('i');

  let dataTitle =
    user == '' ?
      'login' :
      'logout';

  icon.className =
    user == '' ?
      'fa-solid fa-right-to-bracket' :
      'fa-solid fa-right-from-bracket';

  btnLogin.className = 'login button-icon';
  btnLogin.dataset.title = dataTitle;

  const btn = '.login.button-icon'
  if (isElementPresent(btn)) {
    removeElement(btn);
  }

  btnLogin.onclick = function (e) {
    e.preventDefault();

    if (dataTitle == 'login') {
      if (user == '') {
        renderLoginForm('body', 'modal-window');
      }
    } else if (dataTitle == 'logout') {
      if (isElementPresent('.add-item')) {
        removeElement('.add-item');
        icon.className = 'fa-solid fa-right-to-bracket';
        dataTitle = 'login';
        user = '';
      }
    }
  }

  parentEl.append(btnLogin);
  btnLogin.append(icon);
}

function renderAddItemBtn(insertSelector) {
  const parentEl = doc.querySelector(insertSelector);

  const
    addItemBtn = doc.createElement('button'),
    addItemBtnIcon = doc.createElement('i');

  addItemBtn.className = 'add-item';
  addItemBtnIcon.className = 'fa-solid fa-calendar-plus';

  parentEl.prepend(addItemBtn);
  addItemBtn.append(addItemBtnIcon);


  addItemBtn.onclick = function () {
    const el = '.add-product-block'
    if (isElementPresent(el)) {
      removeElement(el);
    } else {
      renderAddProduct('body');
    }
  }
}

function checkPresentElements(insertSelector, renderClassName) {
  const el = doc.querySelector(insertSelector);
  const renderEl = doc.querySelector('.' + renderClassName);

  renderEl && renderEl.remove();

  if (!el) {
    console.error(`[${insertSelector}]: Parent element not found !!!`);
    return false;
  }

  return el;
}

function addCartHandler() {
  const id = this.closest('.product').dataset.id;

  fetch(urls.cart)
    .then(res => res.json())
    .then(data => {
      cart = data;
      cart[id] = !cart[id] ? 1 : cart[id] + 1;

      cartBtn.dataset.count = getCartObjCount(products, cart);

      if (isElementPresent(cartElem)) {
        renderCart(products, cart, 'body');
      }

      fetch(urls.cart, {
        method: 'post',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(cart)
      });
    });
}

function getCartObjCount(dataArr, cartProdsObj) {
  let count = 0;
  for (let item of dataArr) {
    if (item.id in cartProdsObj) {
      count += cartProdsObj[item.id];
    }
  }
  return count;
}