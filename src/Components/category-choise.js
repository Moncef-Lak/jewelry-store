import React from "react";

const SelectCategory = ({categoryItems,setItems,bijouxItems}) => {
    // const categoryName=["all","Bracelets"];
    // for (let i = 0; i < categoryItems.length; i++) {
    //     if(categoryItems[i].active==='Yes'){
    //         categoryName.push(categoryItems[i].name)
    //     } 
    // }
    const allCategories=['All',...new Set(categoryItems.map(category=>{
        if (category.active==='Yes') {
            return category.name; 
        }
        return null;
    }))];
    
    const onChange=(e)=>{
        const categoryNumber=categoryItems.find(item=>item.name===e.target.value);
        // const categoryNumber=categoryNumber.id;
        if(e.target.value==='All'){
            setItems(bijouxItems)
        }
        else{
            setItems(bijouxItems.filter(items=>items.category_id===categoryNumber.id))
        }
    }

    return (  
        <div className='category-fill'>
            <select onChange={onChange}>
                <option disabled hidden>Select Category</option>
                {allCategories.map((category,index)=>{
                    if (category!==null && category!==undefined ) {
                        return <option key={index}>{category}</option>
                    }
                    return null
                })}
            </select>
        </div>
    );
}
 
export default SelectCategory;