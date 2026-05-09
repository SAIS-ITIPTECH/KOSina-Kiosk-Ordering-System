export class OrderList {
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
}
