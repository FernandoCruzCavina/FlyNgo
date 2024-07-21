import { X } from "lucide-react";
import { ComponentProps, ReactNode } from "react";
import { Button } from "./button";
import { tv, VariantProps } from "tailwind-variants";

interface ModalProps extends VariantProps<typeof modalVariants>, ComponentProps<'button'>{
    title: string
    children: ReactNode
}

const modalVariants = tv({

    base: 'justify-center py-2 space-y-4',
    variants: {
        variant:{
            primary: 'items-start ',
            secondary: 'items-center',
            tertiary: 'items-end'
        },
        size: {
            default: 'w-auto h-auto',
            custom: 'w-[100%] h-[100%]'
        }
    },
    defaultVariants: {
        variant: 'primary',
        size: 'default'
    }
})

export function Modal({title, children, variant, size, ...props}: ModalProps){
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 space-y-3 shadow-shape bg-zinc-900">
            <div className="flex justify-between items-center">
              <p className="font-bold text-2xl">{title}</p>
              <Button {...props} button="ball" variant="tertiary">
                <X/>
              </Button>
            </div>
            <div className={modalVariants({variant, size})}>
                {children}
            </div>
          </div>
        </div>
    )
}