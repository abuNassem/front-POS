'use client';

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct as deleteProductService, getProduct } from "../../../services/product";
import { useState } from "react";
import ProductDrawer from "./productDrawer";
import { Product } from "@/types/product";

const ClientProduct = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const queryClient = useQueryClient()
    const { data, isLoading, error } = useQuery({
        queryKey: ["products"], queryFn: () => getProduct(null),
    });

    const deleteProduct = async (id: string) => {
        await deleteProductService(id)
        queryClient.invalidateQueries({ queryKey: ["products"] })
    }
    // تصفية البيانات بناءً على البحث
    const filteredProducts = (data as Product[])?.filter((product: any) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <div className="p-10 text-center">Loading...</div>;
    if (error) return <div className="p-10 text-red-500">Error: {error.message}</div>;

    return (
        <div className="p-2 w-full bg-gray-50 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Products Management</h1>

                <div className="flex items-center gap-3 w-full md:w-auto relative">
                    {/* زر البحث */}
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="border p-2 rounded-lg w-full md:w-64 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {/* زر الإضافة */}
                    <ProductDrawer lable="Add product" />
                </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="p-4 font-semibold text-gray-700">Name</th>
                            <th className="p-4 font-semibold text-gray-700">Description</th>
                            <th className="p-4 font-semibold text-gray-700">Price</th>
                            <th className="p-4 font-semibold text-gray-700">Quantity</th>
                            <th className="p-4 font-semibold text-gray-700 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts?.length > 0 ? (
                            filteredProducts.map((product: Product) => (
                                <tr key={product._id} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-4 text-gray-800 font-medium">{product.name}</td>
                                    <td className="p-4 text-gray-600">{product.description}</td>
                                    <td className="p-4 text-blue-600 font-bold">${product.price}</td>
                                    <td className="p-4 text-gray-600">{product.stock}</td>
                                    <td className="p-4">
                                        <div className="flex justify-center gap-2">
                                            <ProductDrawer product={product} lable="Edit" />
                                            <button onClick={() => deleteProduct(product._id as string)} className="text-red-500 hover:bg-red-50 p-2 rounded shadow-sm border border-red-100">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="p-10 text-center text-gray-500">No products found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClientProduct;