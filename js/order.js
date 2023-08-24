const doc = document;

const form = doc.querySelector('#order-form');
const nameInput = doc.querySelector('#order-form #name');
const emailInput = doc.querySelector('#order-form #email');
const phoneInput = doc.querySelector('#order-form #phone');
const btn = doc.querySelector('#btn');

btn.onclick = (e) => {
    e.preventDefault();
    
    if (validateNameInput() && validateEmailInput() && validatePhoneInput()) {
        const nameV = nameInput.value;
        const emailV = emailInput.value;
        const phoneV = phoneInput.value;

        localStorage.setItem('form', `{"name": "${nameV}", "email": "${emailV}", "phone": "${phoneV}"}`);
        window.location.href = `./final.html`;
    } else {
        alert("Form validation failed. please check your inputs.");
    }
}

function validateNameInput() {
    if (nameInput.value.length >= 4) {
        return true;
    }
    return false;
}

function validateEmailInput() {
    const email = emailInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
        return true;
    } else {
        return false;
    }
}

function validatePhoneInput() {
    const phone = phoneInput.value;
    const phonePattern = /^\d{10}$/;
    if (phonePattern.test(phone)) {
        return true;
    } else {
        return false;
    }
}
