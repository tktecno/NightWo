
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { Header } from './view/header.js';
import { Footer } from './view/footer.js';
import { Body } from './view/body.js';
import AuthModal from './view/auth';
import Products from './view/products.js';
import { Categories } from './view/categories.js';
import Admin from "./view/Admin/admin.js"
import { RetailerAuth } from './view/authRetailer.js';
import { Cart } from './view/cart/cart';

function App() {

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [retailer, setRetailer] = useState(null);
  const [cart, setCart] = useState(0);
  const [cartlist, setCartlist] = useState([]);



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/", {
          withCredentials: true
        });
        setUser(res.data.user || null);
        setRetailer(res.data.retailer || null);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <AuthModal open={open} onClose={() => setOpen(false)} setUser={setUser} setRetailer={setRetailer} />
      {page == "cart" ?
        <Cart cartlist={cartlist} setCartlist={setCartlist} />
        :
        <>
          <Header setOpen={setOpen} setPage={setPage} user={user} setUser={setUser} setRetailer={setRetailer} cart={cart} />
          {page === "products" && < Products setCart={setCart} setCartlist={setCartlist} />}
          {page === "home" && <Body setOpen={setOpen} setPage={setPage} user={user} />}
          {page === "categories" && < Categories />}
          {page === "admin" && (retailer ? < Admin user={user} /> : < RetailerAuth setPage={setPage} />)}
          {page === "cart" && <Cart cartlist={cartlist} setCartlist={setCartlist} />}
        </>

      }
      <Footer setPage={setPage} />
    </>
  );
}

export default App;
