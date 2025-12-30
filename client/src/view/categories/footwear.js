import React from 'react'

export const Footwear = () => {
  return (<>
    <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-6' >
        {[
            { name: "Blue Night Slippers", link: "blue_night_slippers.png" },
            { name: "Elight White Slippers", link: "elight_white_slipper-1.png" },
            { name: "Elight White Slippers", link: "elight_white_slipper.png" },
            { name: "Elight White Socks", link: "elight_white_socks.png" }
        ].map((p, i) => (
            <div className='bg-white rounded-xl shadow hover:shadow-lg p-4 cursor-pointer' key={i}>
                <img src={`./products/footwear/${p.link}`} alt={p.name} className="w-full h-40" />
                <div className='mt-3 text-sm font-medium'>{p.name}</div>
                <div className='text-sm text-emerald-600 font-semibold mt-1'>₹ 5,000</div>
                <button className='mt-3 w-full py-2 text-sm border rounded-md hover:bg-slate-100'>Add to cart</button>
            </div>
        ))};
    </div>
</>
  )
}
