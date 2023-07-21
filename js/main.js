const doc = document;
const productsSelector = '.products';
const productElement = doc.querySelector(productsSelector);
let cartBtn = doc.querySelector('.mini-cart');
const cartElem = '.cart';
let cart = {};
const urls = {
  products: 'http://localhost:3000/products',
  cart: 'http://localhost:3000/cart',
  users: 'http://localhost:3000/users'
};
const addItemBtn = doc.querySelector('.add-item');
const productPerPageSelect = doc.querySelector('.productPerPage select');

let products = [];
let user = '';

let activePaginationPage = 1;

// queries
// get, post...
fetch(urls.products)
  .then(res => res.json())
  .then(data => {
    products = data;
    // renderProducts(products, productsSelector);
    renderPagination(products, productPerPageSelect.value, '.pagination');
    renderProducts(getNewProdWPag(activePaginationPage, productPerPageSelect.value, products), productsSelector);
  });

fetch(urls.cart)
  .then(res => res.json())
  .then(data => {
    cart = data;
    cartBtn.dataset.count = getCartObjCount(products, cart);
  });

// renderProducts(products, productsSelector);
renderLogInIcon('.login-container');

cartBtn.dataset.count = getCartObjCount(products, cart);

cartBtn.onclick = function (e) {
  e.preventDefault();
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
};
productPerPageSelect.onchange = function () {
  const prodPerPage = productPerPageSelect.value;
  activePaginationPage = 1;
  renderPagination(products, prodPerPage, '.pagination');

  productElement.innerHTML = '';
  renderProducts(getNewProdWPag(activePaginationPage, prodPerPage, products), productsSelector);
}

function getNewProdWPag(activePagPage, prodPerPageVal, dataArr) {
  let pppvn = Number(prodPerPageVal);

  if (pppvn != prodPerPageVal) {
    pppvn = dataArr.length;
  }

  const num = (activePagPage - 1) * pppvn;
  return dataArr.slice(num, num + pppvn);
}
function findElement(selector) {
  return doc.querySelector(selector);
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

  product.className = 'product pr';
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
  addCart.innerHTML = 'Add cart';
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

  productImg.onclick = function () {
    if (isElementPresent('.bigBlockProdInfo')) {
      removeElement('.bigBlockProdInfo')
    }
    const body = doc.querySelector('body');
    const
      bigBlock = doc.createElement('div'),
      bigBlockImg = doc.createElement('img'),
      bigBlockInfoContainer = doc.createElement('div'),
      bigBlockTitle = doc.createElement('h3'),
      bigBlockPriceBlock = doc.createElement('div'),
      bigBlockPrice = doc.createElement('span'),
      bigBlockaddCart = addCart,
      bigBlockCategory = doc.createElement('span'),
      bigBlockCloseBtn = doc.createElement('button');

    bigBlock.className = 'bigBlockProdInfo product';
    bigBlockImg.className = 'bigBlockImg';
    bigBlockInfoContainer.className = 'bigBlockInfoContainer';
    bigBlockTitle.className = 'bigBlockTitle';
    bigBlockPriceBlock.className = 'bigBlockPriceBlock';
    bigBlockPrice.className = 'bigBlockPrice';
    bigBlockaddCart.className = 'bigBlockaddCart';
    bigBlockCategory.className = 'bigBlockCategory';
    bigBlockCloseBtn.className = 'bigBlockCloseBtn';

    bigBlock.dataset.id = id;

    bigBlockImg.src = imgPath;
    bigBlockImg.alt = img;

    bigBlockTitle.innerText = title;
    bigBlockPrice.innerText = price;
    bigBlockCategory.innerText = category;
    bigBlockCloseBtn.innerText = 'X'

    body.append(bigBlock);
    bigBlock.append(bigBlockImg, bigBlockInfoContainer)
    bigBlockInfoContainer.append(bigBlockTitle, bigBlockCategory, bigBlockPriceBlock);
    bigBlockPriceBlock.append(bigBlockPrice, bigBlockaddCart, bigBlockCloseBtn);

    bigBlockaddCart.onclick = addCartHandler;

    bigBlockCloseBtn.onclick = function () {
      removeElement('.bigBlockProdInfo');
    }
  }
  addCart.addEventListener('click', addCartHandler);
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

  cartCloseBtn.className = 'cart-close-btn';
  cartCloseBtn.innerText = 'X';

  cartTitle.className = 'cart-title';
  cartTitle.innerText = 'Cart';

  cartProds.className = 'cart-prods';

  parentEl.prepend(cart);
  cart.append(cartCloseBtn, cartTitle, cartProds);

  renderCartProds(dataArr, cartProdsObj, '.cart-prods');
  renderCartTotal(totalSum, cartElem);

  cartCloseBtn.onclick = function () {
    removeElement(cartElem);
  };
}

