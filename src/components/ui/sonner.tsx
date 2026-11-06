"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

/**
 * SPARK toaster. Unstyled sonner: every toast is a <ToastCard/> so static
 * samples and live toasts are the same component. Toasts stack at the
 * inline-end corner (where the cart lives in RTL); full-width on phones.
 */
function Toaster(props: ToasterProps) {
  return (
    <Sonner
      dir="rtl"
      theme="dark"
      position="bottom-left"
      gap={8}
      offset={24}
      mobileOffset={16}
      visibleToasts={3}
      containerAriaLabel="התראות"
      toastOptions={{ unstyled: true, classNames: { toast: "w-full sm:w-[360px]" } }}
      {...props}
    />
  )
}

export { Toaster }
