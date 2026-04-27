<?php 

    $dsn = "mysql:host=localhost;dbname=client_01";
    $dbusername = "root";
    $dbpassword = "";
    
    try{
        $pdo =  new PDO($dsn, $dbusername, $dbpassword);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOexception $e) {
        echo "<script>alert('CONNECTION FAILED: " . $e->getMessage() .  "')</alert>";
    }