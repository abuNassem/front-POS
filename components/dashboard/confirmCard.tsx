
import { useState } from "react";

const ConfirmCard = ({ onConfirm, onCancel, message, children, open }: { onConfirm: () => void, onCancel?: () => void, message: string, children?: React.ReactNode, open?: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {
                !open && children && (
                    <button className="w-auto h-auto" onClick={() => setIsOpen(true)}>{children}</button>

                )
            }
            {isOpen && children && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-opacity duration-300">
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => { onCancel?.(); setIsOpen(false) }}
                    />
                    <div className="relative bg-white dark:bg-slate-800 w-full max-w-sm rounded-2xl shadow-2xl transform transition-all animate-in zoom-in-95 duration-200 p-6">
                        <div className="flex flex-col items-center text-center">

                            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                هل أنت متأكد؟
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-8">
                                {
                                    message
                                }
                            </p>

                            <div className="flex w-full gap-3">
                                <button onClick={() => { onCancel?.(); setIsOpen(false) }} className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                    إلغاء
                                </button>
                                <button onClick={() => { onConfirm(); setIsOpen(false) }} className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium shadow-lg shadow-red-500/30 transition-all active:scale-95">
                                    تأكيد الحفظ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>)}

            {open && !children && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-opacity duration-300">
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => { onCancel?.(); setIsOpen(false) }}
                    />
                    <div className="relative bg-white dark:bg-slate-800 w-full max-w-sm rounded-2xl shadow-2xl transform transition-all animate-in zoom-in-95 duration-200 p-6">
                        <div className="flex flex-col items-center text-center">

                            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                هل أنت متأكد؟
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-8">
                                {
                                    message
                                }
                            </p>

                            <div className="flex w-full gap-3">
                                <button onClick={() => { onCancel?.(); setIsOpen(false) }} className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                    إلغاء
                                </button>
                                <button onClick={() => { onConfirm(); setIsOpen(false) }} className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium shadow-lg shadow-red-500/30 transition-all active:scale-95">
                                    تأكيد الحفظ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>)}
        </>
    );
};

export default ConfirmCard;