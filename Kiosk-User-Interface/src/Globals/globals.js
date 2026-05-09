//This file is for the stuff that already defined in the html and needed function and listners

import { orderList } from "./main.js";
import { OrderDetails } from "./dynamicElements.js";

// make objects for each button class so only one method needed to be called in main
class AllButtons{
    constructor(){
        this.lists = [
            new ViewOrderList('viewOrderList'),
            new ConfirmOrder('confirmOrder'),
            new ResetOrder('resetOrder'),
            new DineInButton('dineIn'),
            new TakeOutButton('takeOut'),
            new Cash('cash'),
            new CashLess('cashLess'),
            new GCash('gCash'),
            new PayMaya('payMaya')
        ]
    }
    
    createAllButton(){
        this.lists.forEach(button => {
            button.createButton();
        })
    }
}

class QuantityPanel {
    constructor(incBtn, decBut, conBut, quantity , quanPanel) {
        this.quantityPanel = document.getElementById(quanPanel);
        this.quantity = document.getElementById(quantity);
        this.increaseButton = document.getElementById(incBtn);
        this.decreaseButton = document.getElementById(decBut);
        this.confirmButton = document.getElementById(conBut);
        this.value = parseInt(this.quantity.innerHTML, 10) || 0;
        this.order;
    }

    bind(){
        this.increaseButton.addEventListener('click', () => this.increment());
        this.decreaseButton.addEventListener('click', () => this.decrement());
    }
    
    //open the quantitypanel and pass the new order if called by appendOrder or the selected order if called by updateOrder
    open(order) {
        this.order = order;
        this.quantityPanel.classList.toggle("hide");
    }

    //close the panel, should only be called by either appendOrder or updateOrder method from the OrderList Class
    close() {
        this.value = 1;
        this.updateDisplay();
        this.quantityPanel.classList.toggle("hide");
    }

    //changes the number in the screen
    updateDisplay() {
        this.quantity.innerHTML = this.value;
    }

    increment() {
        this.value++;
        this.updateDisplay();
    }

    decrement() {
        if (this.value > 1) {
            this.value--;
            this.updateDisplay();
        }
    }
}

class OrderDetailButtons{
    constructor(id){
        this.element = document.getElementById(id);
        this.orderDetails = new OrderDetails();
    }

    createButton(){}

    methodToRun(){}
    
    giveEventListener(method){
        this.element.onclick = method;
    }
}

class ViewOrderList extends OrderDetailButtons{
    constructor(id){
        super(id);
    }

    createButton(){
        
        this.giveEventListener(() => this.methodToRun())
    }

    methodToRun(){
        document.getElementById('orderListContainer1').classList.toggle('hide')
    }
}

class ConfirmOrder extends OrderDetailButtons{
    constructor(id){
        super(id);
        this.paymentMethodPanel = document.getElementById('paymentMethodContainer');
    }

    createButton(){
        
        this.giveEventListener(() => this.methodToRun());
    }

    methodToRun(){
        this.paymentMethodPanel.classList.toggle('hide');
    }
}

class ResetOrder extends OrderDetailButtons{
    constructor(id){
        super(id);
    }

    createButton(){
        this.giveEventListener(() => this.methodToRun());
    }

    methodToRun(){
        console.log("reseted")
        orderList.resetOrder();
        this.orderDetails.display();
    }
}

class DineInButton extends OrderDetailButtons{
    constructor(id){
        super(id);
    }

    createButton(){
        
        this.setContainer()
        this.giveEventListener(() => this.methodToRun());
    }

    setContainer(){
        this.container = this.element.parentElement;
    }

    methodToRun(){
        this.container.classList.toggle("hide");
        orderList.setDiningMethod("Dine In");
    }
}

class TakeOutButton extends OrderDetailButtons{
    constructor(id){
        super(id);
    }

    createButton(){
        this.setContainer()
        this.giveEventListener(() => this.methodToRun());
    }

    setContainer(){
        this.container = this.element.parentElement;
    }

    methodToRun(){
        this.container.classList.toggle("hide");
        orderList.setDiningMethod("Take Out");
    }
}

class Cash extends OrderDetailButtons{
    constructor(id){
        super(id);
    }

    createButton(){
        
        this.setContainer()
        this.giveEventListener(() => this.methodToRun());
    }

    setContainer(){
        this.container = this.element.parentElement;
    }

    methodToRun(){
        orderList.setPaymentMethod('Cash')
        this.container.classList.toggle("hide");
        console.log(orderList.products, orderList.totalPrice, orderList.diningMethod, orderList.paymentMethod);
    }
}

class CashLess extends OrderDetailButtons{
    constructor(id){
        super(id);
        this.cashLessPanel = document.getElementById('cashLessOptionsContainer');
    }

    createButton(){
        
        this.setContainer()
        this.giveEventListener(() => this.methodToRun());
    }

    setContainer(){
        this.container = this.element.parentElement;
    }

    methodToRun(){
        orderList.setPaymentMethod('Cash Less')
        this.container.classList.toggle("hide");
        this.cashLessPanel.classList.toggle("hide");
        window.alert(`Thank You for Ordering, Take the Stub and Proceed to the Cashier for Payment`);    
    }
}

class GCash extends OrderDetailButtons{
    constructor(id){
        super(id);
    }

    createButton(){
        
        this.setContainer()
        this.giveEventListener(() => this.methodToRun());
    }

    setContainer(){
        this.container = this.element.parentElement;
    }

    methodToRun(){
        this.container.classList.toggle("hide");
        orderList.togglePaid();
        window.alert(`Thank You for Ordering, Please wait while we prepare your order`);
    }
}

class PayMaya extends OrderDetailButtons{
    constructor(id){
        super(id);
    }

    createButton(){
        
        this.setContainer()
        this.giveEventListener(() => this.methodToRun());
    }

    setContainer(){
        this.container = this.element.parentElement;
    }

    methodToRun(){
        this.container.classList.toggle("hide");
        orderList.togglePaid();
        window.alert(`Thank You for Ordering, Please wait while we prepare your order`);
    }
}

export { AllButtons, QuantityPanel }