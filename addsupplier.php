<?php
    $conn = new mysqli("localhost", "root", "", "posdb");

    if(mysqli_connect_error()){
        echo mysqli_connect_error();
        exit();
    }
    else{
        $sname = $_POST['sname'];
        $contact = $_POST['contact'];
        $address = $_POST['address'];

        $sql = "INSERT INTO suppliers (sname, contact, address) VALUES('$sname', '$contact', '$address');";
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