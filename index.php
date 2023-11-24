<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM products";
        $path = explode('/products', $_SERVER['REQUEST_URL']);
        if (isset($path[3]) && is_numeric($path[3])){
            $sql = "WHERE product_id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $products = $stmt->fetch(POO::FETCH_ASSOC);
        } else{
            $stmt= $conn->prepare($sql);
            $stmt->execute();
            $products = $stmt->fetchAll(POO::FETCH_ASSOC);
        }
    case "PUT":
        $product = json_decode( file_get_contents('php://input') );
        $sql = "UPDATE products SET pname= :pname, product_price= :sellingPrice, cost_price= :costPrice, product_qty= :quantity, date_received= :todaysDate, date_expired= :expiryDate,  updated_at =:updated_at WHERE product_id =:id"
        $stmt = $conn->prepare($sql);
        $updated_at = date('Y-m-d');
        $stmt->bindParam(':id', $product->product_id);
        $stmt->bindParam(':pname', $product->pname);
        $stmt->bindParam(':sellingPrice', $product->product_price);
        $stmt->bindParam(':costPrice', $product->cost_price);
        $stmt->bindParam(':quantity', $product->product_qty);
        $stmt->bindParam(':todaysDate', $product->date_received);
        $stmt->bindParam(':expiryDate', $product->date_expired);
        $stmt->bindParam(':updated_at', $product->updated_at);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message'=> 'Record Updated'];
        }else{
            $response = ['status' => 0, 'message' => 'Failed to Update']
        }
        echo json_encode($response);
        break;
}
