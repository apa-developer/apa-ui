'use client'

import { forwardRef } from 'react'

/**
 * Button component from Apa UI
 */
const Button = forwardRef(({ children, className, ...props }) => (
    <button
        className={`text-sm font-semibold shadow-[3px_3px_0_0_#000] border-2 border-black bg-sky-300 h-10 px-4 rounded hover:translate-x-[3px] hover:shadow-none hover:translate-y-[3px] transition-all ${className}`}
        {...props}
    >
        {children}
    </button>
))

export default Button
