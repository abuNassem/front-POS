import { Search } from "lucide-react";


const SearchComponent = () => {
    return (
        <div className="flex items-center gap-5">
            <input type="text" className="border border-gray-300 rounded-[100px] p-3 w-[360px] sm:w-[600px] h-[75px] text-2xl " placeholder="Search items" />
            <button className="bg-blue-500 text-white w-[70px] h-[70px] px-2 py-1 rounded-full flex items-center justify-center"><Search /></button>
        </div>
    );
};

export default SearchComponent;