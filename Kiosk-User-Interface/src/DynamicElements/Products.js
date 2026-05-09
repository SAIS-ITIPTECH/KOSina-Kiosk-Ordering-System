import { getApi } from "../script.js";
import { DomList } from "./DomList.js";
import { DomProduct } from "./DomProduct.js";

export class Products extends DomList {
    constructor() {
        super("productList");
        // this.orderDetails = new OrderDetails();
    }
    
    async display(categoryId) {
        console.log("product cliked")
        // let products = await getApi("products", categoryId);
        // await this.putToItems(products)
        // this.renderAll();
    }

    async putToItems(products){
        this.items = await products.map(pro => {
            const item = new DomProduct(pro);

            //give event listener to the buttons
            item.onclick = () => { 
                const order = new Order(pro.name, pro.price, pro.product_id);
                
                if (orderList.products.length <= 0) {
                    this.finishOrder(order);

                } else {
                    const exists = orderList.products.some(p => p.getId() == order.getId());
                    
                    if (exists) {
                        window.alert("already exists");
                    } else {
                        this.finishOrder(order)
                    }
                }
            };

            return item;   
        });
    }

    //opens the quantity panel when a product clicked
    async finishOrder(order){
        await order.openQuantityPanel();
        orderList.addOrder(order);
        this.orderDetails.display()
    }

    //display the products of the first category
    default(){
        const first = this.getFirstCategory()
        this.changeTitle(first.innerHTML);
        this.display(first.value)
    }
}
