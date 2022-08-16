import React from "react";
import AdminNavbar from "./Components/navbar";
import { Link, NavLink } from "react-router-dom";
import { useGlobalContext } from "../contexts/adminContext";
import { HiOutlineDuplicate, HiOutlinePlusCircle } from "react-icons/hi";
import { RiAdminFill } from "react-icons/ri";
import { BiLayerPlus, BiPhotoAlbum } from "react-icons/bi";
import { IoDuplicate, IoPersonAddSharp } from "react-icons/io5";
import { GiNecklaceDisplay } from "react-icons/gi";
import { MdPermContactCalendar } from "react-icons/md";

const HomeAdmin = () => {
    const {adminItems,categoryItems,galleryItems,bijouxItems,orderItems}=useGlobalContext()
  return(
    <>
      <AdminNavbar/>
      <section className='home-page' >
        <div className='mini-title'>Dashboard (Home)</div>
        <div className='in-home-page'>
            <div className='left-fitt'>
                <div className='left-fitt-box-order'>
                    <h2><MdPermContactCalendar/></h2>
                    <h3>{orderItems.length >0 ? orderItems.length :'0'} Orders</h3>
                </div>
                <div className='left-fitt-box'>
                    <h2><RiAdminFill/></h2>
                    <h3>{adminItems.length>0 ? adminItems.length:'0'} Admin</h3>
                </div>
                <div className='left-fitt-box'>
                    <h2><GiNecklaceDisplay/></h2>
                    <h3>{bijouxItems.length>0?bijouxItems.length:'0'} Bijoux</h3>
                </div>
                <div className='left-fitt-box'>
                    <h2><HiOutlineDuplicate/></h2>
                    <h3>{categoryItems.length>0?categoryItems.length:'0'} Category</h3>
                </div>
                <div className='left-fitt-box'>
                    <h2><BiPhotoAlbum/></h2>
                    <h3>{galleryItems.length >0? galleryItems.length:'0'} Picture</h3>
                </div>
                <div className="left-fitt-big-box">
                    <Link to='/AddAdmin' className='add-box'>
                        <h2><HiOutlinePlusCircle/></h2>
                        <h3><IoPersonAddSharp className='logo'/> Add Admin</h3>
                    </Link>
                    <Link to='/AddBijoux' className='add-box'>
                        <h2><HiOutlinePlusCircle/></h2>
                        <h3><BiLayerPlus className='logo'/> Add Bijoux</h3>
                    </Link>
                    <Link to='/AddCategory' className='add-box'>
                        <h2><HiOutlinePlusCircle/></h2>
                        <h3><IoDuplicate className='logo'/> Add Category</h3>
                    </Link>
                    <Link to='/AddPicture' className='add-box'>
                        <h2><HiOutlinePlusCircle/></h2>
                        <h3><IoDuplicate className='logo'/> Add Picture</h3>
                    </Link>
                </div>
            </div>
            <div className='right-fitt'>
                <div className='intro-box'>
                    <div className='in-intro-box'>
                        <h2>We are making the World easy for you Be happy</h2>
                        <NavLink to='/'><button>Home</button></NavLink>
                    </div>
                </div>
                <div className='all-manage-box'>
                    <Link to='/admin' className='manage-box admin'>
                        <h2>Manage Admin</h2>
                        <h3>You Have The Controll</h3>
                    </Link>
                    <Link to='/categories' className='manage-box category'>
                        <h2>Manage Categories</h2>
                        <h3>You Have The Controll</h3>
                    </Link>
                    <Link to='/bijoux' className='manage-box bijoux'>
                        <h2>Manage Bijoux</h2>
                        <h3>You Have The Controll</h3>
                    </Link>
                    <Link to='/gallery' className='manage-box gallery'>
                        <h2>Manage Gallery</h2>
                        <h3>You Have The Controll</h3>
                    </Link>
                </div>
                <div className='end-box'>
                    <div className='in-intro-box'>
                        <h2>You {orderItems.length>0 ? 'Have Meny':"Don't Have Eny" } Orders Here Check Out</h2>
                        <NavLink to='/orders'><button>Check</button></NavLink>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </>
  )
}
 
export default HomeAdmin;

