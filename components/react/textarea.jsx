'use client';

import { cn } from "@/utils/cn";

/**
 * TextArea component from Apa UI
 */
export default function TextArea({ className, ...props }) {
  return (
    <textarea
      {...props}
      className={cn(
        'h-32 w-full px-2 py-2 focus:outline-none flex justify-center items-center rounded border-2 border-black text-sm font-semibold shadow-[3px_3px_0_0_#000] transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none',
        className
      )}
    ></textarea>
  );
}
