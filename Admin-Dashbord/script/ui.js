class OptionsButton{    
    constructor(className){
        this.buttonList = [];
        this.className = className;
    }

    start(){
        const elements = document.getElementsByClassName(this.className);
        for(let el of elements){
            el.onclick = () => {
                mainPanel.classList.toggle('hide');
                const dashboard = this.chooseOptions(el.value);
                if (dashboard) dashboard.start();
            }
            this.buttonList.push(el);
        }
    }

    chooseOptions(value) {
        const dashboard = dashboardMap[value];
        if (!dashboard) {
            window.alert(`No class for ${value} yet`);
            return null;
        }
        return new dashboard(value);
    }
}

class Dashboard{
    constructor(id){
        this.id = id;
        this.headerId = `${id}Header`;
        this.bodyId = `${id}Body`
    }

    makeTheTableAndButtons(head){
        dashboardContainer.innerHTML = this.makeTableTemplate();
        const table = document.getElementById(`${this.headerId}`)
        table.innerHTML = head
        this.back();
        document.getElementById('add').onclick = () => {
            if (modifyPanel.className == 'hide'){
                let edit = this.chooseOptions(this.id);
                edit.start();
            } 
            modifyPanel.classList.toggle('hide')
        }
    }

    chooseOptions(value) {
        const modifyPanel = modifyPanelMap[value];
        if (!Dashboard) {
            window.alert(`No class for ${value} yet`);
            return null;
        }
        return new modifyPanel("add");
    }

    back(){
        document.getElementById("back").onclick = () => {
            dashboardContainer.classList.toggle('hide');
            dashboardContainer.innerHTML = '';
            modifyPanel.classList.toggle('hide');
            modifyPanel.innerHTML = '';
            mainPanel.classList.toggle('hide');
        }
    }

    makeTableTemplate(){
        return `    
            <div id=${this.id}Dashboard>
                <table >
                    <thead id=${this.headerId}></thead>
                    <tbody id=${this.bodyId}></tbody> 
                </table>
            </div> 
            <div>
                <button id="add">Add New Element</button>
                <button id="back">Back</button>
            </div> 
        `
    }
}

class CategoryDashboard extends Dashboard{
    constructor(id){
        super(id);
        this.categories = new Categories(this.bodyId);

    }

    start(){
        if (dashboardContainer.className == 'hide'){
            this.makeTheTableAndButtons(this.header())
            this.categories.displayAll();
        } 
        dashboardContainer.classList.toggle('hide');
    }

    header(){
        return `
            <th>Index</th> 
            <th>Category Name</th> 
            <th>Category ID</th> 
            <th>Edit</th>
        `;
    }
}

class ProductsDashboard extends Dashboard{
    constructor(id){
        super(id);
        this.categories = new Products(this.bodyId);
    }

    start(){
        if (dashboardContainer.className == 'hide'){
            this.makeTheTableAndButtons(this.header())
            this.categories.displayAll();
        } 
        dashboardContainer.classList.toggle('hide');

    }

    header(){
        return `
            <th>Product ID</th> 
            <th>Product Name</th> 
            <th>Category ID</th> 
            <th>Price</th>
            <th>Available</th>
        `;
    }
}

class HistoryDashboard extends Dashboard{
    constructor(id){
        super(id);
        this.history = new History(this.bodyId);
    }

    start(){
        if (dashboardContainer.className == 'hide'){
            this.makeTheTableAndButtons(this.header())
            this.history.displayAll();
        } 
        dashboardContainer.classList.toggle('hide');
    }

    header(){
        return `
            <th>Order ID</th> 
            <th>Date</th> 
            <th>Total Price</th> 
            <th>Payment Method</th>
            <th>Paid</th>
        `;
    }
}

class DetailsDashboard extends Dashboard{
    constructor(id){
        super(id);
        this.details = new Details(this.bodyId);
    }

    start(){
        if (dashboardContainer.className == 'hide'){
            this.makeTheTableAndButtons(this.header())
            this.details.displayAll();
        } 
        dashboardContainer.classList.toggle('hide');
    }

    header(){
        return `
            <th>Order ID</th> 
            <th>Item ID</th>           
            <th>Product ID</th> 
            <th>Name</th>   
            <th>Quantity</th>
        `;
    }
}

class EarningsDashboard extends Dashboard{
    constructor(id){
        super(id);
        this.categories = new Categories(this.bodyId);
    }

    start(){
        this.makeTheTableAndButtons(this.header())
        this.categories.displayAll();
    }

    header(){
        return `
            <th>Product ID</th> 
            <th>Product Name</th> 
            <th>Category ID</th> 
            <th>Price</th>
            <th>Available</th>
        `;
    }
}

