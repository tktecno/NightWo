import React, { useState } from 'react'
import axios from "axios";

export const RetailerAuth = ({setPage}) => {

    const [form, setForm] = useState({
        companyName: "",
        name: "",
        city: "",
        state: "",
        address: "",
        email: "",
        phone: "",
        password: "",
    });
    const [load, setLoad] = useState(true);
    const [error, setError] = useState(null);
    const [succes, setSucces] = useState(null);
    const [confirm, setConfirm] = useState("");


    const handlechange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if(name==="confirm") setConfirm(value);
        else
        {
            setForm((prev) => {
                const p = { ...prev };
                if (name === "phone") p[name] = value.replace(/\D/g, "");
                else p[name] = value;
                return p;
            });
        }
    }
    const verify = () => {
        for (const key of Object.keys(form)) {
            const v = form[key].trim();

            if (!v && key !== "companyName") return `${key} is empty.`;
            if (v.length < 3 && key !== "companyName") return `${key} is less than 3 letters.`;
        }
        if (form.phone.length !== 10) return "incorrect Phone";

        if (!form.password || form.password.length < 6) {
            return "Password must be at least 6 characters.";
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/.test(form.password))
            return "Password must include uppercase, lowercase, number, and symbol";
        if (form.password !== confirm) return "Passwords do not match.";

    }

    const handlesubmit = async () => {
        setError("");
        setSucces("");
        const v = verify();
        if (v) return setError(v);

        try {

            const res = await axios.post("http://localhost:3000/createRetailer",form,{withCredentials:true});

            setSucces(res.data.message);
            setPage("home");
            
        } catch (error) {
            setError(error.message);
        }
    }








    return (
        <>
            {load ?
                <div className='h-100 mt-12 pl-5'>You don't have Seller Account <button className='text-sm text-blue-700 border-b cursor-pointer hover:text-red-700' onClick={() => setLoad(false)}>Get Now</button></div>
                :
                <div className='flex items-center flex-col mt-5 ' >
                    <h3 className='text-2xl font-bold tracking-wide text-gray-800 mt-5' >Seller Registration</h3>
                    <p className='text-sm text-gray-500 mb-8'>
                        Apply to sell your products on NightWo
                    </p>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handlesubmit()
                    }} className='bg-white border border-gray-200 rounded-2xl shadow-md px-10 py-8 grid justify-items-center gap-6 w-xl'>
                        <div className='w-full max-w-xl flex items-center gap-6 '>
                            <label htmlFor="companyName" className='w-40 font-semibold text-gray-700 '>Company Name</label>
                            <input type="text" name='companyName' className='flex-1 border-b border-gray-400 pl-1 outline-none' value={form.companyName} onChange={handlechange} />
                        </div>
                        <div className='w-full max-w-xl flex items-center gap-6 '>
                            <label htmlFor="name" className='w-40 font-semibold text-gray-700'>Name</label>
                            <input type="text" name='name' className='flex-1 border-b border-gray-400 pl-1 outline-none' value={form.name} onChange={handlechange} />
                        </div>
                        <div className='w-full max-w-xl flex items-center gap-6 '>
                            <label htmlFor="phone" className='w-40 font-semibold text-gray-700'>Phone</label>
                            <input type="text" name='phone' className='flex-1 border-b border-gray-400 pl-1 outline-none' value={form.phone} onChange={handlechange} />
                        </div>
                        <div className='w-full max-w-xl flex items-center gap-6 '>
                            <label htmlFor="city" className='w-40 font-semibold text-gray-700'>City/District</label>
                            <input type="text" name='city' className='flex-1 border-b border-gray-400 pl-1 outline-none' value={form.city} onChange={handlechange} />
                        </div>
                        <div className='w-full max-w-xl flex items-center gap-6 '>
                            <label htmlFor="state" className='w-40 font-semibold text-gray-700'>State</label>
                            <input type="text" name='state' className='flex-1 border-b border-gray-400 pl-1 outline-none' value={form.state} onChange={handlechange} />
                        </div>
                        <div className=' w-full max-w-xl flex items-center gap-6 '>
                            <label htmlFor="address" className='w-40 font-semibold text-gray-700'>Address</label>
                            <input type="text" name='address' className='flex-1 border-b border-gray-400 pl-1 outline-none' value={form.address} onChange={handlechange} />
                        </div>
                        <div className="h-2"></div>
                        <div className=' w-full max-w-xl flex items-center gap-6 '>
                            <label htmlFor="email" className='w-40 font-semibold text-gray-700'>Email</label>
                            <input type="text" name='email' className='flex-1 border-b border-gray-400 pl-1 outline-none' value={form.email} onChange={handlechange} />
                        </div>
                        <div className=' w-full max-w-xl flex items-center gap-6 '>
                            <label htmlFor="password" className='w-40 font-semibold text-gray-700'>Password</label>
                            <input type="text" name='password' className='flex-1 border-b border-gray-400 pl-1 outline-none' value={form.password} onChange={handlechange} />
                        </div>
                        <div className=' w-full max-w-xl flex items-center gap-6 '>
                            <label htmlFor="confirm" className='w-40 font-semibold text-gray-700'>Confirm Password</label>
                            <input type="text" name='confirm' className='flex-1 border-b border-gray-400 pl-1 outline-none' value={confirm} onChange={handlechange} />
                        </div>
                        { error && <p className='text-sm text-red-600'>{error}</p>}
                        { succes && <p className='text-sm text-green-700' > {succes} </p>}
                        <div className="pt-6">
                            <button type='submit' className="px-20 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 active:bg-green-900 mt-10 border-l-2 border-b-2 border-yellow-500 shadow-md"
                            > [ Apply ] </button>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}
