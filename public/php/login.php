<?php
    include('connect.php');
    $postData=file_get_contents("php://input");
    if (isset($postData) && !empty($postData)) {
        $request=json_decode($postData);
        $userName0=$request->username;
        $password0=$request->password;
        
        $username = filter_var($userName0,  FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
        $password02 = filter_var($password0,  FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);        
        $password=sha1($password02);

        $sql="SELECT * FROM `tbl_admin` WHERE
            `tbl_admin`.`username` = '$username' && 
            `tbl_admin`.`password` = '$password'";
        $stmt=$db->prepare($sql);
        $stmt->execute();
        $row=$stmt->fetchAll();
        if (count($row)===1) {
            foreach ($row as $row2) {
                $name=$row2["name"];
            }
            echo $name;
            
        }
        else{
            echo 'faild';
        }
    }
    

?>