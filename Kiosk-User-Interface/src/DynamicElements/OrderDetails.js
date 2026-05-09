import { DomList } from "./DomList.js";
import { DomOrderDetail } from "./DomOrderDetail.js";
import { orderList } from "../script.js";

export class OrderDetails extends DomList {
    constructor(){
        super("orderPanel");
        this.totalPriceScreen = document.getElementById('totalPrice');
    }
    
    display() {
        console.log(orderList.products, 1)
        orderList.products.forEach((index, order) => {
            this.items.push(new DomOrderDetail(order, index))
        })
        this.renderAll(); 
        this.items = []
    }

    displayTotalPrice(){
        this.totalPriceScreen.innerHTML = `Total Price: ${orderList.totalPrice}`;
    }
}
