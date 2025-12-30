import axios from "axios";
import React, { useState } from "react";

export const Productslist = ({
    products,
    selected,
    toggleSelect,
    updateProductStatus,
    openEdit,
    setConfirmModal,
}) => {
    const [imgcard, setImgcard] = useState(false);
    const [error, setError] = useState(null);
    const [succes, setSucces] = useState(null);
    const [btn, setBtn] = useState(true);
    const [img, setImg] = useState({
        productId: "",
        file: null,
    });
    const [preview, setPreview] = useState(null);
    const reset = () => {
        setSucces(null);
        setError(null);
        setBtn(true);
    }
    const handleImageChange = (e) => {
        reset();
        const file = e.target.files[0];
        if (!file) return setError("Img Not Found");
        if (file.size > 5000000) return setError("Img Size Should Less Then 5MB");

        setImg((prev) => ({
            ...prev,
            file,
        }));

        setPreview(URL.createObjectURL(file));
        setBtn(false)
    };
    const addImage = async () => {
        reset();
        try {
            if (!img.file || !img.productId) {
                alert("Image or Product missing");
                return;
            }

            const formData = new FormData();
            formData.append("img", img.file);
            formData.append("productId", img.productId);

            const res = await axios.post(
                "http://localhost:3000/AddImage",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // reset state
            setSucces(res.data.message);
            setImg({productId:"",file:null});
            setTimeout(()=>{
                setImgcard(false);
                reset();
            },700)
        } catch (error) {
            console.error("Upload failed:", error);
            setError("Upload failed ");
            setBtn(true);
        }
    };
    return (
        <>
            {imgcard && (
                <>
                    <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
                        <div className="bg-white w-96 rounded-lg p-6 border border-gray-200 z-50">
                            <h2 className="text-base font-semibold text-gray-900 mb-4">
                                Upload Product Image
                            </h2>

                            {preview && (
                                <img
                                    src={preview}
                                    alt="preview"
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                            )}

                            <input
                                name="img"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full border border-gray-300 rounded-md p-2 mb-5
                  focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                            />
                            {succes && <p className="text-sm text-green-600" > {succes} </p>}
                            {error && <p className="text-sm text-red-600"> {error} </p>}
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => {
                                        setImgcard(false);
                                        setPreview(null);
                                    }}
                                    className="px-4 py-2 rounded-md border border-gray-300
                                    text-gray-700 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>

                                <button
                                    disabled={btn}
                                    onClick={addImage}
                                    className="px-4 py-2 rounded-md bg-emerald-600
                text-white hover:bg-emerald-700 disabled:bg-emerald-300"
                                >
                                    Save Image
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 ">
                    <td className="px-4 py-3">
                        <input
                            type="checkbox"
                            checked={selected.has(product.id)}
                            onChange={() => toggleSelect(product.id)}
                        />
                    </td>

                    <td className="px-4 py-3 flex items-center gap-3 h-28">
                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                            {product?.images?.length ? (
                                <img
                                    src={`http://localhost:3000/uploads/${product.images[0]}`}
                                    alt={product.article}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <button
                                    onClick={() => {
                                        setImgcard(true);
                                        setImg({ productId: product.id, file: null });
                                        setPreview(null);
                                    }}
                                    className="w-full h-full text-xs text-gray-700 hover:underline"
                                >
                                    Add Image
                                </button>
                            )}
                        </div>

                        <div className="">
                            <div className="font-medium">{product.article}</div>
                            <div className="text-xs text-gray-500">
                                {product.categorie || "—"}
                            </div>
                            <div className="text-xs text-gray-600 mt-1 absolute h-5 w-sm overflow-hidden ">
                                {product.description}
                            </div>
                        </div>
                    </td>

                    <td className="px-4 py-3 text-sm">
                        {product.artical_id || "—"}
                    </td>

                    <td className="px-4 py-3 text-sm">
                        ₹{product.price?.toFixed ? product.price.toFixed(2) : product.price}
                    </td>

                    <td className="px-4 py-3 text-sm">{product.instock}</td>

                    <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-3">
                            <span
                                className={`px-2 py-1 text-xs rounded ${product.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-700"
                                    }`}
                            >
                                {product.status === "active" ? "Listed" : "Delisted"}
                            </span>

                            <button
                                onClick={() =>
                                    updateProductStatus(
                                        product.id,
                                        product.status === "active" ? "inactive" : "active"
                                    )
                                }
                                className="text-xs underline"
                            >
                                Toggle
                            </button>
                        </div>
                    </td>

                    <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => openEdit(product)}
                                className="text-sm px-2 py-1 border rounded"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() =>
                                    setConfirmModal({
                                        open: true,
                                        type: "delete",
                                        payload: { id: product.id },
                                    })
                                }
                                className="text-sm px-2 py-1 border rounded text-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
};
