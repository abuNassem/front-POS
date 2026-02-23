'use client'
import SearchComponent from "@/components/searchComponent";
import { Barcode } from "lucide-react";
import SaleComponent from "./saleCompenent";
import FamausProduct from "./famausProduct";
import useCart from "@/hooks/useCart";

const ClientCash = () => {
    const { sale, deleteAll, deleteItem, handleSale, handlePaymentMethod, createSale, error, loading, success } = useCart()
    return (
        <div>
            <header className="flex justify-between">
                <SearchComponent />
                <button className="bg-blue-500 text-white w-[70px] h-[70px] px-2 py-1 rounded-full flex items-center justify-center"><Barcode /></button>

            </header>
            <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="col-span-2">
                    <FamausProduct addItems={handleSale} />
                </div>
                <div className="col-span-1">
                    <SaleComponent error={error} loading={loading} success={success} createSale={createSale} sale={sale} deleteItem={deleteItem} deleteAll={deleteAll} handlePaymentMethod={handlePaymentMethod} />

                </div>
            </div>



        </div>
    );
};

export default ClientCash;