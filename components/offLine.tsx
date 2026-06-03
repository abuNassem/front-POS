'use client';

import { useApi } from '@/context';

export default function OfflineBanner() {
  const { online } = useApi();

  // تحويل القيمة إلى boolean للتأكد من صحة الشرط
  const isOnline = Boolean(online);

  return (
    <div
      className="
      
        flex
        items-center
        gap-2
        bg-white
        dark:bg-zinc-900
        text-slate-800
        dark:text-slate-200
        py-2
        px-3
    
        direction-rtl
      "
    >
      {/* الدائرة التي يتغير لونها ديناميكيًا */}
      <span
        className={`
          w-3
          h-3
          rounded-full
          ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}
        `}
      />
      
      {/* النص المصاحب لحالة الاتصال */}
      <span className="text-sm font-medium">
        {isOnline ? 'متصل بالإنترنت' : 'أنت تعمل بوضع الأوفلاين'}
      </span>
    </div>
  );
}