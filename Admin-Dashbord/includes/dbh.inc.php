<?php 
    class DatabaseConncetor{
        private $dsn;
        private $dbusername;
        private $dbpassword;

        public function __construct()
        {
            $this->dsn = "mysql:host=localhost;dbname=client_01";
            $this->dbusername = "root";
            $this->dbpassword = "";
        }

        public function start(){
            try{
                $pdo =  new PDO($this->dsn, $this->dbusername, $this->dbpassword);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $pdo;
                
            } catch(PDOexception $e) {
                echo "<script>alert('CONNECTION FAILED: " . $e->getMessage() .  "')</alert>";
            }
        }
    }
    
    
    
    