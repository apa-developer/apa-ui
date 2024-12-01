'use client'

import { cn } from '@/utils/cn'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

/**
 * Button component from Apa UI
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, ...props }) => (
    <button
        className={cn(
            'text-sm font-semibold shadow-[3px_3px_0_0_#000] border-2 border-black bg-sky-300 h-10 px-4 rounded hover:translate-x-[3px] hover:shadow-none hover:translate-y-[3px] transition-all',
            className
        )}
        {...props}
    >
        {children}
    </button>
))

export default Button
