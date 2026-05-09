import { getApi } from "../script.js";
import { DomList } from "./DomList.js";
import { DomCategory } from "./DomCategory.js";
import { Products } from "./Products.js";

export class Categories extends DomList {
    constructor(orderList) {
        super("categoryContainer");
        this.orderList = orderList;
        this.categoryTitle = document.getElementById('categoryTitle');
        this.product = new Products();
    }

    async display() {
        let categories = await getApi("categories")
        this.putToItems(categories);
        this.renderAll();
        this.setDefault(this.items[0]['id']);
    }

    putToItems(categories){
        this.items = categories.map(cat => {
            const item = new DomCategory(cat);
            item.displayProduct = () => {
                const currentActive = document.querySelector('.category.active-category');
                if (currentActive) {
                    currentActive.classList.remove('active-category'); 
                }
                this.categoryTitle.innerText = item.name;
                this.product.display(item.id);
                item.element.classList.add('active-category');
            }
            return item;
        });   
    }

    setDefault(defaultId){
        const defaultCategoryBtn = document.getElementById(defaultId);
        console.log(defaultCategoryBtn)
        defaultCategoryBtn.classList.add('active-category');
        this.categoryTitle.innerText = defaultCategoryBtn.innerText;
        this.product.display(defaultCategoryBtn.id)
    }
}
