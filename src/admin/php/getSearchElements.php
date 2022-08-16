<?php 
    include('connect.php');
    
    $postData=file_get_contents("php://input");
    
    if (isset($postData) && !empty($postData)) {
        $request=json_decode($postData);
        $search=$request->search;

        if ($search==='') {
            print_r(json_encode([]));
        }
        else{
            $sql="SELECT * FROM `tbl_bijoux` WHERE tbl_bijoux.name LIKE '%$search%' ";
            $stmt=$db->prepare($sql);
            $stmt->execute();
            $row2=$stmt->fetchAll();
            if (count($row2)>0) {
                print_r(json_encode($row2));
            }
            else{
                print_r(json_encode([]));
            }
        }
    }

        
    
?>