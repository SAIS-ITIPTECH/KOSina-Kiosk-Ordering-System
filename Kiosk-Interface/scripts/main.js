//starting point of the program

import { AllButtons, QuantityPanel } from "./globals.js";
import { OrderList } from "./models.js"
import { Categories, Products } from "./dynamicElements.js";

const orderList = new OrderList();
const quantityPanel = new QuantityPanel('increase', 'decrease', 'confirm', 'quantity', 'quantityContainer');
quantityPanel.bind();

class Main{
    async main(){
        const allButtons = new AllButtons();
        allButtons.createAllButton();

        const categoryList = new Categories();
        await categoryList.display();

        const productList = new Products();
        productList.default();

    }
}

const main = new Main();
main.main();

export {orderList, quantityPanel}
