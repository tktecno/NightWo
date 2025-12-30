import React from 'react'

export const Topwear = () => {
    return (
        <>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-6' >
                {[
                    { name: "Forrest Black Top", link: "forrest_black_top.png", price: "3,399", },
                    { name: "Forrest Purpel Top", link: "forrest_purpel_top.png", price: "2,899",   },
                    { name: "Elight Wite Top", link: "elight_white_top.png", price:"1,299", },
                    { name: "Elight Wite Top", link: "elight_white_top-1.png", price:"2,600" },
                ].map((p, i) => (
                    <div className='bg-white rounded-xl shadow hover:shadow-lg p-4 cursor-pointer' key={i}>
                        <img src={`./products/top_wear/${p.link}`} alt={p.name} className="w-full h-40" />
                        <div className='mt-3 text-sm font-medium'>{p.name}</div>
                        <div className='text-sm text-emerald-600 font-semibold mt-1'>₹ {p.price}</div>
                        <button className='mt-3 w-full py-2 text-sm border rounded-md hover:bg-slate-100'>Add to cart</button>
                    </div>
                ))};
            </div>
        </>

    )
}
