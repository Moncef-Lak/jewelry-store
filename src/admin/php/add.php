<?php 
    // header("Access-Control-Allow-Methods:GET,POST ");
    // header("Access-Control-Allow-Headers:GET,POST:X-Requested-With ");
    include('connect.php');
    
    $postData=file_get_contents("php://input");
    if (isset($postData) && !empty($postData)) {

        $request=json_decode($postData);
        $type=$request->type;
        if ($type==="add-admin") {
            $name=$request->name;
            $userName=$request->username;
            $password0=$request->password;
            $password=sha1($password0);
            
            $sql="INSERT INTO `tbl_admin` 
            (`id`, `name`, `username`, `password`)
             VALUES (NULL, '$name', '$userName', '$password');";
            $stmt=$db->prepare($sql);
            $stmt->execute();
            if ($stmt===true) {
                echo 'ok';
            }    
        }
        
        if ($type==="add-contact") {
            $name0=$request->name;
            $subject0=$request->subject;
            $email0=$request->email;
            $message0=$request->message;
            $number0=$request->number;
            
            $subject = filter_var($subject0,FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
            $name = filter_var($name0,  FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
            $message = filter_var($message0,FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
            $email = filter_var($email0,  FILTER_SANITIZE_EMAIL, FILTER_FLAG_STRIP_HIGH);
            $number = filter_var($number0,  FILTER_SANITIZE_NUMBER_INT, FILTER_FLAG_STRIP_HIGH);
            $date=date("Y-m-d H:i:s");

            $sql="INSERT INTO `tbl_order` 
            (`id`, `date`, `customer_name`, `customer_email`, `customer_message`, `customer_subject`, `customer_contact`) 
            VALUES (NULL, '$date', '$name', '$email', '$message', '$subject', '$number');";
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
    
    if (isset($_POST["type"])) {
        if ($_POST["type"]==='add-category') {
            $name=$_POST["name"];
            $active=$_POST["active"];       

            $image_path=$_FILES["image"]["tmp_name"];
            $image_name=$_FILES["image"]["name"];
            
            
            @$ext=end(explode('.',$image_name));
            $image_name="Category_".rand(0000,999999).'.'.$ext;
            $image=$image_file_path.$image_name;
            $upload = move_uploaded_file($image_path,$image);
            if ($upload==false) {
                echo 'faild to upload image';
            }
            else{
                $sql="INSERT INTO `tbl_category` 
                (`id`, `name`, `active`, `image_name`) 
                VALUES (NULL, '$name', '$active', '$image_name')";
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

        if ($_POST["type"]==='add-picture') {
            $active=$_POST["active"];       
            $favorit=$_POST["favorit"];       

            $image_path=$_FILES["image"]["tmp_name"];
            $image_name=$_FILES["image"]["name"];
            
            @$ext=end(explode('.',$image_name));
            $image_name="Gallery_".rand(0000,999999).'.'.$ext;
            $image=$image_file_path.$image_name;
            $upload = move_uploaded_file($image_path,$image);
            if ($upload==false) {
                echo 'faild to upload image';
            }
            else{
                $sql="INSERT INTO `tbl_gallery` 
                (`id`, `image_name`, `active`, `favorit`)
                VALUES (NULL, '$image_name', '$active', '$favorit');";
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

        if ($_POST["type"]==='add-bijoux') {
           
            $name=$_POST["name"];       
            $category_id=$_POST["category_id"];       
            $price=$_POST["price"];       
            $description=$_POST["description"];
            $active=$_POST["active"];       

            $image_path=$_FILES["image"]["tmp_name"];
            $image_name=$_FILES["image"]["name"];
            @$ext=end(explode('.',$image_name));
            $image_name="Bijoux_Image_".rand(0000,999999).'.'.$ext;
            $image=$image_file_path.$image_name;
            $upload = move_uploaded_file($image_path,$image);
            
            $image_path2=$_FILES["back-image"]["tmp_name"];
            $image_name2=$_FILES["back-image"]["name"];
            @$ext2=end(explode('.',$image_name2));
            $image_name2="Bijoux_Back_Image_".rand(0000,999999).'.'.$ext2;
            $image2=$image_file_path.$image_name2;
            $upload2 = move_uploaded_file($image_path2,$image2);

            if ($upload==false || $upload2==false) {
                echo 'faild to upload image';
            }
            else{
                $sql="INSERT INTO `tbl_bijoux` 
                (`id`, `name`, `image_name`, `image_name2`, `description`, `active`, `price`, `category_id`) 
                VALUES (NULL, '$name', '$image_name', '$image_name2', '$description', '$active', '$price', '$category_id');";
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
    }
