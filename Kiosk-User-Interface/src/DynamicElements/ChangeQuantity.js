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
