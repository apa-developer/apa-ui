'use client'

export default function Button({ className, children, onClick }) {
    return (
        <button
            role="button"
            aria-label="Click to perform an action"
            onClick={onClick}
            className={`text-sm font-semibold shadow-[3px_3px_0_0_#000] border-2 border-black bg-sky-300 h-[35px] px-4 rounded hover:translate-x-[3px] hover:shadow-none hover:translate-y-[3px] transition-all ${className}`}
        >
            {children}
        </button>
    )
}
