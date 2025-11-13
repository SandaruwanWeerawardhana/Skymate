import * as React from 'react'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', type = 'text', ...props }, ref) => {
    const base =
      'flex h-10 w-full rounded-md bg-[hsl(217_20%_24%)] px-4 py-2 text-white placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(256_65%_62%)] disabled:cursor-not-allowed disabled:opacity-50 border-0'

    return <input ref={ref} type={type} className={base + (className ? ` ${className}` : '')} {...props} />
  }
)
Input.displayName = 'Input'

export default Input
