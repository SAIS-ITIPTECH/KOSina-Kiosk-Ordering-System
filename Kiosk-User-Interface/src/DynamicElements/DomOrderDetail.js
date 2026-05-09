class DomOrderDetail extends DomContainer {
    constructor(order) {
        super(order.getName(), order.getId());
        this.price = order.getPrice();
        this.quantity = order.getQuantity();
    }

    render(parent) {
        let orderDetail = document.createElement('div');
        orderDetail.innerHTML = `<h1> ${this.name} </h1>
                             <br>
                             <p> Price: ${this.price} </p>
                             <br>
                             <p> Quantity: ${this.quantity} </p>
                             <br>
                             <button class="changeQuantity">Change Quantity</button>
                             <br>
                             <button class="removeOrder">Delete Order</button>`;
                             
        orderDetail.className = 'orderDetailClass';
        orderDetail.id = this.id;
        parent.appendChild(orderDetail);
    }
}