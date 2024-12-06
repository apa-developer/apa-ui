'use client'

import { cn } from '@/utils/cn'
import { Check } from 'lucide-react'
import { useState } from 'react'

export default function Checkbox({ label }) {
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
      <div className={cn("mr-2 flex items-center justify-center h-[26px] w-[26px] bg-white border-2 border-black rounded transition-all", isChecked ? "translate-x-[2px] translate-y-[2px] shadow-none" : "shadow-[2px_2px_0_0_#000]")}>
        {isChecked && <Check className="h-6 w-6" strokeWidth={3} />}
      </div>
      <p className="text-black">{label}</p>
    </button>
  )
}