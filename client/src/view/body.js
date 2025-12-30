import React from 'react'

export const Body = ({ setOpen, setPage, user }) => {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative w-full xl:h-[480px] h-[540px] bg-gradient-to-r from-emerald-100 to-sky-100 flex items-center">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="absolute inset-0 bg-[url('./products/hoodie/blue_night_hoodie.png')] bg-cover bg-no-repeat opacity-50"
          ></div>
          <h2 className="text-4xl relative z-10 font-semibold leading-tight max-w-xl">
            Your One‑Stop Store for Home Wear Essentials
          </h2>
          <p className="mt-3 relative z-10 max-w-md">
            Discover quality products, fast delivery, and exclusive discounts.
          </p>
          <button onClick={()=> setPage("categories")}
           className=" relative z-10 mt-6 px-6 py-3 bg-emerald-600 text-white rounded-xl shadow hover:bg-emerald-700 cursor-pointer"
          >
            Shop Now
          </button>
        </div>
      </section>
      {/* Featured Categories */}
      <section className="max-w-6xl mx-auto px-6 mt-12">
        <h3 className="text-xl font-semibold mb-4">Featured Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "Top Wear",
            "Lower Wear",
            "Hoodie",
            "Footwear",
            "Bags"
          ].map((cat, i) => (
            <button>
            <div key={i} className=" p-6 bg-slate-200 rounded-xl shadow hover:shadow-md cursor-pointer text-center ">
              <div className=" text-md font-medium font-bold ">{cat}</div>
            </div>
            </button>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-6xl mx-auto px-6 mt-12">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Best Sellers</h3>
          <button className="text-sm underline">View all</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">


          <div className="bg-white rounded-xl shadow hover:shadow-lg p-4 cursor-pointer" key={1}>
            <img
              src="./products/hoodie/blue_night_hoodie.png"
              alt="Product"
              className="w-full h-40 object-cover rounded-md"
            />
            <div className="mt-3 text-sm font-medium">Blue Night Hoodie </div>
            <div className="text-sm text-emerald-600 font-semibold mt-1">₹ 5,499</div>
            <button className="mt-3 w-full py-2 text-sm border rounded-md hover:bg-slate-100">Add to cart</button>
          </div>
          <div className="bg-white rounded-xl shadow hover:shadow-lg p-4 cursor-pointer" key={2}>
            <img
              src="./products/hoodie/purple_hoodie.png"
              alt="Product"
              className="w-full h-40 object-cover rounded-md"
            />
            <div className="mt-3 text-sm font-medium">Purple Hoodie</div>
            <div className="text-sm text-emerald-600 font-semibold mt-1">₹ 5,299</div>
            <button className="mt-3 w-full py-2 text-sm border rounded-md hover:bg-slate-100">Add to cart</button>
          </div>
          <div className="bg-white rounded-xl shadow hover:shadow-lg p-4 cursor-pointer" key={3}>
            <img
              src="./products/lower_wear/purple_pant.webp"
              alt="Product"
              className="w-full h-40 object-cover rounded-md"
            />
            <div className="mt-3 text-sm font-medium">Sample Product</div>
            <div className="text-sm text-emerald-600 font-semibold mt-1">₹ 1,899</div>
            <button className="mt-3 w-full py-2 text-sm border rounded-md hover:bg-slate-100">Add to cart</button>
          </div>
          <div className="bg-white rounded-xl shadow hover:shadow-lg p-4 cursor-pointer" key={4}>
            <img
              src="./products/footwear/blue_night_slippers.png"
              alt="Product"
              className="w-full h-40 object-cover rounded-md"
            />
            <div className="mt-3 text-sm font-medium">Sample Product</div>
            <div className="text-sm text-emerald-600 font-semibold mt-1">₹ 2,899</div>
            <button className="mt-3 w-full py-2 text-sm border rounded-md hover:bg-slate-100">Add to cart</button>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      { !user && <section className="max-w-6xl mx-auto px-6 mt-16">
        <div className="p-10 bg-gradient-to-r from-emerald-600 to-emerald-400 text-white rounded-2xl shadow">
          <h3 className="text-2xl font-semibold">Flat 20% OFF on First Order</h3>
          <p className="mt-2 text-sm">Sign up today and claim your exclusive welcome discount.</p>
          <button className="mt-4 px-6 py-3 bg-white text-emerald-600 rounded-xl font-medium shadow hover:bg-gray-400 hover:text-white " onClick={() => {
            setOpen(true);
          }}  >
            Create Account
          </button>
        </div>
      </section>}

    </>
  )
}
