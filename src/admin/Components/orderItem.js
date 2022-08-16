import React from "react";

const Order = ({date,customer_name,customer_subject,customer_contact,customer_message,customer_email,setIsPageHidden,setState}) => {
    
    return (  
        <div className='order-box' onClick={()=>{setIsPageHidden(false);setState({customer_name,customer_subject,customer_contact,customer_email,customer_message})}}>
            <div className='in-order-box'>
                <h2 className='title'>{customer_name}</h2>
                <h4>Subject: {customer_subject}</h4>
                <h4>Number: {customer_contact}</h4>
            </div>
            <p>{date}</p>
        </div>
    );
}
 
export default Order;