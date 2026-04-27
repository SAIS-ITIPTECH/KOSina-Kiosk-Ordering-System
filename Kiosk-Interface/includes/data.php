<?php
        if (isset($_POST)){
                require_once "dbh.inc.php";

                $query = "SELECT * FROM menu_categories ORDER BY display_index ASC";

                $stmt = $pdo->prepare($query);

                $stmt->execute();

                $results =$stmt->fetchAll(PDO::FETCH_ASSOC);

                header('Content-Type: application/json');
                echo json_encode($results);

                $pdo = null;
                $stmt = null;
                die();
        }
?>