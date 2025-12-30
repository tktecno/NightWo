import axios from 'axios';
import React, { useState } from 'react'

export const Additem = ({ setLoad, setProducts }) => {

  const [form, setForm] = useState({
    article:"",
    artical_id:"",
    price:0,
    in_stock:0,
    categorie:"",
    description:"",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validation = ()=>{
    if(form.article.trim().length <3 || form.categorie.trim().length<2) return "name should be more then 3 char & categorie more than 2 char"
    return "";
  }
  const closeModal = ()=>{
    setForm({
      article: "",
      artical_id: "",
      price: "0",
      in_stock: "0",
      categorie: "",
      description: "",
    });

    setError("");
    setSuccess("");
    setLoad(false);
  }

  const handleSubmit = async()=>{
    setError("");
    setSuccess("");
    const v = validation();
    
    const payload = {
      ...form,
      price: Number(form.price),
      in_stock: Number(form.in_stock),
    };

    console.log( "handlesubmit : ", payload);
    if(v) return setError(v);

    try {
      const res = await axios.post("http://localhost:3000/addItem",payload,{withCredentials:true});
      setSuccess("item added succesfully. ");
      setProducts(prev=>[...prev, res.data.data]);
      setTimeout(() => {
        closeModal();
      }, 200);
    } catch (error) {
      console.error(error);
    }
  }


const onchange = (e)=> setForm((prev)=>{
  const {name, value} = e.target;
  const current = {...prev};
  if(name==="artical_id"){
    current[name]=value.toUpperCase();
  }
  else if(name==="price" || name === "in_stock"){
    current[name] = value.replace(/\D/g, "");
  }
  else{

    current[name]=value;
  }
  return current;
});

  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40' >
        <form onSubmit={(e)=>{
          e.preventDefault();
          handleSubmit();
        }} className='bg-white rounded w-full p-6 max-w-2xl grid gap-10 shadow-2xl'>
          <h3 className='text-xl font-semibold mb-3'>Add Item</h3>

          { error && <p className='text-red-600 text-sm capitalize ' > {error} </p>}
          {success && <p className='text-green-600 text-sm capitalize' > {success} </p> }

          <div className='grid grid-cols-2 gap-15'>

            <div className='flex flex-col'>
              <label htmlFor="article" className='text-sm mb-1 font-light tracking-wide'>Artile Name</label>
              <input type="text" name='article' className='border rounded py-1 pl-2  ' value={form.article} onChange={onchange} autoFocus />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="artical_id" className='text-sm mb-1 font-light tracking-wide' >Article Id/Code</label>
              <input type="text" name='artical_id' className='border rounded py-1 pl-2' value={form.artical_id} onChange={onchange} placeholder='ATC003..' />
            </div>
          </div>


          <div className='grid grid-cols-3 gap-20'>
            <div className='flex flex-col'>
              <label htmlFor="price" className='text-sm mb-1 font-light tracking-wide'>Price</label>
              <input type="text" name='price' className='border rounded py-1 pl-2 ' value={form.price} onChange={onchange}/>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="in_stock" className='text-sm mb-1 font-light tracking-wide'>Stock</label>
              <input type="text" name='in_stock' className='border rounded py-1 pl-2 ' value={form.in_stock} onChange={onchange}/>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="categorie" className='text-sm mb-1 font-light tracking-wide'>Categorie</label>
              <input type="text" name="categorie" className='border rounded py-1 pl-2' value={form.categorie} onChange={onchange} placeholder='hoodie..'/>
            </div>
          </div>


          <div className='flex flex-col'>
            <label htmlFor="description" className='text-sm mb-1 font-light tracking-wide'>Description</label>
            <textarea name="description" cols="25" rows="7" className='border overflow-scroll px-3 py-2 resize-none ' value={form.description} onChange={onchange}></textarea>
          </div>


          <div className='flex justify-center gap-16'>
            <button className='text-red-500 font-semibold border border-red-500 rounded-md px-2 py-1 hover:bg-red-200 cursor-pointer' onClick={()=>closeModal()} type='button' >

            <i className="fa-solid fa-x text-sm" ></i>
            Cancel
            </button>


            <button className='text-blue-500 font-semibold py-2 px-2 border border-blue-500 rounded-md cursor-pointer hover:bg-blue-200' type='submit' >
            Submit
            <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </form>

      </div>
    </>
  )
}
