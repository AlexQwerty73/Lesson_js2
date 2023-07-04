const doc = document;
 
const products = [
    { id: 1, title: 'product1', category: 'notebooks', img: 'img.jpg', price: 500 },
    { id: 2, title: 'product2', category: 'phone', img: 'phone.jpg', price: 1000 },
    { id: 3, title: 'product3', category: 'pc', img: 'pc.jpg', price: 1200 },
    { id: 4, title: 'product4', category: 'ps', img: 'img.jpg', price: 1500 },
    { id: 5, title: 'product5', category: 'phone', img: 'phone.jpg', price: 700 },
    { id: 6, title: 'product6', category: 'pc', img: 'pc.jpg', price: 2000 },
];

const selectContainer = doc.querySelector('.select-container');
const shopContainer = doc.querySelector('.shop-container');
const cartContainer = doc.querySelector('.cart-container')
const cartBtn = doc.querySelector('.cart-btn');

let cart = [];

sortPriceToBig = (arr) => arr.sort((a, b) => a.price - b.price);
sortPriceToSmall = (arr) => arr.sort((a, b) => b.price - a.price);

sortCategory = (arr, category) => arr.sort((a) => a.category == category ? -1 : 1);


selectContainer.innerHTML = renderHTMLSelect(products);
selectContainer.innerHTML = renderHTMLShop(products);

shopContainer.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
        cart.push(e.target.parentNode.innerHTML);
        cartContainer.innerHTML = ``;
    }
});

cartBtn.onclick = (e) => {
    cartContainer.innerHTML = rendercartHTML(cart);

    for (let i in cart) {
        let btn = e.target.parentNode.childNodes[3].childNodes[3 + i * 2].childNodes[9]
        btn.innerText = 'Del';
        if (btn.className == 'addCart') {
            btn.classList.remove("addCart");
            btn.classList.add('delCard')
        }
    }
};

cartContainer.onclick = (e) => {
    if (e.target.tagName === 'BUTTON') {
        cart.splice(e.target.parentNode.id - 1, 1);
        cartContainer.innerHTML = rendercartHTML(cart);

        let newHTML = ``;
        let index = 1;

        for (let i of cart) {
            newHTML += `<div class="shop-item" id="${index++}">` + i.replace('addCart', 'delCard').replace('Add', 'Del') + '</div>';
        }
        cart = newHTML;
        cartContainer.innerHTML = cart;
    }
}
function renderHTMLSelect(arr) {
    const categorySet = new Set(arr.map(item => item.category));
    const options = Array.from(categorySet, item => `<option value="${item}">${item}</option>`);
    return `<select name="category" id="category"><option value="none">none</option>${options.join('')}<option value="ToSmallPrice">ToSmallPrice</option><option value="ToBigPrice">ToBigPrice</option></select>`;
};

function renderHTMLShop(arr) {
    let html = ``;
    for (let item of arr) {
        html += `
            <div class="shop-item" id="${item.id}">
                <img src="../img/${item.img}" alt="#">
                <p>Title: <span>${item.title}</span></p>
                <p>Category: <span>${item.category}</span></p>
                <p>price: <span>${item.price}</span></p>
                <button class='addCart'>Add</button>
            </div>
        `
    }
    return html;
}

function selectChangeCategory(arr) {
    const category = doc.querySelector('#category').value;
    if (category != 'ToSmallPrice' && category != 'ToBigPrice') {
        return category == 'none' ? renderHTMLShop(arr) : renderHTMLShop(sortCategory(arr, category));
    } else {
        if (category == 'ToSmallPrice') {
            return renderHTMLShop(sortPriceToSmall(arr));
        } else if (category == 'ToBigPrice') {
            return renderHTMLShop(sortPriceToBig(arr));
        }
    }

    category.addEventListener('change', () => {
        shopContainer.innerHTML = selectChangeCategory(products);
    });
}

function rendercartHTML(arr) {
    let html = `cart:<hr>`;
    let index = 1;
    for (let item of arr) {
        html += `
        <div class="shop-item" id="${index++}">
        ${item}
        </div>
        `;
    }
    return html + `<hr>`
}

