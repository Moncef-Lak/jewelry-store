import React, { useEffect, useState} from "react";
import AdminNavbar from "./Components/navbar";
import './style.css';
import { useGlobalContext } from "../contexts/adminContext";
import { MdPermContactCalendar } from "react-icons/md";
import Order from "./Components/orderItem";

const ManagOrder = () => {
  const {orderItems,setIsOrdersItems}= useGlobalContext();
  const [isPageHidden,setIsPageHidden]=useState(true);
  const [state,setState]=useState({
    customer_name:'',
    customer_subject:'',
    customer_contact:'',
    customer_email:'',
    customer_message:'',
  });

  useEffect(()=>{
    setIsOrdersItems(Math.random()*100)
  },[setIsOrdersItems])


  return(
    <>
      <AdminNavbar/>
      <section className='admin-panel' >
        
        <section className={`page-order ${isPageHidden && 'page-order-hidden'}`} onClick={()=>setIsPageHidden(true)}>
          <div className='confirm-box'>
            <h3>{state.customer_name}</h3>
            <div className='h4'><h4>Subject:</h4> {state.customer_subject}</div>
            <div className='h4'><h4>Number:</h4> {state.customer_contact}</div>
            <div className='h4'><h4>Email:</h4> {state.customer_email}</div>
            <div className='h4'><h4>Message:</h4> {state.customer_message}</div>
          </div>  
        </section>
        
        <div className='header-admin-panel'>
          <div className='left-side contact'>
            <h1>Contact</h1>
          </div>
          <div className='right-side'>
            <h1><MdPermContactCalendar/></h1>
            <h2>{orderItems.length} Contact</h2>
          </div>
        </div>
        <section className='All-Orders'>
          {orderItems.map((item,index)=>{
            return <Order {...item} index={index} setIsPageHidden={setIsPageHidden} setState={setState} key={item.id}/>
          })}
        </section>
      </section>
    </>
  )
}
 
export default ManagOrder;

