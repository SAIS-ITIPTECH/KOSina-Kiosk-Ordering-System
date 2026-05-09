import { Categories } from "./DynamicElements/Categories.js";
import { OrderList } from "./Models/OrderList.js";
export const orderList = new OrderList();


// ===============================================================
// DINING SELECTION
function selectDiningOption(option) {
    orderList.setDiningMethod(option)
    const diningSection = document.getElementById('diningSection');
    const menuSection = document.getElementById('menuSection');
    const diningOptionText = document.getElementById('diningOption');

    diningOptionText.innerText = "Dining Option: " + option;
    diningSection.classList.add('fade-out-up');

    const categoryObject = new Categories();
    categoryObject.display();

    setTimeout(() => {
        diningSection.classList.add('section-hidden');

        menuSection.classList.remove('hidden');
        menuSection.classList.add('flex');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
}

function home() {
    const diningSection = document.getElementById('diningSection');
    const menuSection = document.getElementById('menuSection');

    diningSection.classList.remove('section-hidden', 'fade-out-up');
    menuSection.classList.add('hidden');
    menuSection.classList.remove('flex');
}

document.getElementById('checkoutBtn').disabled = (orderPanel.children.length === 0);


// ===============================================================
// CATEGORY SELECTION 


const categoryButtons = document.querySelectorAll('.category');
const defaultCategoryBtn = document.getElementById('defaultCategory');


if (defaultCategoryBtn) {
    defaultCategoryBtn.classList.add('active-category');
}

// ===============================================================
// ORDER POPUP

const modal = document.getElementById('modalOverlay');
const qtyText = document.getElementById('quantityCount');
let currentQty = 1;

export function openPopup(imgSrc, title, price) {
    document.getElementById('productInfo').innerHTML = `
        <img id="popupImg" src="${imgSrc}" alt="Selected Food"
        class="mb-4 aspect-square w-48 rounded-full border-4 border-[#76a609] object-cover shadow-md">
        <h3 id="popupTitle" class="text-xl font-bold uppercase text-gray-800">${title}</h3>
        <p id="popupPrice" class="text-lg font-bold text-[#76a609]">${price}</p>
    `

    currentQty = 1;
    qtyText.innerText = currentQty;
    modal.classList.remove('hidden');
}

export function closePopup() {
    modal.classList.add('hidden');
}

function updateQty(amount) {
    currentQty += amount;
    if (currentQty < 1) currentQty = 1;
    qtyText.innerText = currentQty;
}

document.querySelectorAll('.grid button.group').forEach(btn => {
    btn.addEventListener('click', () => {
        const imgSrc = btn.querySelector('img').src;
        const title = btn.querySelector('h3').innerText;
        const price = btn.querySelector('p').innerText;
        openPopup(imgSrc, title, price);
    });
});




// ===============================================================
// ORDER LIST

function changeQty(name, delta) {
    const targetItem = orderList.products.find(item => item.getName() === name);
    targetItem.setQuantity(targetItem.getQuantity() + delta);
    orderList.calculateTotalPrice();

    if (targetItem.getQuantity() < 1) {
        removeItem(targetItem.getName());
    } else {
        document.getElementById(`order${name}`).innerText = targetItem.getQuantity();
        document.getElementById("totalPrice").innerText = orderList.totalPrice.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });
        
    }
}

function removeItem(targetItem) {
    console.log(orderList);
    orderList.products = orderList.products.filter(orders => orders.getName() != targetItem)
    orderList.calculateTotalPrice();
    document.getElementById(`order${targetItem}`).parentElement.parentElement.remove()
    document.getElementById("totalPrice").innerText = orderList.totalPrice.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });
}


// ===============================================================
// 

function startCheckout() {
    document.getElementById('menuSection').classList.add('hidden');
    document.getElementById('menuSection').classList.remove('flex');

    const checkout = document.getElementById('checkoutSection');
    checkout.classList.remove('hidden');
    checkout.classList.add('flex');

    renderSummary();
    showStep('stepSummary', 25);
}

function renderSummary() {

    const list = document.getElementById('summaryList');
    list.innerHTML = '';

    orderList.products.forEach(item => {
        const row = document.createElement('div');
        row.className = "flex justify-between items-center text-2xl";
        row.innerHTML = `
            <span class="font-bold text-gray-600">${item.getName()}</span>
            <span class="text-sm text-gray-500 ">x${item.getQuantity()}</span>
            <span class="font-bold text-gray-500">${item.getTotalPrice().toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })}</span>
        `;
        list.appendChild(row);
    });

    document.getElementById('summaryTotal').innerText = document.getElementById('totalPrice').innerText;
}

