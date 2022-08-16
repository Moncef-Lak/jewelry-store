import React, { useEffect, useState } from "react";
import { TiDocumentDelete } from "react-icons/ti";
import { MdDoNotDisturbAlt} from "react-icons/md";
import { SiOrigin } from "react-icons/si";
import { MdUpdate } from "react-icons/md";
import { Link } from "react-router-dom";
import errorImage from './../../images/not-found-image.jpg'
import { FaHeart, FaHeartBroken } from "react-icons/fa";

const GalleyElem = ({id,favorit,image_name,active,index,setItemID,setIsPageHidden,setItemImg}) => {
    
    const [imgUrl,setImgUrl]=useState(null);

   
    // chek file exists
    useEffect(()=>{
        try {
            if (require('../../images/gallery-image/'+image_name)) {
                setImgUrl(require('../../images/gallery-image/'+image_name).default)
            } 
        } catch (error) {
            setImgUrl(errorImage)
        }
    },[image_name,setImgUrl])
    
    return (  
        <tr className={`${index%2>0 && 'cd'}`}>
            <td>{index+1}</td>
            <td className='img' ><img onClick={e=>e.target.classList.toggle('zoomImg')} src={imgUrl} alt='img'/></td>
            <td>{active==='Yes' ?<SiOrigin className='active-yes'/>: <MdDoNotDisturbAlt className='active-no'/>}</td>
            <td>{favorit==='Yes' ?<FaHeart className='active-yes love-logo'/>: <FaHeartBroken className='active-no love-logo'/>}</td>
            <td>
                <Link to='/gallery' className='delete' onClick={()=>{setItemID(id);setIsPageHidden(false);setItemImg(image_name)}}><TiDocumentDelete className='delete-in'/></Link> 
                <Link to={`/update-picture/${id}`} className='update'><MdUpdate className='update-in'/></Link>
            </td>
        </tr>
    );
}
 
export default GalleyElem;