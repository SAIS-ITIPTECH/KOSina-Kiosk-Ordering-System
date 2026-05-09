export class DomList {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.items = [];
    }

    clear() {
        this.container.innerHTML = '';
    }

    display(){
        //IMPLEMENT THIS
    }

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

 