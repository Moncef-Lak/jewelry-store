import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AdminProvider=createContext();

const AdminContext = ({children}) => {

  const [adminItems,setAdminItems]=useState([]);
  const [categoryItems,setCategoryItems]=useState([]);
  const [galleryItems,setGalleryItems]=useState([]);
  const [bijouxItems,setBijouxItems]=useState([]);
  const [orderItems,setOrderItems]=useState([]);
  const [cartItems,setCartItems]=useState(localStorage.getItem('itemsCart') ? JSON.parse(localStorage.getItem('itemsCart')):[]);
  const [total,setTotal]=useState(0);
  const [amount,setAmount]=useState(0);
  const [isAdminItems,setIsAdminItems]=useState(1);
  const [isCategoryItems,setIsCategoryItems]=useState(1);
  const [isGalleryItems,setIsGalleryItems]=useState(1);
  const [isBijouxItems,setIsBijouxItems]=useState(1);
  const [isOrderItems,setIsOrdersItems]=useState(1);

  // Admin --------------------------------------------------------------------------

  const fetchdataAdminElemnts=()=>{
    const url=process.env.REACT_APP_API_PASSWORD+'getAdminElements.php'
    try {
      axios.get(url)
      .then(data=>{
        data.data.length >0 && setAdminItems(data.data)
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  // Category --------------------------------------------------------------------------

  const fetchdataCategoryElemnts=()=>{
    const url=process.env.REACT_APP_API_PASSWORD+'getCategoryElements.php'
    try {
      axios.get(url)
      .then(data=>{
        data.data.length >0 && setCategoryItems(data.data)
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Gallery --------------------------------------------------------------------------
  
  const fetchdataGalleryElemnts=()=>{
    const url=process.env.REACT_APP_API_PASSWORD+'getGalleryElements.php'
    try {
      axios.get(url)
      .then(data=>{
        data.data.length >0 && setGalleryItems(data.data)
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Bijoux --------------------------------------------------------------------------
  
  const fetchdataBijouxElemnts=()=>{
    const url=process.env.REACT_APP_API_PASSWORD+'getBijouxElements.php'
    try {
      axios.get(url)
      .then(data=>{
        data.data.length >0 && setBijouxItems(data.data)
      });
    } catch (error) {
      console.log(error);
    }
  }
  // Bijoux --------------------------------------------------------------------------
  
  const fetchdataOrderElemnts=()=>{
    const url=process.env.REACT_APP_API_PASSWORD+'getOrderElements.php'
    try {
      axios.get(url)
      .then(data=>{
        data.data.length >0 && setOrderItems(data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  // Get All Data--------------------------------------------------------------------------

  useEffect(()=>{
    fetchdataAdminElemnts();
  },[isAdminItems])

  useEffect(()=>{
    fetchdataCategoryElemnts();
  },[isCategoryItems])
  
  useEffect(()=>{
    fetchdataGalleryElemnts();
  },[isGalleryItems])
  
  useEffect(()=>{
    fetchdataBijouxElemnts();
  },[isBijouxItems])

  useEffect(()=>{
    fetchdataOrderElemnts();
  },[isOrderItems])
  
  useEffect(()=>{
    localStorage.setItem('itemsCart',JSON.stringify(cartItems))
    let total=0;
    let amount=0;
    if (cartItems.length>0) {
      cartItems.map(item=>{
        return total+=item.price*item.current;
      })
      cartItems.map(item=>{
        return amount+=item.current;
      })
      
    }
    setTotal(total);
    setAmount(amount)

  },[cartItems])

  
  return (
    <AdminProvider.Provider value={{
      adminItems,categoryItems,galleryItems,bijouxItems,orderItems,cartItems,total,amount,
      setIsAdminItems,setIsCategoryItems,setIsGalleryItems,setIsBijouxItems,setIsOrdersItems,setCartItems}}  >
      {children}
    </AdminProvider.Provider>
    )
}

export const useGlobalContext=()=>{
  return useContext(AdminProvider);  
}

export default AdminContext;

