<?php
    $conn = new mysqli("localhost", "root", "", "posdb");

    if(mysqli_connect_error()){
        echo mysqli_connect_error();
        exit();
    }
    else{
        $ename = $_POST['ename'];
        $cost = $_POST['cost'];
        $reason = $_POST['reason'];
        $date = $_POST['date'];


        $sql = "INSERT INTO expenses (ename, cost, reason, date) VALUES('$ename', '$cost', '$reason', '$date');";
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