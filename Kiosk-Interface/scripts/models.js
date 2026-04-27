//classes use to build something

import { quantityPanel, orderList } from "./main.js"

// class for the indivual order objects
class Order {
    //Private Fields
    #name
    #id
    #price
    #quantity
    #totalPrice

    constructor(name, price, id) {
        this.#name = name;
        this.#id = id;
        this.#price = price;
    }

    setName(name) {
        this.#name = name;
    }

    setId(id) {
        this.#id = id;
    }

    setPrice(price) {
        this.#price = price;
    }

    setQuantity(quantity) {
        this.#quantity = quantity;
        this.setTotalPrice();
    }

    setTotalPrice(){
        this.#totalPrice = this.#price * this.#quantity
    }

    getName(){
        return this.#name;
    }

    getId(){
        return this.#id;
    }

    getPrice(){
        return Number(this.#price);
    }

    getQuantity(){
        return Number(this.#quantity);
    }

    getTotalPrice(){
        return this.#totalPrice;
    }

    //used by the Product object
    // return promise so it would stop the rest of the program while the customer is choosing the quantity
    openQuantityPanel(){
        return new Promise((resolve) => {
            quantityPanel.open(this);

            quantityPanel.confirmButton.addEventListener('click', () => {
                this.setQuantity(quantityPanel.value);
                quantityPanel.close();
                resolve(this);
            }, { once: true });
        })
    }
}

//class for the orderlist object, should only be used once to be consistent
class OrderList {
    constructor() {
        this.products = [];
        this.totalPrice = 0;
        this.diningMethod;
        this.paymentMethod;
        this.paid = false;
    }

    //add order used by the Products Class
    addOrder(order) {
        this.products.push(order);
        this.calculateTotalPrice();
    }

    //Used by dining method button
    setDiningMethod(diningMethod){
        this.diningMethod = diningMethod;
    }

    // used by payment method button
    setPaymentMethod(paymentMethod){
        this.paymentMethod = paymentMethod;
    }

    //used by either gcash or paymaya button
    togglePaid(){
        this.paid = true;
    }
    
    //called everytime a new order added ti the orderList
    calculateTotalPrice(){  
        let totalPrice = 0;
        this.products.forEach((pro)=>{
            totalPrice += pro.getTotalPrice();
        });
        this.totalPrice = totalPrice;

    }

    //used by remove orderbutton
    removeOrder(id){
        this.products.forEach((pro, index)=>{
            if(pro.getId() == id){
                this.products.splice(index, 1)
            }
        })
        this.calculateTotalPrice();
    }

    //used by reset order button
    //remove all the data in the object
    resetOrder(){
        this.products = [];
        this.totalPrice = 0;
        this.diningMethod = null;
    }

    //Ill do this later
    confirmOrder(){

    }

    // used by change quantity button
    // return promise so it would stop the rest of the program while the customer is modifying the quantity
    updateQuantity(id){
        return new Promise((resolve) => {
            this.products.forEach((order)=>{
                if(order.getId() == id){
                    quantityPanel.open(order);
                    quantityPanel.confirmButton.addEventListener('click', () => {
                        order.setQuantity(quantityPanel.value);
                        quantityPanel.close();
                        this.calculateTotalPrice();
                        resolve(this);
                    }, { once: true });
                }
            })
        }) 
    }
}

export { Order, OrderList };
