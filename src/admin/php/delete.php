<?php 
    // header("Access-Control-Allow-Methods:GET,POST ");
    // header("Access-Control-Allow-Headers:GET,POST:X-Requested-With ");
    include('connect.php');
    
    $postData=file_get_contents("php://input");
    if (isset($postData) && !empty($postData)) {
        $request=json_decode($postData);
        $type=$request->type;
        // lzm ndir hadja bach na3raf ida wsh id numero ou ida kayan maniu wala nn
        if ($type==='delete-admin') {
            $id=$request->id;
            $sql="DELETE FROM `tbl_admin` WHERE `tbl_admin`.`id` = $id";
            $stmt=$db->prepare($sql);
            $stmt->execute();
            if ($stmt==true) {
                echo 'ok';
            }
            else{
                echo 'faild';
            }
            
        }
        if ($type==='delete-category') {
            $id=$request->id;
            $image_name=$request->image_name;
            $image='../../images/category-image/'.$image_name;
            if (file_exists($image)) {
                $remove=unlink($image);
            }
            $sql="DELETE FROM `tbl_category` WHERE `tbl_category`.`id` = $id";
            $stmt=$db->prepare($sql);
            $stmt->execute();
            if ($stmt==true) {
                echo 'ok';
                if (file_exists($image)) {
                    $remove=unlink($image);
                }
            }
            else{
                echo 'faild';
            }
            
        }
        
        if ($type==='delete-picture') {
            $id=$request->id;
            $image_name=$request->image_name;
            $image='../../images/gallery-image/'.$image_name;

            $sql="DELETE FROM `tbl_gallery` WHERE `tbl_gallery`.`id` = $id";
            $stmt=$db->prepare($sql);
            $stmt->execute();
            if ($stmt==true) {
                echo 'ok';
                if (file_exists($image)) {
                    $remove=unlink($image);
                }
            }
            else{
                echo 'faild';
            }
            
        }

        if ($type==='delete-bijoux') {
            $id=$request->id;
            $image_name=$request->image_name;
            $image_name2=$request->image_name2;
            $image='../../images/bijoux-image/'.$image_name;
            $image2='../../images/bijoux-image/'.$image_name2;

            $sql="DELETE FROM `tbl_bijoux` WHERE `tbl_bijoux`.`id` = $id";
            $stmt=$db->prepare($sql);
            $stmt->execute();
            if ($stmt==true) {
                echo 'ok';
                if (file_exists($image)) {
                    $remove=unlink($image);
                }
                if (file_exists($image2)) {
                    $remove2=unlink($image2);
                }
            }
            else{
                echo 'faild';
            }
            
        }
       
    }
?>