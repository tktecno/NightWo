// import { useState } from 'react';
import axios from 'axios';

import { useEffect, useState } from "react";

export const Header = ({ setOpen, setPage, user, setUser, setRetailer,cart }) => {

  const [drop, setDrop] = useState(false);

  useEffect(() => {
    setDrop(false);
  }, [user,cart]);

  const logout = async () => {
    if (!user) return;
    try {
      await axios.get("http://localhost:3000/logout", { withCredentials: true });
      setUser(null);
      setRetailer(null);
      setPage("home");

    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <a href="/" > <h1 className="text-2xl font-bold tracking-tight">Night<span className='text-emerald-700' >Wo</span></h1></a>

        <nav className="hidden md:flex gap-6 text-sm">
          <button className="hover:text-emerald-600 cursor-pointer " onClick={() => setPage("home")} >
            Home
          </button>
          <button className="hover:text-emerald-600 cursor-pointer" onClick={() => setPage("products")} >
            Products
          </button>
          <button className="hover:text-emerald-600 cursor-pointer" onClick={() => setPage("categories")}>
            Categories
          </button>
        </nav>

        <div className="flex items-center gap-4 text-sm">

          {user ?
            <>
              <div>

                <button className="border-b pb-1 text-red-800 hover:text-emerald-600 cursor-pointer" key={788996} onClick={() => setDrop(!drop)}><i className="fa-regular fa-user"></i>  {user.name}
                </button>

                {drop && <div className="w-20 absolute flex flex-col justify-center items-center bg-green-400">
                  <button className="border w-full py-1.5 cursor-pointer hover:bg-green-500 active:bg-green-600 "> <i class="fa-regular fa-user"></i> Profile</button>
                  <button className="border w-full py-1.5 cursor-pointer hover:bg-green-500 active:bg-green-600 ">
                    <i className="fa-solid fa-gear"></i> Setting
                  </button>
                  <button className="border w-full py-1.5 cursor-pointer hover:bg-green-500 active:bg-green-600 " onClick={() => {
                    logout();

                  }}>
                    <i className="fa-solid fa-right-from-bracket"></i> Logout
                  </button>

                </div>}
              </div>

              <button className="px-3 py-1 border rounded-md cursor-pointer hover:bg-emerald-600 hover:text-white" onClick={() => setPage("admin")} ><i class="fa-solid fa-store"></i> Seller Dashboard</button>
            </>
            :
            <button className="px-3 py-1 border rounded-md cursor-pointer hover:bg-emerald-600 hover:text-white" key={8855465} onClick={() => {
              setOpen(true)
            }}  >Login </button>
          }
          <button className="px-3 py-1 border rounded-md cursor-pointer hover:bg-emerald-600 hover:text-white" onClick={()=>setPage("cart")} >Cart ({cart}) <i class="fa-solid fa-bag-shopping"></i></button>
        </div>
      </div>
    </header>
  );
};
