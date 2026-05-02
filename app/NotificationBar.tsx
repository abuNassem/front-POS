'use client'

import { useApi } from "@/context";

const NotificationBar = () => {
    const { notify, clearNotify } = useApi();

    if (!notify.type) return null;

    const bgColor = notify.type === "success" ? "bg-green-600" : "bg-red-600";

    return (
        <div className={`fixed bottom-0 right-0 min-w-[300px] p-4 rounded-lg shadow-2xl text-white z-10000 transition-all transform animate-bounce-in ${bgColor}`}>
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-bold text-lg">
                        {notify.type === "success" ? "✓ نجاح العملية" : "⚠ تنبيه خطأ"}
                    </h4>
                    <p className="mt-1">{notify.message}</p>
                    {notify.errorCode && (
                        <span className="text-xs bg-black/20 px-2 py-1 rounded mt-2 inline-block">
                            Code: {notify.errorCode}
                        </span>
                    )}
                </div>
                
                {/* زر الإغلاق */}
                <button 
                    onClick={clearNotify}
                    className="ml-4 text-white/80 hover:text-white text-2xl leading-none"
                >
                    &times;
                </button>
            </div>
            
            {/* خط تقدم زمني بسيط (ProgressBar) */}
            <div className="absolute bottom-0 left-0 h-1 bg-white/30 animate-shrink" onAnimationEnd={clearNotify} />
        </div>
    );
};

export default NotificationBar;