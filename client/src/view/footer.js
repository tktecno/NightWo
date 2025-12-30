import React from 'react'

export const Footer = ({setPage}) => {
  return (
    <>
    {/* Footer */}
    <footer className="mt-20 bg-slate-900 text-slate-300 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-sm">
          <div>
            <h4 className="font-semibold mb-3 text-white"> <a href="/">NightWo</a></h4>
            <p>Your trusted e‑commerce platform.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-white">Quick Links</h4>
            <ul className="space-y-1">
              <li key={1} > <button onClick={()=> setPage("home")} className='cursor-pointer' > Home </button></li>
              <li key={2} > <button onClick={()=> setPage("products")} className='cursor-pointer' > Products </button></li>
              <li key={3} > <button onClick={()=> setPage("categories")} className='cursor-pointer' > Categories </button></li>
              <li key={4} > <button onClick={()=> setPage("home")} className='cursor-pointer' > Cart </button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-white">Help</h4>
            <ul className="space-y-1">
              <li key={1} >Support</li>
              <li key={2} >Shipping</li>
              <li key={3} >Returns</li>
              <li key={4} >FAQ</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-white">Follow Us</h4>
            <ul className="space-y-1">
              <li key={1}>Instagram</li>
              <li key={2} >Facebook</li>
              <li key={3} >Twitter</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}
