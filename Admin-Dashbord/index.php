<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KOSina Dashboard</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <div id="container1">
        <div id="main">
            <h1 id="title">Dashboard</h1>

            <button class="optionButtons" value="categories">Menu Categories</button>
            <button class="optionButtons" value="products">Product List</button>
            <button class="optionButtons" value="history">Order History</button>
            <button class="optionButtons" value="details">Order Details</button>
            <button class="optionButtons" value="sales">Daily Sales</button>
        </div>

        <div id="dashboardPlaceholder" class="hide"></div>

        
        <div id="deletePanel" class="hide">
            <h1>ARE YOU SURE?</h1>
            <button id="yes">YES</button>
            <button id="no">NO</button>
        </div>

        <div id="modifyPanel" class ="hide">
              
        </div>
        
    </div>

    <script src="script/ui.js"></script>
</body>
</html>
