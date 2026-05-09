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
