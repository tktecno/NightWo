import React from 'react'

export const Bags = () => {
  return (<>
    <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-6' >
        {[
            { name: "Elight White Hand Bag", link: "elight_white_bag.png" },
            { name: "Elight White Large Bag", link: "elight_white_large_bag.png" },
            { name: "Forrest Black Bag", link: "forrest_black_bag.png" },
            { name: "Forrest Purple Bag", link: "forrest_purpel_bag.png" }
        ].map((p, i) => (
            <div className='bg-white rounded-xl shadow hover:shadow-lg p-4 cursor-pointer' key={i}>
                <img src={`./products/bag/${p.link}`} alt={p.name} className="w-full h-38" />
                <div className='mt-3 text-sm font-medium'>{p.name}</div>
                <div className='text-sm text-emerald-600 font-semibold mt-1'>₹ 5,000</div>
                <button className='mt-3 w-full py-2 text-sm border rounded-md hover:bg-slate-100'>Add to cart</button>
            </div>
        ))};
    </div>
</>
  )
}
