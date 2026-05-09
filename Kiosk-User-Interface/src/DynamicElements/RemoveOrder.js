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
