//This file is for the stuff that always change

import { CategoryDatabase, ProductsDatabase } from "./api.js";
import { DomCategory, DomProduct, DomOrderDetail } from "./ui.js";
import { Order, OrderList } from "./models.js";
import { quantityPanel, orderList } from './main.js';

//Creates a object containing the data of stuff that need to be displayed and display them later on
class DomList {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.items = [];
    }

    clear() {
        this.container.innerHTML = '';
    }

    display(){}

    changeTitle(title){
        document.getElementById('categoryTitle').innerHTML = title
    }

    getFirstCategory(){
        return document.getElementsByClassName('categoryButtons')[0]
    }

    //render DOM containing the data of category\products\orderList
    renderAll() {
        this.clear();
        this.items.forEach(item => item.render(this.container));
    }
}

//create a list of categories objects based on their info from db
class Categories extends DomList {
    constructor(orderList) {
        super("categories");
        this.fetcher = new CategoryDatabase();
        this.productDisplay = new Products();
        this.title = document.getElementById("categoryTitle");
        this.orderList = orderList;
    }

    async display() {
        let categories = await this.fetcher.getCategories();
        this.putToItems(categories);
        this.renderAll();
    }

    putToItems(categories){
        this.items = categories.map(cat => {
            const item = new DomCategory(cat);
            item.onClick = () => {
                this.changeTitle(cat.name)
                this.productDisplay.display(cat.category_id);
            }
            return item;
        });   
    }
}

//create a list of products objects of the selected category based on their info from db
class Products extends DomList {
    constructor() {
        super("productList");
        this.fetcher = new ProductsDatabase();
        this.orderDetails = new OrderDetails();
    }
    
    async display(categoryId) {
        let products = await this.fetcher.getProducts(categoryId);
        await this.putToItems(products)
        this.renderAll();

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

///create a list of the selectedProducts based on the orderList global object
class OrderDetails extends DomList {
    constructor(){
        super("orderListContainer2");
        this.totalPriceScreen = document.getElementById('totalPrice');
    }
    
    display() {
        this.items = orderList.products.map(ol => new DomOrderDetail(ol));
        this.renderAll(); // just re-render, no new listeners
        this.prepareButtons();
        this.displayTotalPrice();
    }

    displayTotalPrice(){
        this.totalPriceScreen.innerHTML = `Total Price: ${orderList.totalPrice}`;
    }

    //prepare all buttons in orderDetails ie. Edit Quantity & Remove Order
    prepareButtons(){
        Array.from(document.getElementsByClassName('changeQuantity')).forEach(but => {
            let change = new ChangeQuantity(but)
            change.create()
        })

        Array.from(document.getElementsByClassName('removeOrder')).forEach(but => {
            let remove = new RemoveOrder(but)
            remove.create()
        })
    }
}

//Parent class for the order detail buttons
class OrderDetailButtons{
    constructor(button){
        this.element = button;
        this.container;
        this.orderDetails = new OrderDetails
    }

    setContainer(){
        this.container = this.element.parentElement
        console.log('worked')
    }

    giveListenerOrder(method){
        this.element.onclick = method;
    }
}

//give eventlisnter and functioon for the change quantity
class ChangeQuantity extends OrderDetailButtons{
    constructor(button) {
        super(button);
    }

    //call the oupdateQuantity method from orderDetails object/class
    async changeQuantity(){
        //has await so the program would pause until the user is finished chainging the order
        await orderList.updateQuantity(this.element.parentElement.id);
        this.orderDetails.display();
    }
    
    create(){
        this.giveListenerOrder(() => this.changeQuantity());
    }
}

//remove the selected order
class RemoveOrder extends OrderDetailButtons{
    constructor(button) {
        super(button);
    }

    //remove the selected order
    selectOrder(){
        orderList.removeOrder(this.element.parentElement.id);
        this.orderDetails.display();
    }
    
    create(){
        this.giveListenerOrder(() => this.selectOrder());
    }
}

export { Categories, Products, OrderDetails };
