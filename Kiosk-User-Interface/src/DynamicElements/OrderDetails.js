import { DomList } from "./DomList.js";
import { DomOrderDetail } from "./DomOrderDetail.js";
import { orderList } from "../script.js";

export class OrderDetails extends DomList {
    constructor(){
        super("orderPanel");
    }
    
    display() {
        this.clear();
        orderList.products.forEach((index, order) => {
            this.items.push(new DomOrderDetail(order, index))
        })
        this.renderAll(); 
        this.items = []
    }
}
