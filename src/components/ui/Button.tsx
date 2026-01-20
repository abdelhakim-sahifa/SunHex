import * as React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-md font-bold transition-all disabled:opacity-50 disabled:pointer-events-none active:scale-95',
                    {
                        'bg-accent-gradient text-bg-primary hover:shadow-[0_0_20px_rgba(0,255,157,0.3)]': variant === 'primary',
                        'bg-bg-secondary text-text-primary border border-border hover:border-accent-primary/50': variant === 'secondary',
                        'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-secondary': variant === 'ghost',
                        'bg-transparent border-2 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-bg-primary': variant === 'outline',
                    },
                    {
                        'px-4 py-2 text-sm': size === 'sm',
                        'px-6 py-3 text-base': size === 'md',
                        'px-8 py-4 text-lg': size === 'lg',
                    },
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export { Button };
