// import React, { useState } from 'react'
import { Lowerwear } from "./categories/lowerwear.js"
import { Topwear } from "./categories/topwear.js"
import { Hoodie } from "./categories/hoodie.js"
import { Footwear } from "./categories/footwear.js"
import { Bags } from "./categories/bag.js"
export const Categories = () => {

    // const [categorie, setCategories] = useState("top_wear");
    // const [data, setData] = useState("");



    // setCategories("top_wear");
    // const utility = (x) => {
    //     setData([
    //         { name: "Forrest Black Top", link: "forrest_black_top.png" },
    //         { name: "Forrest Purpel Top", link: "forrest_purpel_top.png" },
    //         { name: "Elight Wite Top", link: "elight_white_top.png" },
    //         { name: "Elight Wite Top", link: "elight_white_top-1.png" },
    //     ])
    // }


    return (
        <>
            <div className='max-w-6xl px-6 mx-auto mt-10'>
                
                {[
                    "Top Wear",
                    "Lower Wear",
                    "Hoddies",
                    "Footwear",
                    "Bags"
                ].map((cur, i) => (
                    < >
                        <div className='flex items-center justify-between '>
                            <h1 className='text-xl font-semibold'> {cur} </h1>
                            <button className='text-sm underline' >view all</button>
                        </div>

                        {cur === "Top Wear" && <Topwear />}

                        {cur === "Lower Wear" && < Lowerwear />}
                        {cur === "Hoddies" && < Hoodie />}
                        {cur === "Footwear" && < Footwear />}

                        {cur === "Bags" && < Bags />}


                    </>
                ))}

            </div >

        </>
    )
}
