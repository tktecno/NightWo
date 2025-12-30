import React, { useEffect, useState, useMemo } from "react";

import { Productslist } from "./products.js";
import { List } from "./list";
import { Additem } from "./add.js";
import axios from "axios";

// Nightwo Admin — Products Listing / Delisting Page (local-only sample UI)
// Single-file React component (JSX) using TailwindCSS classes.

export default function Admin({user}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [load, setLoad] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selected, setSelected] = useState(new Set());
  
  const selectedCount = selected.size;

  const [confirmModal, setConfirmModal] = useState({ open: false, type: null, payload: null });

  // Edit modal state (local-only)
  const [editModal, setEditModal] = useState({ open: false, product: null });

  
  const getProducts = ()=>{
    try {

      const res = axios.get("http://localhost:3000/getproducts",{withCredentials:true}).then((res)=>{
        setProducts(res.data)
      })
    } catch (error) {
      console.error(error);
    }
  }

  const deleteProducts = async()=>{
    
    const id = confirmModal?.payload?.id || null;
    const ids = selected ? Array.from(selected) : null;
    
    try {
      const res = await axios.get("http://localhost:3000/deleteProduct",{
        params:{id,ids,},withCredentials:true});
      if(id)
      {
        setProducts((prev)=>{
          return prev.filter(p=> p.id !== id);
        })
      }
      else if(ids.length)
      {
        ids.forEach(element => {
          setProducts((prev)=>{
            return prev.filter(p=> p.id!==element);
          })
        });
        setSelected(new Set());
      }

    }catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    // populate with local sample products (no server requests)
    getProducts();
  }, [user]);
  const filter = () => {
    const q = query.trim().toLowerCase();
    if (!q) return products;

  
    return products.filter(
      
      (p) =>{
        return p.article.toLowerCase().includes(q) ||
        p.artical_id.toLowerCase().includes(q) ||
        p.categorie.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.artical_id.toLowerCase().includes(q);
      }
    );
  };

  function openEdit(product) {
    setEditModal({ open: true, product: { ...product } });
  }

  function closeEdit() {
    setEditModal({ open: false, product: null });
  }

  function updateEditField(field, value) {
    setEditModal(prev => ({ ...prev, product: { ...prev.product, [field]: value } }));
  }

  function saveEdit() {
    if (!editModal.product) return;
    const updated = { ...editModal.product };
    // ensure numeric fields are numbers
    updated.price = Math.max(0,Number(updated.price))
    updated.inStock = Math.max(0,Number(updated.inStock));
    // auto delist if no stock
    if (updated.inStock === 0) updated.status = 'inactive';
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    setSelected(prev => {
      const s = new Set(prev);
      if (!updated) return s;
      // if product removed or id changed (not expected) keep selections coherent
      return s;
    });
    closeEdit();
  }

  function toggleSelect(id) {
    setSelected(prev => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id); else s.add(id);
      return s;
    });
  }

  function toggleSelectAllOnPage() {
    if (products.length === 0) return;
    const allSelected = products.every(p => selected.has(p.id));
    if (allSelected) {
      setSelected(prev => {
        const s = new Set(prev);
        for (const p of products) s.delete(p.id);
        return s;
      });
    } else {
      setSelected(prev => {
        const s = new Set(prev);
        for (const p of products) s.add(p.id);
        return s;
      });
    }
  }

  function updateProductStatus(id, newStatus) {
    // local-only: prevent listing if out of stock
    setProducts(prev => prev.map(p => {
      if (p.id !== id) return p;
      return { ...p, status: p.inStock === 0 ? 'inactive' : newStatus };
    }));
  }

  function bulkAction(action) {
    if (selected.size === 0) return;
    setConfirmModal({ open: true, type: "bulk", payload: { action, ids: Array.from(selected) } });
  }

  const isAllOnPageSelected = products.length > 0 && products.every(p => selected.has(p.id));

  const list = filter();

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, startIndex + products.length - 1);
  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Admin</h1>
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-2">
              <input
                value={query}
                onChange={e => { setQuery(e.target.value); filter(); setPage(1); }}
                className="border rounded px-3 py-1 w-64"
                placeholder="Search by title, SKU, category..."
              />
              <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }} className="border rounded px-2 py-1">
                <option value="all">All</option>
                <option value="active">Listed</option>
                <option value="inactive">Delisted</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">Page {page} / {totalPages}</div>
          </div>
        </header>

        <section className="bg-white rounded shadow-sm overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={isAllOnPageSelected} onChange={toggleSelectAllOnPage} />
                <span className="text-sm">Select page</span>
              </label>

              <div className="flex items-center gap-2">
                <button disabled={selectedCount===0} onClick={() => bulkAction('activate')} className="px-3 py-1 rounded bg-green-600 text-white disabled:opacity-50 cursor-pointer disabled:cursor-default">List</button>
                <button disabled={selectedCount===0} onClick={() => bulkAction('deactivate')} className="px-3 py-1 rounded bg-yellow-500 text-white disabled:opacity-50 cursor-pointer disabled:cursor-default">Delist</button>
                <button disabled={selectedCount===0}  className="px-3 py-1 rounded bg-red-600 text-white disabled:opacity-50 disabled:cursor-default cursor-pointer" onClick={()=> bulkAction('delete')}>Delete</button>
              </div>

              <div className="text-sm text-gray-500">{selectedCount} selected</div>
            </div>
            { load && < Additem setLoad={setLoad} setProducts={setProducts} />}
            <div>
              <button className="text-sm p-2 rounded-md text-blue-700 border border-black hover:bg-gray-300 cursor-pointer " onClick={()=>setLoad(true)} > <i className="fa-solid fa-plus"></i> Add item</button>
            </div>

            <div className="text-sm text-gray-500">{loading ? 'Loading...' : `${startIndex}-${endIndex} of approx. ${totalPages * limit}`}</div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm">&nbsp;</th>
                  <th className="px-4 py-3 text-left text-sm">Product</th>
                  <th className="px-4 py-3 text-left text-sm">SKU</th>
                  <th className="px-4 py-3 text-left text-sm">Price</th>
                  <th className="px-4 py-3 text-left text-sm">In Stock</th>
                  <th className="px-4 py-3 text-left text-sm">Status</th>
                  <th className="px-4 py-3 text-left text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {error && (
                  <tr><td colSpan={6} className="p-6 text-red-600">{error}</td></tr>
                )}

                {!loading && products.length === 0 && !error && (
                  <tr><td colSpan={6} className="p-6 text-center text-gray-500">No products found.</td></tr>
                )}


                {query!=="" && < List list={list}
                 selected={selected}  
                 toggleSelect={toggleSelect}  
                 updateProductStatus={updateProductStatus} 
                 openEdit={openEdit}
                 setConfirmModal={setConfirmModal}
                 deleteProducts={deleteProducts} />}
                
                {query==="" && < Productslist products={products}
                 selected={selected}  
                 toggleSelect={toggleSelect}  
                 updateProductStatus={updateProductStatus} 
                 openEdit={openEdit}
                 setConfirmModal={setConfirmModal} 
                 deleteProducts={deleteProducts} />}



              </tbody>
            </table>
          </div>

          <div className="p-4 border-t flex items-center justify-between">
            <div>
              <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 border rounded mr-2 cursor-pointer">Previous</button>
              <button disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-3 py-1 border rounded cursor-pointer">Next</button>
            </div>
            <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>
          </div>
        </section>

        {/* Confirmation Modal */}
        {confirmModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded p-6 w-full max-w-md">
              <h3 className="text-lg font-medium">Confirm action</h3>
              <p className="text-sm text-gray-600 mt-2">{confirmModal.type === 'bulk' ? `This will ${confirmModal.payload.action} ${confirmModal.payload.ids.length} product(s).` : 'This action cannot be undone.'}</p>

              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => setConfirmModal({ open: false, type: null, payload: null })} className="px-3 py-1 border rounded cursor-pointer">Cancel</button>
                {confirmModal.type === 'delete' && (
                  <button onClick={() => {
                    setConfirmModal({ open: false, type: null, payload: null });
                    deleteProducts();
                  }} className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer">Delete</button>
                )}
                {confirmModal.type === 'bulk' && (
                  <>
                    <button onClick={() => setConfirmModal({ open: false, type: null, payload: null })} className="px-3 py-1 border rounded cursor-pointer">Back</button>
                    <button onClick={() => {
                      setConfirmModal({ open: false, type: null, payload: null });
                      deleteProducts();
                      }} className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer">Confirm</button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editModal.open && editModal.product && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded p-6 w-full max-w-2xl">
              <h3 className="text-lg font-medium mb-2">Edit Product</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-600">Title</label>
                  <input value={editModal.product.title} onChange={e => updateEditField('title', e.target.value)} className="w-full border rounded px-2 py-1" />
                </div>
                <div>
                  <label className="text-xs text-gray-600">SKU</label>
                  <input value={editModal.product.sku} onChange={e => updateEditField('sku', e.target.value)} className="w-full border rounded px-2 py-1" />
                </div>
                <div>
                  <label className="text-xs text-gray-600">Price</label>
                  <input type="number" value={editModal.product.price} onChange={e => updateEditField('price', Number(e.target.value))} className="w-full border rounded px-2 py-1" />
                </div>
                <div>
                  <label className="text-xs text-gray-600">In Stock</label>
                  <input type="number" value={editModal.product.inStock} onChange={e => updateEditField('inStock', Number(e.target.value))} className="w-full border rounded px-2 py-1" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-gray-600">Description</label>
                  <textarea value={editModal.product.description} onChange={e => updateEditField('description', e.target.value)} className="w-full border rounded px-2 py-1" rows={3} />
                </div>
                <div>
                  <label className="text-xs text-gray-600">Category</label>
                  <input value={editModal.product.category} onChange={e => updateEditField('category', e.target.value)} className="w-full border rounded px-2 py-1" />
                </div>
                <div>
                  <label className="text-xs text-gray-600">Status</label>
                  <select value={editModal.product.status} onChange={e => updateEditField('status', e.target.value)} className="w-full border rounded px-2 py-1">
                    <option value="active">Listed</option>
                    <option value="inactive">Delisted</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button onClick={closeEdit} className="px-3 py-1 border rounded cursor-pointer">Cancel</button>
                <button onClick={saveEdit} className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer ">Save</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
