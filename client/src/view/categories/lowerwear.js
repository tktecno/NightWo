import React from 'react'

export const Lowerwear = () => {
    return (
        <>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-6' >
                {[
                    { name: "Elight White Pant", link: "elight_white_pant.png" },
                    { name: "Forrest Purple Pant", link: "forrest_purpel_pant.png" },
                    { name: "Forrest Black Pant", link: "forrest_black_pant.png" },
                    { name: "Elight White Pant-1", link: "elight_white_pant-1.png" },
                ].map((p, i) => (
                    <div className='bg-white rounded-xl shadow hover:shadow-lg p-4 cursor-pointer' key={i}>
                        <img src={`./products/lower_wear/${p.link}`} alt={p.name} className="w-full h-48" />
                        <div className='mt-3 text-sm font-medium'>{p.name}</div>
                        <div className='text-sm text-emerald-600 font-semibold mt-1'>₹ 5,000</div>
                        <button className='mt-3 w-full py-2 text-sm border rounded-md hover:bg-slate-100'>Add to cart</button>
                    </div>
                ))};
            </div>
        </>
    )
}
