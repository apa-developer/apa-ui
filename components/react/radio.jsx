'use client'

import { cn } from '../utils/cn'

/**
 * RadioGroup component from Apa UI
 */
export default function RadioGroup({ options, value, onChange }) {
    return (
        <div className="flex flex-col space-y-2">
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    className="flex items-center"
                    role="radio"
                    aria-checked={value === option.value}
                >
                    <div
                        className={cn(
                            'mr-2 flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 border-black bg-white transition-all',
                            value === option.value
                                ? 'translate-x-[2px] translate-y-[2px] shadow-none'
                                : 'shadow-[2px_2px_0_0_#000]'
                        )}
                    >
                        {value === option.value && <div className="h-3 w-3 rounded-full bg-black" />}
                    </div>
                    <p className="text-sm font-semibold text-black">{option.label}</p>
                </button>
            ))}
        </div>
    )
}
