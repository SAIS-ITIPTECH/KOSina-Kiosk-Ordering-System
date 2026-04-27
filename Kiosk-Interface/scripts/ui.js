// Responsible for creating and rendering DOM elements only
class DomContainer {
    constructor(name, id, value) {
        this.name = name;
        this.id = id;
    }

    render() {}
}

class DomCategory extends DomContainer {
    constructor(object) {
        super(object['name'], object['category_id']);
        this.index = object['display_index'];
        this.value = object.category_id
    }

    render(parent) {
        let categoryName = document.createElement('button');
        categoryName.innerHTML = this.name;
        categoryName.id = this.index;
        categoryName.className = "categoryButtons";
        categoryName.value = this.value
        categoryName.onclick = () => this.onClick();

        parent.appendChild(categoryName);
    }
}

class DomProduct extends DomContainer {
    constructor(product) {
        super(product['name'], product['product_id']);
        this.price = product['price'];
    }

    render(parent) {
        let productCard = document.createElement('button');
        productCard.innerHTML = `<h1> ${this.name} </h1>
                             <br>
                             <p> Price: ${this.price} </p>`;
                             
        productCard.onclick = () => this.onclick();
        productCard.className = 'productClass';
        parent.appendChild(productCard);
    }
}

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
export { DomCategory, DomProduct, DomOrderDetail };