function renderCartProds(dataArr, cartProdsObj, insertSelector) {
  let count = 1;

  for (let id in cartProdsObj) {
    const qty = cartProdsObj[id];
    const prod = dataArr.find(item => item.id == id);

    renderCartProd(count, prod, qty, insertSelector, cartProdsObj);
    count++;
  }
}

function renderCartProd(
  count,
  prodObj,
  cartProdQty,
  insertSelector,
  cartProdsObj
) {
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
  productQtySpinerPlus.innerHTML = '<i class="fa-solid fa-plus"></i>';
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
  };
  productQtySpinerMinus.onclick = function () {
    minNItemToCart(cartProdsObj, prodObj);
    renderCart(products, cart, 'body');
  };
  pruductDel.onclick = function () {
    deleteCartProdObj(cartProdsObj, prodObj);
    renderCart(products, cart, 'body');
  };
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
      deleteCartProdObj(cartProdsObj, prodObj);
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

  const addProduct = doc.createElement('div'),
    addProductTitle = doc.createElement('h2'),
    addProductForm = doc.createElement('form'),
    addProductFormTitleLabel = doc.createElement('label'),
    addProductFormTitleInput = doc.createElement('input'),
    addProductFormCategoryLabel = doc.createElement('label'),
    addProductFormCategorySelect = doc.createElement('select'),
    addProductFormPriceLabel = doc.createElement('label'),
    addProductFormPriceInput = doc.createElement('input'),
    addProductFormImgInput = doc.createElement('input'),
    addProductFormImgLabel = doc.createElement('label'),
    addProductFormBtn = doc.createElement('button'),
    addProductCloseBtn = doc.createElement('button');

  addProduct.className = 'add-product-block';
  addProductForm.className = 'add-product';
  addProductFormTitleInput.className = 'add-product-title';
  addProductFormCategorySelect.className = 'add-product-category';
  addProductFormPriceInput.className = 'add-product-price';
  addProductFormImgInput.className = 'add-product-img';
  addProductFormBtn.className = 'add-product-btn';
  addProductCloseBtn.className = 'add-product-close-btn';

  addProductTitle.innerText = 'Add Product';
  addProductFormTitleLabel.innerText = 'Title:';
  addProductFormCategoryLabel.innerText = 'Category:';
  addProductFormPriceLabel.innerText = 'Price:';
  addProductFormImgLabel.innerText = 'Img:';
  addProductFormBtn.innerText = 'Add';
  addProductFormBtn.type = "button";
  addProductFormImgInput.type = 'file';
  addProductCloseBtn.innerText = 'X';

  parentEl.append(addProduct);
  addProduct.append(addProductTitle, addProductForm);
  addProductForm.append(
    addProductFormTitleLabel,
    addProductFormTitleInput,
    addProductFormCategoryLabel,
    addProductFormPriceLabel,
    addProductFormPriceInput,
    addProductFormImgLabel,
    addProductFormImgInput,
    addProductFormBtn,
    addProductCloseBtn
  );

  addProductFormCategoryLabel.append(addProductFormCategorySelect);

  const uniqueCategoriesSet = new Set(products.map(product => product.category));
  const uniqueCategories = [...uniqueCategoriesSet];

  const optionNone = doc.createElement('option');
  optionNone.innerText = 'none';
  optionNone.value = 'none';
  addProductFormCategorySelect.append(optionNone);

  for (let category of uniqueCategories) {
    const categoryOption = doc.createElement('option');
    categoryOption.value = category;
    categoryOption.innerText = category;
    addProductFormCategorySelect.append(categoryOption);
  }

  let imgName = '';
  addProductFormImgInput.onchange = function(){
    imgName = this.files[0].name
    console.log(imgName);
  }

  addProductFormBtn.onclick = function (e) {
    e.preventDefault();

    const
      newId = products[products.length - 1].id + 1,
      title = addProductFormTitleInput.value,
      category = addProductFormCategorySelect.value,
      price = addProductFormPriceInput.value,
      img = imgName;

    const newProduct = {
      title: title,
      category: category,
      price: Number(price),
      img: img
    };

    for (let item in newProduct) {
      if (newProduct[item] == '' || newProduct[item] == undefined || newProduct[item] == null || newProduct[item] == 'none' || !addProductFormImgInput.files[0]) {
        const body = doc.querySelector('.header')

        const
          validErrorBlock = doc.createElement('div'),
          validErrorBlockText = doc.createElement('p'),
          validErrorBlockCloseBtn = doc.createElement('button');

        validErrorBlock.className = 'valid-error-addproduct-block';
        validErrorBlockText.className = 'valid-error-addproduct-block-text';
        validErrorBlockCloseBtn.className = 'valid-error-addproduct-block-close-btn';

        validErrorBlockText.innerText = 'Ви не заповнили всі інпути!';
        validErrorBlockCloseBtn.innerText = 'X';

        body.append(validErrorBlock);
        validErrorBlock.append(validErrorBlockText, validErrorBlockCloseBtn)

        validErrorBlockCloseBtn.onclick = function () {
          removeElement('.valid-error-addproduct-block');
        }

        return false;
      }
    }

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
  };

  addProductCloseBtn.onclick = function (e) {
    e.preventDefault();

    const element = '.add-product-block';
    removeElement(element);
  };
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
          alert('Login or password is incorrect!');
        } else {
          removeElement('.' + renderClassName);
          renderAddItemBtn('.user-action');
          user = user__;
          console.log(`User ${user} is logged in!`);
        }

        renderLogInIcon('.login-container');
      });
  };
}

