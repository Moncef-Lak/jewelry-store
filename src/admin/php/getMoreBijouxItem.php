<?php
    include('connect.php');
    if ((is_numeric($_POST['id']) && isset($_POST['id'])) && (is_numeric($_POST['category_id']) && isset($_POST['category_id'])) ) {
        $another_id=999999;
        $category_id=$_POST['category_id'];
        $id=$_POST['id'];
        $sql = 'select *
                from `tbl_bijoux`
                where `category_id` = '.$category_id.'
                and `active` = "Yes" 
                and `id` != '.$id.' 
                order by RAND() limit 1';
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $row = $stmt->fetch();

        if (!empty($row)) {
            $another_id=$row["id"];
        }

        $sql2 = 'select * from `tbl_bijoux`
                where `active` = "Yes" 
                and `id` != '.$id.'
                and `id` != '.$another_id.' 
                order by RAND() limit 4';
        $stmt2 = $db->prepare($sql2);
        $stmt2->execute();
        $row2 = $stmt2->fetchAll();
        
        print_r(json_encode(['sameCategoryProduct'=>$row,'moreItems'=>$row2]));
    }else{
        print_r(json_encode('Error'));
    }
?>


