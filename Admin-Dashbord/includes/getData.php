<?php
    if (isset($_POST)){
        class GetItems{
            private $table;
            private $sort;

            public function __construct($tableName, $sort)
            {
                $this->table = $tableName;
                $this->sort = $sort;
            }

            public function start(){
                $query = "SELECT * FROM $this->table ORDER BY $this->sort ASC";
                // select order_details.*, product_list.name from order_details inner join product_list on order_details.product_id = product_list.product_id

                include_once "dbh.inc.php";
                $dbh = new DatabaseConncetor();
                $pdo = $dbh->start();

                $stmt = $pdo->prepare($query);

                $stmt->execute();

                $results =$stmt->fetchAll(PDO::FETCH_ASSOC);

                header('Content-Type: application/json');
                echo json_encode($results);

                $pdo = null;
                $stmt = null;
            }
        }

        header('Content-Type: application/json');
        $data = file_get_contents("php://input");
        $dbInfo = json_decode($data,true);
        $getItems = new GetItems($dbInfo["tableName"], $dbInfo["sort"]);
        $getItems->start();
    }