class Categories{
    constructor(container){
        this.container = container;
    }

    async displayAll(){
        const categories = await dbConnector.categoryTable()
        for(let cat of categories){
            const renderer = new RenderCategories(this.container, cat)
            renderer.render();
        }
    }
}

class Products{
    constructor(container){
        this.container = container;
    }

    async displayAll(){
        const products = await dbConnector.productTable()

        for(let pro of products){
            const renderer = new RenderProducts(this.container, pro);
            renderer.render();
        }
    }
}

class History{
    constructor(container){
        this.container = container;
    }

    async displayAll(){
       
        const history = await dbConnector.historyTable()
        for(let his of history){
            const renderer = new RenderHistory(this.container, his)
            renderer.render();
        }
    }
}

class Details{
    constructor(container){
        this.container = container;
    }

    async displayAll(){
       
        const details = await dbConnector.detailsTable()
        for(let det of details){
            const renderer = new RenderDetails(this.container, det)
            renderer.render();
        }
    }
}

class ColumnElements {
    constructor(container, name, id, type) {
        this.type = type;
        this.name = name;
        this.id = id;
        this.container = document.getElementById(container);
        this.deleteButtons = [];
    }

    renderAll(cat) {
        const row = document.createElement('tr');
        row.innerHTML= cat;
        this.container.appendChild(row);
        this.getDeleteButtons();
        this.getEditButtons();
    }

    getDeleteButtons(){
        const elements = document.getElementsByClassName('deleteButton');
        for(let el of elements){
            el.onclick = async () => {
                await del.openPanel(el.value)
            }
            this.deleteButtons.push(el);
        }
    }

    getEditButtons(){
        const elements = document.getElementsByClassName('editButton');
        for(let el of elements){
            el.onclick = async () => {
                if (modifyPanel.className == 'hide'){
                    let edit = this.chooseOptions(this.type);
                    edit.start(el.value);
                } 
                modifyPanel.classList.toggle('hide')
            } 
        }
    }

    chooseOptions(value) {
        const modifyPanel = modifyPanelMap[value];
        console.log(value)
        if (!modifyPanel) {
            window.alert(`No class for ${value} yet`);
            return null;
        }
        return new modifyPanel("edit");
    }
}

class RenderCategories extends ColumnElements{
    constructor(container, cat){
        super(container, cat.name, cat.category_id, 'categories');
        this.index = cat.display_index;
        
    }

    render(){      
        this.renderAll(`<td>${this.index}</td>
                        <td>${this.name}</td>
                        <td>${this.id}</td>
                        <td>
                            <button class="editButton" value="${this.id}">Edit</button>
                            <button class="deleteButton" value="${this.id}">Delete</button>
                        </td>`
        );  
    }
}

class RenderProducts extends ColumnElements{
    constructor(container, pro){
        super(container, pro.name, pro.product_id, 'products');
        this.categoryId = pro.category_id
        this.price = pro.price;
        this.available = Boolean(pro.available);
    }

    render(){
        this.renderAll(`<td>${this.id}</td>
                        <td>${this.name}</td>
                        <td>${this.price}</td>
                        <td>${this.categoryId}</td>
                        <td>${this.available}</td>
                        <td>
                            <button class="editButton" value="${this.id}">Edit</button>
                            <button class="deleteButton" value="${this.id}">Delete</button>
                        </td>`
        );
    }
}

class RenderHistory extends ColumnElements{
    constructor(container, his){
        super(container, null, his.order_id);
        this.date = his.order_date;
        this.totalPrice = his.total_price;
        this.paymentMethod = his.payment_method;
        this.paid = his.paid;
    }

    render(){
        this.renderAll(`
            <td>${this.id}</td>
            <td>${this.date}</td>
            <td>${this.totalPrice}</td>
            <td>${this.paymentMethod}</td>
            <td>${this.paid}</td>
        `);
    }
}

class RenderDetails extends ColumnElements{
    constructor(container, det){
        super(container, null, det.items_id);
        this.orderId = det.order_id;
        this.productId = det.product_id;
        this.quantity = det.quantity;
    }

    render(){
        this.renderAll(`
            <td>${this.orderId}</td>
            <td>${this.id}</td>
            <td>${this.productId}</td>
            <td>${this.name}</td>
            <td>${this.quantity}</td>
            <td>
        `);
    }
}

class DatabaseConncetor {
    async categoryTable() {
        let obj = {
            "tableName": "menu_categories", 
            "sort": "display_index"
        }

        let results = await fetch('/KOSina/Owner_Dashboard/includes/getData.php', {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json; charset=utf-8'
            },
            'body': JSON.stringify(obj)
        });

