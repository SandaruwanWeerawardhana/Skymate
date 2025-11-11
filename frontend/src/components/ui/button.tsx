import * as React from 'react'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', type = 'button', ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[hsl(256_65%_62%)] text-white hover:bg-[hsl(256_65%_55%)] ring-[hsl(256_65%_62%)] ring-offset-transparent'

    return (
      <button ref={ref} type={type} className={base + (className ? ` ${className}` : '')} {...props} />
    )
  }
)
Button.displayName = 'Button'

export default Button
