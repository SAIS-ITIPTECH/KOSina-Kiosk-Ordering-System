<?php 
    if (isset($_POST)){
        $data = file_get_contents("php://input");
        $categoryId = json_decode($data);

        require_once "dbh.inc.php";

        $query = "SELECT * FROM product_list WHERE category_id = :categoryid";

        $stmt = $pdo->prepare($query);

        $stmt->bindParam(":categoryid", $categoryId);

        $stmt->execute();

        $results =$stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($results);

        $pdo = null;
        $stmt = null;
        die();
    }
