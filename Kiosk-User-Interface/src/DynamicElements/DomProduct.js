import { DomContainer } from "./DomContainer.js";


export class DomProduct extends DomContainer {
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