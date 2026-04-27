<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KOSina</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <div id="container1">
        <div id="categories"></div>

        <div id="productsContainer">
            <h1 id="categoryTitle"></h1>
            <div id="productList"></div>
        </div>

        <div id="orderDetailsContainer">
            <h1 id="totalPrice">Total Price: 0</h1>
            <button id="viewOrderList">Review Order</button>
            <button id="confirmOrder">Confirm Order</button>
            <button id="resetOrder">Reset Order</button>
        </div>

        <div id="diningMethodContainer" >
            <h1 id="dinignMethodTitle">dining method</h1>
            <button id="dineIn" class="DineButton">Dine In</button>
            <button id="takeOut" class="DineButton">Take Out</button>
        </div>

        <div id="quantityContainer" class="hide" >
            <h1>Quantity</h1>
            <button id="increase">+</button>
            <h1 id="quantity">1</h1>
            <button id="decrease">-</button>
            <button id="confirm">CONFIRM</button>
        </div>

        <div id="orderListContainer1" class="hide">
            <h1>ORDERS:</h1>
            <div id="orderListContainer2"></div>
        </div>

        <div id="paymentMethodContainer" class="hide" >
            <h1 id="paymentMethodTitle">Payment Method</h1>
            <button id="cash" class="paymentMethodButton">Cash</button>
            <button id="cashLess" class="paymentMethodButton">Cash Less</button>
        </div>

        <div id="cashLessOptionsContainer" class="hide" >
            <h1 id="cashLessOptionsTitle">Choose Cashless Payment Method</h1>
            <button id="gCash" class="cashLessButton">GCash</button>
            <button id="payMaya" class="cashLessButton">Paymaya</button>
        </div>
        
    </div>

    <!-- SCRIPTS -->
    <script src="scripts/main.js" type="module"></script>
    <script src="scripts/ui.js" type="module"></script>
    <script src="scripts/api.js" type="module"></script>
    <script src="scripts/dynamicElements.js" type="module"></script>
    <script src="scripts/models.js" type="module"></script>
    <script src="scripts/globals.js" type="module"></script>
</body>
</html>