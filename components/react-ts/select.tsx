'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/utils/cn'
import { ChevronDown, Check } from 'lucide-react'

interface SelectProps {
    options: { label: string; value: string }[]
    placeholder?: string
    onChange?: (values: string[]) => void
    className?: string
    isMultiSelect?: boolean
    isSearchable?: boolean
}

const Select = ({
    options,
    placeholder = 'Select...',
    onChange,
    className,
    isMultiSelect = false,
    isSearchable = false,
}: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValues, setSelectedValues] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const dropdownRef = useRef<HTMLDivElement>(null)

    const handleSelect = (value: string) => {
        if (isMultiSelect) {
            const newValues = selectedValues.includes(value)
                ? selectedValues.filter((v) => v !== value)
                : [...selectedValues, value]
            setSelectedValues(newValues)
            if (onChange) onChange(newValues)
        } else {
            setSelectedValues([value])
            setIsOpen(false)
            if (onChange) onChange([value])
        }
    }

    const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchQuery.toLowerCase()))

    // Handle clicks outside the dropdown
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        if (isOpen) {
            addEventListener('mousedown', handleClickOutside)
        } else {
            removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    return (
        <div className={cn('relative inline-block w-64', className)} ref={dropdownRef}>
            <button
                className={cn(
                    'flex h-10 w-full items-center justify-between rounded border-2 border-black bg-white px-4 text-sm font-semibold shadow-[3px_3px_0_0_#000] transition-all',
                    isOpen
                        ? 'translate-x-[3px] translate-y-[3px] shadow-none'
                        : 'hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none'
                )}
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span>
                    {selectedValues.length > 0
                        ? options
                              .filter((o) => selectedValues.includes(o.value))
                              .map((o) => o.label)
                              .join(', ')
                        : placeholder}
                </span>
                <ChevronDown className="ml-2 h-4 w-4" />
            </button>

            {isOpen && (
                <div className="absolute right-0 left-0 z-10 mt-2 max-h-60 overflow-auto rounded border-2 border-black bg-white shadow-[3px_3px_0_0_#000]">
                    {isSearchable && (
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full border-b-2 border-black px-4 py-2 text-sm focus:outline-none"
                        />
                    )}
                    <ul role="listbox">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <li
                                    key={option.value}
                                    className={cn(
                                        'flex cursor-pointer items-center justify-between px-4 py-2 text-sm hover:bg-sky-200',
                                        selectedValues.includes(option.value) && 'bg-sky-300'
                                    )}
                                    role="option"
                                    aria-selected={selectedValues.includes(option.value)}
                                    onClick={() => handleSelect(option.value)}
                                >
                                    <span>{option.label}</span>
                                    {selectedValues.includes(option.value) && <Check className="h-4 w-4" />}
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-sm text-gray-500">No options found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Select
