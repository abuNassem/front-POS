'use client';

import { useApi } from '@/context';

export default function OfflineBanner() {
  const { online } = useApi();

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

      <span
        className={`
          w-3
          h-3
          rounded-full
          ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}
        `}
      />

      <span className="text-sm font-medium">
        {isOnline ? 'متصل بالإنترنت' : 'أنت تعمل بوضع الأوفلاين'}
      </span>
    </div>
  );
}