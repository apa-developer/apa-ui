'use client'

import { cn } from '@/utils/cn'

/**
 * Input component from Apa UI
 */
const Input = ({ className, ...props }) => {
    return (
        <input
            {...props}
            className={cn(
                'flex h-10 items-center justify-center rounded border-2 border-black px-2 text-sm font-semibold shadow-[3px_3px_0_0_#000] transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none focus:outline-none',
                className
            )}
        />
    )
}

export default Input