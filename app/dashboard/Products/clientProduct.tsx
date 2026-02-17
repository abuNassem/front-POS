'use client';

import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../../services/product";

const ClientProduct = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["products"],
        queryFn: () => getProduct(),
    })
    if (!data) return <p>No products found</p>
    return (
        <div>
            <h1>Client Product</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.data.map((product: any) => (
                        <li key={product.id} className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-gray-600">{product.description}</p>
                            <p className="text-gray-600">{product.price}</p>
                            <p className="text-gray-600">{product.quantity}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default ClientProduct;