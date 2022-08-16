import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const SearshForm = ({setSerachHeight,setIsSearch}) => {
  const [search,setSearch]=useState('');
  const [data,setData]=useState([]);
  let searchForm=useRef(null);

  const fetchData=(e)=>{
    const url=process.env.REACT_APP_API_PASSWORD+'getSearchElements.php';
    const myObj={search:e.target.value};
    try {
      axios.post(url,myObj).then(data=>{
          setData(data.data)
      })
    } catch (error) {
      console.log(error);
    }
    setSearch(e.target.value)
  }


  useEffect(()=>{
    const searchinfo=searchForm.getBoundingClientRect();
    setSerachHeight(searchinfo.height);
  },[search,data,setSerachHeight])
  return ( 
    <section ref={e=>searchForm=e}>
      <form onSubmit={e=>e.preventDefault()}>
        <input type='text' value={search} onChange={fetchData} placeholder="Start typing what you're looking for..."/>
      </form>
      {data.length ? <div className='all-data-Search'>
        {data.map((item,index)=>{
          if (item.active==='Yes') {
            return <Link onClick={()=>{setIsSearch(false);setSearch('')}} to={`/detail/${item.id}`} key={index}><h2>{item.name}</h2></Link>
          }
          return null;
        })}
      </div> : null}
    </section>
  );
}
 
export default SearshForm;

