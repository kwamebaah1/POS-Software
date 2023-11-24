<?php
    $conn = new mysqli("localhost", "root", "", "posdb");

    if(mysqli_connect_error()){
        echo mysqli_connect_error();
        exit();
    }
    else{
        $bname = $_POST['bname'];
        $amount = $_POST['amount'];
        $date = $_POST['date'];


        $sql = "INSERT INTO bank (bname, amount, date) VALUES('$bname', '$amount', '$date');";
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