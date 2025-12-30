import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const Cart = ({ setCartlist, cartlist }) => {
    const [loading, setLoading] = useState(false);
    const [ef, setef] = useState(false);

    // Fetch cart items from backend
    // useEffect(() => {
    //   const fetchCart = async () => {
    //     try {
    //       const res = await axios.get("http://localhost:3000/cart", {
    //         withCredentials: true,
    //       });
    //       setCartlist(res.data || []);
    //     } catch (err) {
    //       console.error("Error loading cart", err);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   fetchCart();
    // }, []);

    const updateQty = async (id, qty) => {
        //   if (qty < 1) return;

        //   try {
        //     await axios.put(
        //       "http://localhost:3000/cart/update",
        //       { product_id: id, quantity: qty },
        //       { withCredentials: true }
        //     );

        //     setCart((prev) =>
        //       prev.map((item) =>
        //         item.id === id ? { ...item, quantity: qty } : item
        //       )
        //     );
        //   } catch (err) {
        //     console.error(err);
        //   }

        setCartlist(prev => {
            prev.map((cur) => {
                if (cur.id == id) cur.quantity = qty;
            })
            return prev;
        })
        setef(prev => !prev);
    };

    const removeItem = async (id) => {
        //   try {
        //     await axios.post(
        //       "http://localhost:3000/cart/remove",
        //       { product_id: id },
        //       { withCredentials: true }
        //     );

        //     setCart((prev) => prev.filter((item) => item.id !== id));
        //   } catch (err) {
        //     console.error(err);
        //   }
    };

    const total = cartlist.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <>
            <div className='border-b bg-white sticky top-0 z-50'>
                <div className='w-full mx-auto flex items-center justify-between p-4'>
                    <div className='text-2xl font-bold tracking-tight'>
                        <a href="/">
                            <h1>

                    Night<span className='text-emerald-600'>Wo</span>
                            </h1>
                        </a>
                    </div>
                </div>
            </div>
            <div className="min-h-screen bg-white px-4 py-10">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>

                    {cartlist.length === 0 ? (
                        <div className="text-center text-gray-500">
                            <p>Your cart is empty 🛍️</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                {cartlist.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between border rounded-xl p-4 shadow-sm"
                                    >
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={`http://localhost:3000/uploads/${item.images[0]}` || "/no-image.jpg"}
                                                alt={item.article}
                                                className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                                            />

                                            <div>
                                                <h2 className="font-medium capitalize">
                                                    {item.article}
                                                </h2>
                                                <p className="text-gray-500 text-sm">
                                                    ₹{item.price}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => {
                                                    if (item.quantity > 0)
                                                        updateQty(item.id, item.quantity - 1)
                                                }
                                                }
                                                className="border px-2 rounded-lg cursor-pointer"
                                            >
                                                −
                                            </button>

                                            <span>{item.quantity || 0}</span>

                                            <button
                                                onClick={() => {
                                                    if (item.instock > item.quantity)
                                                        updateQty(item.id, item.quantity + 1)
                                                }
                                                }
                                                className="border px-2 rounded-lg cursor-pointer"
                                            >
                                                +
                                            </button>

                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-red-500 text-sm cursor-pointer"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Summary */}
                            <div className="border rounded-2xl p-6 shadow-md h-fit">
                                <h3 className="text-xl font-medium mb-4">Order Summary</h3>

                                <div className="flex justify-between text-gray-600 mb-2">
                                    <span>Subtotal</span>
                                    <span>₹{total}</span>
                                </div>

                                <div className="flex justify-between text-gray-600 mb-4">
                                    <span>Shipping</span>
                                    <span>₹0</span>
                                </div>

                                <div className="flex justify-between font-semibold text-lg ">
                                    <span>Total</span>
                                    <span>₹{total}</span>
                                </div>

                                <button className="mt-6 w-full bg-black text-white py-3 rounded-xl cursor-pointer">
                                    Checkout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
