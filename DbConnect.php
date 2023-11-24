<?php 
    class DbConnect {
        private $server = 'localhost';
        private $dbname = 'posdb';
        private $user = 'root';
        private $pass = '';
    

    public function connect() {
        try{
            $conn = new POO('mysql:host=' .$this->server ,';dbname=' , $this->dbname, $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch(\Exception $e){
            echo "Database Error: " . $e->getMessage();
        }
    }
}
?>