function showStep(stepId, progress) {
    ['stepSummary', 'stepPayment', 'stepService', 'stepFinal'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });

    document.getElementById(stepId).classList.remove('hidden');

    document.getElementById('progressBar').style.width = progress + '%';
}

function backToMenu() {
    document.getElementById('checkoutSection').classList.add('hidden');
    document.getElementById('checkoutSection').classList.remove('flex');
    document.getElementById('menuSection').classList.remove('hidden');
    document.getElementById('menuSection').classList.add('flex');
}

async function selectPaymentMethod(method){
    console.log(method)
    showStep('stepService', 75);
    const paymentMethod = (method === "cashless") ? "cashless" : "cash";
    let orderObject = [];
    for (let orders of orderList.products) {
        orderObject.push({
            "productId": orders.getId(),
            "quantity": orders.getQuantity()
        })
    }
    let checkoutUrl = await postApi("neworder", {
        "paymentMethod": paymentMethod,
        "restoName": getCookie("resto"),
        "orders": orderObject
    });

    if (paymentMethod === "cashless") { checkout(checkoutUrl) }
}

function checkout(checkoutUrl){
    console.log("letsgo")
    const checkoutPanel = document.getElementById("checkout");
    checkoutPanel.classList.remove('section-hidden');
    checkoutPanel.src = checkoutUrl;
}

function completeCheckout() {
    const num = Math.floor(Math.random() * 99) + 1;
    document.getElementById('finalOrderNumber').innerText = num.toString().padStart(2, '0');

    showStep('stepFinal', 100);
}

function resetToStart() {
    let orderpanel = document.getElementById('orderPanel');
    orderList.resetOrder();
    orderpanel.innerHTML = '';
    document.getElementById('subtotal').innerText = '₱ 0.00';
    document.getElementById('totalPrice').innerText = '₱ 0.00';

    document.getElementById('checkoutBtn').disabled = true;

    document.getElementById('checkoutSection').classList.add('hidden');
    document.getElementById('checkoutSection').classList.remove('flex');

    const diningSection = document.getElementById('diningSection');
    diningSection.classList.remove('section-hidden', 'fade-out-up');

    showStep('stepSummary', 25);

    window.scrollTo(0, 0);
}

document.getElementById('checkoutBtn').disabled = true;




// ===============================================================
// API CONNECTORS

export async function postApi(target, body){
    let data = await fetch(`https://kosina-api.up.railway.app/${target}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${getCookie("token")}`
        },
        body: JSON.stringify(body)
    }) 
    return await data.json();
}

export async function getApi(target, id = "") {
        let data = await fetch(`https://kosina-api.up.railway.app/${target}/${id}`,{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${getCookie("token")}`
            }
        }) 
        return await data.json();
    }

const loginButton = document.getElementById("loginButton");
const username = document.getElementById("username");
const password = document.getElementById("password");


async function submit(){
    let data = await postApi("login", {
        "username": username.value,
        "password": password.value
    });

    username.value = "";
    password.value = "";

    if (data["status"] === "error") {window.alert(`${data["message"]}`);}
    else{
        saveToCookie(data);
    }
}

function saveToCookie(data){
    document.cookie = `token=${data["token"]}; max-age=${data["expiration"]}; path=/`
    document.cookie = `name=${data["name"]}; max-age=${data["expiration"]}; path=/`
    document.cookie = `resto=${data["resto"]}; max-age=${data["expiration"]}; path=/`
}

async function checkToken(){
    let data = await get("return");
    if (data["status"] === "error") {
        window.alert(`${data["message"]}`);
        
    }
    else{
        window.alert("welcome back");
    }
}

function getCookie(target){
    const cookies = document.cookie.split(';');
    for(const cookie of cookies){
        const [name, value] = cookie.split('=');
        if(name.trim() === target){
            return decodeURIComponent(value);
        }
    }
    return null;
}


function logout(){
    document.cookie = "token= ;expires=Tue, 11 Sep 2001 00:00:00 UTC; path=/;";
    document.cookie = "name= ;expires=Tue, 11 Sep 2001 00:00:00 UTC; path=/;";
    document.cookie = "resto= ;expires=Tue, 11 Sep 2001 00:00:00 UTC; path=/;";
    location.reload();
}

// ===============================================================
// WINDOW SHARED FUNCTIONS
window.submit = submit;
window.selectDiningOption = selectDiningOption;
window.home = home;
window.updateQty = updateQty;
window.changeQty = changeQty;
window.removeItem = removeItem;
window.closePopup = closePopup;
window.startCheckout = startCheckout;
window.backToMenu = backToMenu;
window.showStep = showStep;
window.selectPaymentMethod = selectPaymentMethod;
window.completeCheckout = completeCheckout;
window.resetToStart = resetToStart;