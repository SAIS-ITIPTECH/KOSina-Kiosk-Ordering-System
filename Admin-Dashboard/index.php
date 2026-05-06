<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KOSina Dashboard</title>
    <link rel="stylesheet" href="index.css">
    <style>
        .productImg{
            width: 50px;
            height: 50px;
            object-fit: fill;
        }
    </style>
</head>
<body>
    <div id="container1"> 
        <div id="loginPanel">
                <h1>LOGIN</h1>
                <label for="email">USERNAME: </label>
                <input type="text" id="username" >
                <br>
                <label for="pass">PASSWORD: </label>
                <input type="text" id="password">
                <br>
                <button value="nigga" id="loginButton">LOGIN</buton>
        </div>

        <div id="main" class="hide">
            <h1 id="title">Dashboard</h1>

            <button class="optionButtons" value="categories">Menu Categories</button>
            <button class="optionButtons" value="products">Product List</button>
            <button class="optionButtons" value="history">Order History</button>
            <button class="optionButtons" value="details">Order Details</button>
            <button class="optionButtons" value="dailySales">Daily Sales</button>
            <button class="optionButtons" value="logout">LOGOUT</button>
        </div>

        <div id="dashboardPlaceholder" class="hide"></div>

        
        <div id="deletePanel" class="hide">
            <h1>ARE YOU SURE?</h1>
            <button id="yes">YES</button>
            <button id="no">NO</button>
        </div>

        <div id="modifyPanel" class ="hide">
              
        </div>

        <div id="UploadPanel" class="hide">
            <input type="file" id="image">
            <button id="addImage">ADD</button>
            <button id="replaceImage">REPLACE</button>
            <button id="removeImage">REMOVE</button>
            <button id="closeUpload">BACK</button>
        </div>
        
    </div>

    <script src="script/ui.js"></script>
</body>
</html>