        return results.json();
    }

    async productTable() {
        let obj = {
            "tableName": "product_list", 
            "sort": "category_id"
        }

        let results = await fetch('/KOSina/Owner_Dashboard/includes/getData.php', {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json; charset=utf-8'
            },
            'body': JSON.stringify(obj)
        });

        return results.json();
    }

    async historyTable () {
        let obj = {
            "tableName": "order_history", 
            "sort": "order_date"
        }

        let results = await fetch('/KOSina/Owner_Dashboard/includes/getData.php', {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json; charset=utf-8'
            },
            'body': JSON.stringify(obj)
        });

        return results.json();
    }

    async detailsTable () {
        let obj = {
            "tableName": "order_details", 
            "sort": "order_id"
        }

        let results = await fetch('/KOSina/Owner_Dashboard/includes/getData.php', {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json; charset=utf-8'
            },
            'body': JSON.stringify(obj)
        });

        return results.json();
    }
}

class DeleteSomething{
    openPanel(id){
        return new Promise((resolve) => {
            deletePanel.classList.toggle('hide');
            no.onclick = () => {
                console.log(`NOT DELETED`)
                deletePanel.classList.toggle('hide');
                return resolve();
            };

            yes.onclick = () => {
                this.delete(id);
                return resolve();
            };
            
        })
    }

    delete(id){
        console.log(`${id} DELETED`)
        deletePanel.classList.toggle('hide');
    }
}

class EditPanel{
    constructor(container, type){
        this.type = type;
        this.container = container;
    }

    create(inputs, title){
        modifyPanel.innerHTML = this.modifyScreenTemplate(title);
        document.getElementById('inputContainers').innerHTML = inputs;
        document.getElementById('confirm').onclick = () =>{
            modifyPanel.classList.toggle('hide')
        }
        document.getElementById('cancel').onclick = () =>{
            modifyPanel.classList.toggle('hide')
        }
    }

    modifyScreenTemplate(title ="ADD SOMETHING"){
        return `    
            <header>${title}</header>
            <section id="inputContainers"></section>
            <section id="confirmButtons">
                <button id="confirm">CONFIRM</button>
                <button id="cancel">CANCEL</button>
            </section>
        `
    }

}

class ModifyCategory extends EditPanel{
    constructor(type){
        super(document.getElementById('inputFields'), type);
    }

    start(target = null){
        switch(this.type){
            case 'add':
                this.create(this.inputFields(), "ADD NEW CATEGORY");
                break;

            case 'edit':
                this.create(this.inputFields(), `EDIT ${target}`);
                break;
                
            default:
                console.log("wtf")
                break;
        }
    }

    inputFields(){
        return `
            <label for="index">Display Index: </label>
            <input type="text" name="index">
            <br>
            <label for="name">Category Name: </label>
            <input type="text" name="name">
            <br>
            <label for="id">Category Id: </label>
            <input type="text" name="id">
        `
    }
}

class ModifyProducts extends EditPanel{
    constructor(type){
        super(document.getElementById('inputFields'), type);
    }

    start(){
        console.log(this.type)
        switch(this.type){
            case 'add':
                this.create(this.inputFields(), "ADD NEW PRODUCT");
                console.log("New Product Added");
                break;

            case 'edit':
                this.create(this.inputFields(), "Modify");

                break;
                
            default:
                console.log("wtf")
                break;
        }
    }

    inputFields(){
        return `
            <label for="name">Product Name: </label>
            <input type="text" name="name">
            <br>
            <label for="price">Price: </label>
            <input type="number" name="price">
            <br>
            <label for="name">Category ID: </label>
            <select name="categoryId">
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
            <br>
            <label for="avail">Available: </label>
            <select name="avail">
                <option value="1">True</option>
                <option value="2">False</option>
            </select>
            
            
            
        `
    }
}

const dbConnector = new DatabaseConncetor();
const buttons = new OptionsButton('optionButtons');
buttons.start();

const dashboardContainer = document.getElementById('dashboardPlaceholder')
const mainPanel = document.getElementById('main');
const deletePanel = document.getElementById("deletePanel");
const yes = document.getElementById('yes');
const no = document.getElementById('no');
const modifyPanel = document.getElementById('modifyPanel');
const del = new DeleteSomething();

const dashboardMap = {
    'categories': CategoryDashboard,
    'products': ProductsDashboard,
    'history': HistoryDashboard,
    'details': DetailsDashboard
};

const modifyPanelMap = {
    'categories': ModifyCategory,
    'products': ModifyProducts
};