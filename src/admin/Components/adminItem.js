import React from "react";
import { FaUserAltSlash } from "react-icons/fa";
import { MdUpdate } from "react-icons/md";
import { Link } from "react-router-dom";

const Person = ({id,name,username,setIsPageHidden,setItemID,index}) => {
    return (  
        <tr className={`${index%2>0 && 'cd'}`}>
            <td>{index+1}</td>
            <td>{name}</td>
            <td>{username}</td>
            <td>
                <Link to='/admin' className='delete' onClick={()=>{setIsPageHidden(false);setItemID(id)}}><FaUserAltSlash className='delete-in'/></Link> 
                <Link to={`/update-Admin/${id}`} className='update'><MdUpdate className='update-in'/></Link>
            </td>
        </tr>
    );
}
 
export default Person;