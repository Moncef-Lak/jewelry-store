<?php 
    // header("Access-Control-Allow-Methods:GET,POST ");
    // header("Access-Control-Allow-Headers:GET,POST:X-Requested-With ");
    include('connect.php');
    
    $postData=file_get_contents("php://input");
    if (isset($postData) && !empty($postData)) {
        $request=json_decode($postData);        
        $type=$request->type;
        if($type==='update-admin'){
            $name=$request->name;
            $userName=$request->username;
            $id=$request->id;
            // lzm ndir hadja bach na3raf ida wsh id numero ou ida kayan maniu wala nn
            $sql="UPDATE `tbl_admin` SET `name` = '$name', `username` = '$userName' WHERE `tbl_admin`.`id` = $id;";
            $stmt=$db->prepare($sql);
            $stmt->execute();
            if ($stmt===true) {
                echo 'ok';
            }
        }
       
    }

    if (isset($_POST["type"])) {
        if ($_POST["type"]==='update-category') {
            $name=$_POST["name"];
            $active=$_POST["active"];       
            $image_before='images/category-image/'.$_POST["image_before"];       
            $id=$_POST["id"];       
            if (isset($_FILES["image"]["name"])) {
                $image_path=$_FILES["image"]["tmp_name"];
                $image_name=$_FILES["image"]["name"];
                @$ext=end(explode('.',$image_name));
                $image_name="Category_".rand(0000,999999).'.'.$ext;
                $image="images/category-image/".$image_name;
                $upload = move_uploaded_file($image_path,$image);
                if ($upload==false) {
                    echo 'faild to upload image';
                }
                else{
                    $sql="UPDATE `tbl_category` SET 
                        `name` = '$name',
                        `active` = '$active',
                        `image_name` = '$image_name'
                        WHERE `tbl_category`.`id` = $id;
                    ";
                    $stmt=$db->prepare($sql);
                    $stmt->execute();
                    if ($stmt==true) {
                        echo 'ok';
                        if (file_exists($image_before)) {
                            $remove=unlink($image_before);
                        }
                    }    
                    if ($stmt==false) {
                        echo 'faild';
                    }


                }
                
            }
            else{
                $image_name=$_POST["image"];
                $sql="UPDATE `tbl_category` SET 
                    `name` = '$name',
                    `active` = '$active',
                    `image_name` = '$image_name'
                    WHERE `tbl_category`.`id` = $id;
                ";
                $stmt=$db->prepare($sql);
                $stmt->execute();
                if ($stmt==true) {
                    echo 'ok';
                }    
                if ($stmt==false) {
                    echo 'faild';
                }

            }

        }
        
        if ($_POST["type"]==='update-picture') {
            $favorit=$_POST["favorit"];
            $active=$_POST["active"];       
            $image_before='images/gallery-image/'.$_POST["image_before"];       
            $id=$_POST["id"];       
            if (isset($_FILES["image"]["name"])) {
                $image_path=$_FILES["image"]["tmp_name"];
                $image_name=$_FILES["image"]["name"];
                @$ext=end(explode('.',$image_name));
                $image_name="Gallery_".rand(0000,999999).'.'.$ext;
                $image="images/gallery-image/".$image_name;
                $upload = move_uploaded_file($image_path,$image);
                if ($upload==false) {
                    echo 'faild to upload image';
                }
                else{
                    $sql="UPDATE `tbl_gallery` SET 
                        `image_name` = '$image_name', 
                        `active` = '$active', 
                        `favorit` = '$favorit' WHERE 
                        `tbl_gallery`.`id` = $id;
                    ";
                    $stmt=$db->prepare($sql);
                    $stmt->execute();
                    if ($stmt==true) {
                        echo 'ok';
                        if (file_exists($image_before)) {
                            $remove=unlink($image_before);
                        }
                    }    
                    if ($stmt==false) {
                        echo 'faild';
                    }


                }
                
            }
            else{
                $image_name=$_POST["image"];
                $sql="UPDATE `tbl_gallery` SET 
                    `image_name` = '$image_name', 
                    `active` = '$active', 
                    `favorit` = '$favorit' WHERE 
                    `tbl_gallery`.`id` = $id;
                ";
                $stmt=$db->prepare($sql);
                $stmt->execute();
                if ($stmt==true) {
                    echo 'ok';
                }    
                if ($stmt==false) {
                    echo 'faild';
                }

            }

        }


        if ($_POST["type"]==='update-bijoux') {
            $name=$_POST["name"];       
            $price=$_POST["price"];       
            $description=$_POST["description"];
            $active=$_POST["active"];      
            $id=$_POST["id"];      
       
            $image_before='images/bijoux-image/'.$_POST["image_before"];       
            $image_before2='images/bijoux-image/'.$_POST["back_image_before"];            


            if (isset($_FILES["image"]["name"]) ){
                $image_path=$_FILES["image"]["tmp_name"];
                $image_name=$_FILES["image"]["name"];
                @$ext=end(explode('.',$image_name));
                $image_name="Bijoux_".rand(0000,999999).'.'.$ext;
                $image="images/bijoux-image/".$image_name;
                $upload = move_uploaded_file($image_path,$image);
                if ($upload==false) {
                    echo 'faild to upload image';
                    $image_name=$_POST["image_before"];
                }
                else{ 
                    if (file_exists($image_before)) {
                        $remove=unlink($image_before);
                    }
                }
            }
            else{
                $image_name=$_POST["image_before"];
            }
           
            if (isset($_FILES["back_image"]["name"])) {
                $image_path2=$_FILES["back_image"]["tmp_name"];
                $image_name2=$_FILES["back_image"]["name"];
                @$ext2=end(explode('.',$image_name2));
                $image_name2="Bijoux_".rand(0000,999999).'.'.$ext2;
                $image2="images/bijoux-image/".$image_name2;
                $upload2 = move_uploaded_file($image_path2,$image2);
                if ($upload2==false) {
                    echo 'faild to upload image';
                    $image_name2=$_POST["back_image_before"];
                }
                else {
                    if (file_exists($image_before2)) {
                        $remove=unlink($image_before2);
                    }
                }
            }    
            else{
                $image_name2=$_POST["back_image_before"];
            }
            
            // echo $name."</br>";
            // echo $price."</br>";
            // echo $description."</br>";
            // echo $active."</br>";
            // echo $image_name."</br>";
            // echo $image_name2."</br>";
                
            $sql="UPDATE `tbl_bijoux` SET 
            `name` = '$name',
            `image_name` = '$image_name', 
            `image_name2` = '$image_name2', 
            `description` = '$description', 
            `active` = '$active', 
            `price` = '$price' 
            WHERE `tbl_bijoux`.`id` = $id;
            ";
            $stmt=$db->prepare($sql);
            $stmt->execute();
            if ($stmt==true) {
                echo 'ok';
            }    
            if ($stmt==false) {
                echo 'faild';
            }
            

        }

    }
