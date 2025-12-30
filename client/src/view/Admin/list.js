import React from 'react'

export const List = ({list,selected,toggleSelect,updateProductStatus,openEdit,setConfirmModal}) => {
    return (
        <>
            {list.map(list => (
                <tr key={list.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                        <input type="checkbox" checked={selected.has(list.id)} onChange={() => toggleSelect(list.id)} />
                    </td>
                    <td className="px-4 py-3 flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                            {list.image ? <img src={list.image} alt={list.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Image</div>}
                        </div>
                        <div>
                            <div className="font-medium">{list.article}</div>
                            <div className="text-xs text-gray-500">{list.categorie || '—'}</div>
                            <div className="text-xs text-gray-600 mt-1">{list.description}</div>
                        </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{list.artical_id || '—'}</td>
                    <td className="px-4 py-3 text-sm">₹{list.price?.toFixed ? list.price.toFixed(2) : list.price}</td>
                    <td className="px-4 py-3 text-sm">{list.inStock}</td>
                    <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-3">
                            <span className={`px-2 py-1 text-xs rounded ${list.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>{list.status === 'active' ? 'Listed' : 'Delisted'}</span>
                            <button onClick={() => updateProductStatus(list.id, list.status === 'active' ? 'inactive' : 'active')} className="text-xs underline">Toggle</button>
                        </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                            <button onClick={() => openEdit(list)} className="text-sm px-2 py-1 border rounded">Edit</button>
                            <button onClick={() => setConfirmModal({ open: true, type: 'delete', payload: { id: list.id } })} className="text-sm px-2 py-1 border rounded text-red-600">Delete</button>
                        </div>
                    </td>
                </tr>
            ))}

        </>
    )
}
