import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants>{
    children: ReactNode
}

const buttonVariants = tv({
    base: 'font-semibold flex items-center justify-center gap-2 hover:animate-pulse ',
    variants: {
        button: {
            square: 'rounded-md h-10 px-4',
            ball: 'rounded-full size-10'
        },
        variant: {
            primary: 'bg-lime-400 text-lime-950 hover:bg-lime-500 ',
            secondary: 'bg-zinc-500 text-zinc-100 hover:bg-zinc-600',
            tertiary: 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-50/10'
        },
        size: {
            default: 'py-2',
            full: 'w-full'
        },
    },
    defaultVariants: {
        button: 'square',
        variant: 'primary',
        size: 'default',
    }

})

export function Button({children,button, variant, size, ...props}: ButtonProps){

    return(
        <button {...props} className={buttonVariants({button, variant, size})}>
            {children}
        </button>
    )
}