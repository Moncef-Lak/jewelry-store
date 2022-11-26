<?php 
    include('connect.php');
        $sql="SELECT * FROM `tbl_order`order by date desc LIMIT 15 ";
        $stmt=$db->prepare($sql);
        $stmt->execute();
        $row2=$stmt->fetchAll();
        if (count($row2)>0) {
            print_r(json_encode($row2));
        }
        else{
            print_r(json_encode([]));
        }
