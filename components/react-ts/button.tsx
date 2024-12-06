'use client'

import React from 'react'
import { cn } from '@/utils/cn'
import { cva, type VariantProps } from "class-variance-authority"


const variants = cva('h-10 flex justify-center items-center rounded border-2 border-black bg-sky-300 text-sm font-semibold shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none', {
    variants: {
        iconPosition: {
            left: 'flex-row',
            right: 'flex-row-reverse'
        },
        variant: {
            textOnly: 'justify-center px-4', 
            iconOnly: 'w-10',
            textAndIcon: 'gap-2 px-2'
        }
    },
    defaultVariants: {
        iconPosition: 'left',
        variant: 'textOnly'
    }
})

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof variants> {
    children: React.ReactNode,
    className?: string,
    variant?: 'textOnly' | 'iconOnly' | 'textAndIcon',
    iconPosition?: 'left' | 'right'
}

/**
 * Button component from Apa UI
 */
const Button = ({ children, className, variant, iconPosition, ...props }: ButtonProps) => {
    return (
        <button
            className={cn(variants({variant, iconPosition, className}))}
            {...props}
        >   
     {children}
        </button>
    )
}

export default Button
