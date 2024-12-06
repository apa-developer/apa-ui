'use client'

import { cn } from '@/utils/cn'
import { Check } from 'lucide-react'
import { useState } from 'react'

export default function Checkbox({ label }: { label: string }) {
    const [isChecked, setIsChecked] = useState(false)

    return (
        <button
            onClick={() => {
                setIsChecked(!isChecked)
            }}
            className="flex items-center"
            role="checkbox"
            aria-checked={isChecked}
        >
            <div
                className={cn(
                    'mr-2 flex h-[26px] w-[26px] items-center justify-center rounded border-2 border-black bg-white transition-all',
                    isChecked ? 'translate-x-[2px] translate-y-[2px] shadow-none' : 'shadow-[2px_2px_0_0_#000]'
                )}
            >
                {isChecked && <Check className="h-6 w-6" strokeWidth={3} />}
            </div>
            <p className="text-black">{label}</p>
        </button>
    )
}
