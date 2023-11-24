<?php
    $conn = new mysqli("localhost", "root", "", "posdb");

    if(mysqli_connect_error()){
        echo mysqli_connect_error();
        exit();
    }
    else{
        $pname = $_POST['pname'];
        $costPrice = $_POST['costPrice'];
        $sellingPrice = $_POST['sellingPrice'];
        $quantity = $_POST['quantity'];
        $expiryDate = $_POST['todaysDate'];
        $todaysDate = $_POST['expiryDate'];

        $sql = "INSERT INTO products (pname, cost_price, product_price, product_qty, date_received, date_expired) VALUES('$pname', '$costPrice', '$sellingPrice', '$quantity', '$expiryDate', '$todaysDate');";
        $res = mysqli_query($conn, $sql);

        if($res){
            echo "Success";
        }
        else{
            echo "Error";
        }
        $conn->close();
    }
   
?>