function renderLogInIcon(insertSelector) {
  const parentEl = doc.querySelector(insertSelector);

  const btnLogin = doc.createElement('button');
  const icon = doc.createElement('i');

  let dataTitle = user == '' ? 'login' : 'logout';

  icon.className = user == '' ? 'fa-solid fa-right-to-bracket' : 'fa-solid fa-right-from-bracket';

  btnLogin.className = 'login button-icon';
  btnLogin.dataset.title = dataTitle;

  const btn = '.login.button-icon';
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
  };

  parentEl.append(btnLogin);
  btnLogin.append(icon);
}

function renderAddItemBtn(insertSelector) {
  const parentEl = doc.querySelector(insertSelector);

  const addItemBtn = doc.createElement('button');
  const addItemBtnIcon = doc.createElement('i');

  addItemBtn.className = 'add-item';
  addItemBtnIcon.className = 'fa-solid fa-calendar-plus';

  parentEl.prepend(addItemBtn);
  addItemBtn.append(addItemBtnIcon);

  addItemBtn.onclick = function () {
    const el = '.add-product-block';
    if (isElementPresent(el)) {
      removeElement(el);
    } else {
      renderAddProduct('body');
    }
  };
}

function renderPagination(dataArr, productPerPage, insertSelector) {
  const parentEl = doc.querySelector(insertSelector);

  if (Number(productPerPage) != productPerPage) {
    productPerPage = dataArr.length - 1;
  }
  const pagesCount = Math.round(dataArr.length / productPerPage);

  console.log('pages: ' + pagesCount);

  const
    arrowLeftBlock = doc.createElement('div'),
    arrowLeftBlockIcon = doc.createElement('i'),
    arrowRightBlock = doc.createElement('div'),
    arrowRightBlockIcon = doc.createElement('i'),
    paginationList = doc.createElement('ul');

  arrowLeftBlock.className = 'page page-prev silver-text';
  arrowLeftBlockIcon.className = 'fa-solid fa-left-long';
  arrowRightBlock.className = 'page page-next';
  arrowRightBlockIcon.className = 'fa-solid fa-right-long';
  paginationList.className = 'pages';

  parentEl.innerHTML = '';

  parentEl.append(arrowLeftBlock, paginationList, arrowRightBlock);
  arrowRightBlock.append(arrowRightBlockIcon);
  arrowLeftBlock.append(arrowLeftBlockIcon);

  for (let i = 1; i <= pagesCount; i++) {
    const page = doc.createElement('li');
    page.className = `page${i == activePaginationPage ? ' active' : ''}`;
    page.innerText = i;
    page.dataset.count = i;
    paginationList.append(page);

    page.onclick = function () {
      if (!this.classList.contains('active')) {
        for (let li of this.parentNode.children) {
          li.className = 'page';
        }
        this.className += ' active';

        Number(this.dataset.count) == 1 ?
          arrowLeftBlock.className += ' silver-text' :
          arrowLeftBlock.classList.contains('silver-text') ?
            arrowLeftBlock.classList.remove('silver-text') : null;

        Number(this.dataset.count) == pagesCount ?
          arrowRightBlock.className += ' silver-text' :
          arrowRightBlock.classList.contains('silver-text') ?
            arrowRightBlock.classList.remove('silver-text') : null;

        activePaginationPage = Number(this.dataset.count);
        productElement.innerHTML = '';
        renderProducts(getNewProdWPag(activePaginationPage, productPerPageSelect.value, products), productsSelector);
      }
    }

    arrowRightBlock.onclick = function () {
      for (let li of page.parentNode.children) {
        if (li.classList.contains('active') && !arrowRightBlock.classList.contains('silver-text')) {
          arrowLeftBlock.classList.contains('silver-text') ?
            arrowLeftBlock.classList.remove('silver-text') : null;

          const ul = li.parentElement;

          if (!(Number(li.dataset.count) > pagesCount - 1)) {
            li.className = 'page';
            ul.children[Number(li.dataset.count)].className += ' active';
            if (Number(li.dataset.count) == pagesCount - 1) {
              this.className += ' silver-text';
            }
            activePaginationPage = Number(li.dataset.count) + 1;
            productElement.innerHTML = '';
            renderProducts(getNewProdWPag(activePaginationPage, productPerPageSelect.value, products), productsSelector);
          }
          break;
        }
      }
    }
    arrowLeftBlock.onclick = function () {
      for (let li of page.parentNode.children) {
        if (li.classList.contains('active') && !arrowLeftBlock.classList.contains('silver-text')) {
          arrowRightBlock.classList.contains('silver-text') ?
            arrowRightBlock.classList.remove('silver-text') : null;

          const ul = li.parentElement;

          if (!(Number(li.dataset.count) < 2)) {
            li.className = 'page';
            ul.children[Number(li.dataset.count) - 2].className += ' active';
            if (Number(li.dataset.count) <= 2) {
              this.className += ' silver-text';
            }
            activePaginationPage = Number(li.innerText) - 1;
            productElement.innerHTML = '';
            renderProducts(getNewProdWPag(activePaginationPage, productPerPageSelect.value, products), productsSelector);
          }
          break;
        }
      }
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

function addCartHandler(e) {
  e.preventDefault();

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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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
