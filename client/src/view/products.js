import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
// E-commerce Products Page (React + Tailwind)
// Use this as a standalone page in your Vite + React + Tailwind project.

// const SAMPLE_PRODUCTS = Array.from({ length: 24 }).map((_, i) => ({
//   id: i + 1,
//   article: `Wireless Headphones Model ${i + 1}`,
//   sku: `WH-${1000 + i}`,
//   price: 2499 + (i % 5) * 300,
//   rating: (Math.random() * 2 + 3).toFixed(1),
//   stock: Math.max(0, 20 - (i % 7)),
//   image: `https://source.unsplash.com/random/600x600?electronics,tech,headphone&sig=${i}`
// }));

export default function ProductsPage({setCart, setCartlist}){
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const perPage = 8;

  const getproducts = async ()=>{
    try {
      const res = await axios.get("http://localhost:3000/getallproducts",{withCredentials:true});
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(()=>{
    getproducts();
  },[])

  const categories = ["All","Bags","Footwear","Hoodie","Lower Wear","Top Wear"];

  const filtered = useMemo(()=>{
    let list = products;
    if(query) list = list.filter(p => p.article.toLowerCase().includes(query.toLowerCase()) || p.artical_id.toLowerCase().includes(query.toLowerCase()));
    if(category !== "All") list = list.filter(p => p.article.toLowerCase().includes(category.toLowerCase()));

    if(sort === "price_asc") list.sort((a,b)=>a.price-b.price);
    else if(sort === "price_desc") list.sort((a,b)=>b.price-a.price);
    else if(sort === "rating") list.sort((a,b)=>b.rating - a.rating);

    return list;
  },[query,category,sort,products]);



  const AddToCart = (curr)=>{
    setCartlist(prev=>{
      let p = [...prev];
      if(!prev.includes(curr)) p = [...p,curr];
      p.map((cur)=>{
        cur["quantity"] = cur?.quantity ? cur.quantity+1 : 1;
      })
     return p;
    })
  }




  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page-1)*perPage, page*perPage);

  const [quickView, setQuickView] = useState(null);

  return (
    <div className="min-h-screen bg-white text-slate-800">
        <div className="max-w-6xl mx-auto grid justify-items-center p-4">
            <input value={query} onChange={(e)=>{setQuery(e.target.value); setPage(1);}} placeholder="Search products or SKU" className="px-3 py-2 border rounded-md text-sm w-72" />
            <div className="border-b-3 border-indigo-200 w-72" ></div>
        </div>

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <aside className="md:col-span-1 bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Filters</h3>

          <div className="mb-4">
            <label className="text-xs text-slate-500">Category</label>
            <select value={category} onChange={(e)=>{setCategory(e.target.value); setPage(1);}} className="w-full mt-2 px-3 py-2 border rounded-md text-sm">
              {categories.map(c=> <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="mb-4">
            <label className="text-xs text-slate-500">Sort</label>
            <select value={sort} onChange={(e)=>setSort(e.target.value)} className="w-full mt-2 px-3 py-2 border rounded-md text-sm">
              <option value="popular">Most Popular</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium">Stock</h4>
            <ul className="mt-2 text-sm text-slate-600 space-y-2">
              <li><label className="inline-flex items-center"><input type="checkbox" className="mr-2"/> In Stock</label></li>
              
              <li><label className="inline-flex items-center"><input type="checkbox" className="mr-2"/> Out of Stock</label></li>
            </ul>
          </div>
        </aside>

        {/* Products Grid */}
        <section className="md:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-slate-500">Showing <span className="font-medium">{filtered.length}</span> products</div>
            <div className="text-sm">Page {page} / {totalPages}</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pageItems.map(p => (
              <div key={p.id} className="bg-white rounded-xl shadow hover:shadow-lg p-3 flex flex-col">
                <div className="relative w-full h-44 rounded-md overflow-hidden bg-slate-100">
                  <img src={`http://localhost:3000/uploads/${p.images[0]}`} alt={p.article} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 flex gap-2">
                  </div>
                </div>

                <div className="mt-3 flex-1">
                  <div className="text-sm font-medium">{p.article}</div>
                  <div className="text-xs text-slate-500 mt-1">SKU: {p.artical_id}</div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-emerald-600 font-semibold">₹ {p.price}</div>
                    <div className="text-xs text-slate-500">⭐ 4.5{p.rating}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button onClick={()=>setQuickView(p)} className="px-3 py-1 text-xs border rounded-md cursor-pointer ">Quick view</button>
                    <button className={`px-3 py-1 text-xs rounded-md ${p.instock>0?
                      'bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer' : 
                      'border text-slate-500'}`} 
                      disabled={p.instock<=0}
                      onClick={()=>{
                        setCart(prev=>prev+1)
                        AddToCart(p);
                      }}>
                        Add To Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button className="px-3 py-2 border rounded-md" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Prev</button>
            {Array.from({ length: totalPages }).map((_, i)=> (
              <button key={i} onClick={()=>setPage(i+1)} className={`px-3 py-2 rounded-md ${page===i+1? 'bg-emerald-600 text-white' : 'border'}`}>{i+1}</button>
            ))}
            <button className="px-3 py-2 border rounded-md" onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}>Next</button>
          </div>

        </section>

      </main>

      {/* Quick view modal */}
      {quickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-3xl w-full grid grid-cols-1 md:grid-cols-2">
            <div className="p-4">
              <img src={`http://localhost:3000/uploads/${quickView.images[0]}`} alt={quickView.article} className="w-full h-96 object-cover rounded-md" />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{quickView.article}</h3>
                  <div className="text-xs text-slate-500 mt-1">SKU: {quickView.artical_id}</div>
                </div>
                <button className="text-slate-400" onClick={()=>setQuickView(null)}>✕</button>
              </div>

              <div className="mt-4">
                <div className="text-2xl font-semibold text-emerald-600">₹ {quickView.price}</div>
                <div className="text-sm text-slate-600 mt-2">⭐4.2 {quickView.rating} • {quickView.instock} in stock</div>
                <p className="mt-4 text-sm text-slate-700">{quickView.description}</p>

                <div className="mt-6 flex gap-3">
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-md cursor-pointer hover:bg-emerald-700"
                  onClick={()=>{
                    setCartlist(prev=>[...prev,quickView]);
                    setCart(prev=>prev+1);
                  }}
                  >Add to cart</button>
                  <button className="px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-400" onClick={()=>setQuickView(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-12 py-12 text-sm text-slate-500 text-center">Built with React + Tailwind </footer>
    </div>
  );
}
