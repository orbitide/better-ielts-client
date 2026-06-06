"use client"

import React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import type { VariantProps } from "class-variance-authority"
import { buttonVariants } from "./button-variants"

import { cn } from "@/lib/utils"

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }

function Button({
  className,
  variant = "default",
  size = "default",
  asChild,
  children,
  ...props
}: ButtonProps) {
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<Record<string, unknown>>
    const { className: childClassName, onClick: childOnClick, ...childProps } = child.props
    const { onClick: propsOnClick, ...restProps } = props as Record<string, unknown>
    return React.cloneElement(child, {
      className: cn(buttonVariants({ variant, size, className }), childClassName as string | undefined),
      onClick: (e: unknown) => {
        ;(propsOnClick as ((e: unknown) => void) | undefined)?.(e)
        ;(childOnClick as ((e: unknown) => void) | undefined)?.(e)
      },
      ...restProps,
      ...childProps,
    })
  }
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
