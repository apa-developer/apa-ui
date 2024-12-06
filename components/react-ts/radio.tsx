'use client';

import { cn } from "@/utils/cn";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
}

/**
 * RadioGroup component from Apa UI
 */
export default function RadioGroup({ options, value, onChange }: RadioGroupProps) {
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
              'mr-2 flex items-center justify-center h-[26px] w-[26px] bg-white border-2 border-black rounded-full transition-all',
              value === option.value
                ? 'translate-x-[2px] translate-y-[2px] shadow-none'
                : 'shadow-[2px_2px_0_0_#000]'
            )}
          >
            {value === option.value && (
              <div className="h-3 w-3 bg-black rounded-full" />
            )}
          </div>
          <p className="text-black text-sm font-semibold ">{option.label}</p>
        </button>
      ))}
    </div>
  );
}
