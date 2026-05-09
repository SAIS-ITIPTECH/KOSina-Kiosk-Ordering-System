import { getApi, orderList, openPopup, closePopup } from "../script.js";
import { DomList } from "./DomList.js";
import { DomProduct } from "./DomProduct.js";
import { Order } from "../Models/Order.js";
import { OrderList } from "../Models/OrderList.js";
import { OrderDetails } from "./OrderDetails.js";


export class Products extends DomList {
    constructor() {
        super("productList");
        this.orderDetails = new OrderDetails();
    }
    
    async display(categoryId) {
        this.clear()
        let products = await getApi("products", categoryId);
        await this.putToItems(products)
        this.renderAll();
    }

    async putToItems(products){
        this.items = await products.map(pro => {
            let item = new DomProduct(pro);

            //give event listener to the buttons
            item.addOrder = async () => { 
                const order = new Order(item.name, item.price, item.id, item.imgUrl);
                await this.finishOrder(order, item);
            };

            return item;   
        });
    }

    //opens the quantity panel when a product clicked
    async finishOrder(order, item){
        return new Promise((resolve) => {
            openPopup(item.imgUrl, item.name, item.price.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' }));
            const quantityCount = document.getElementById("quantityCount")

            document.getElementById("addOrder").onclick = () => {
                order.setQuantity(quantityCount.innerText);
                this.checkIfRepeat(order)
                document.getElementById("totalPrice").innerText = orderList.totalPrice.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });
                closePopup();
                resolve(this);
            }

            document.getElementById("closePopup").onclick = () => {
                closePopup();
                resolve(this);
            }
        })
    }

    checkIfRepeat(order){
        console.log(orderList);
        const existingItem = orderList.products.find(item => item.getName() === order.getName());
        if (existingItem) {
            existingItem.setQuantity(existingItem.getQuantity() + order.getQuantity());
            document.getElementById(`order${existingItem.getName()}`).innerText = existingItem.getQuantity();
            orderList.calculateTotalPrice()
        } else {
            orderList.addOrder(order);
            document.getElementById('checkoutBtn').disabled = false;
            this.orderDetails.display()
        }
    }
}
