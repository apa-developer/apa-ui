import { cn } from '@/utils/cn'
import * as React from 'react'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground flex h-10 w-full rounded-md border-2 border-black px-3 py-2 text-base shadow-[2px_2px_0_0_#000] transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = 'Input'

export { Input }
