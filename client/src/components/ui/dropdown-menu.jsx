"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const DropdownMenu = ({ children }) => {
  return (
    <div data-slot="dropdown-menu" className="relative inline-block">
      {children}
    </div>
  )
}

const DropdownMenuTrigger = ({ children, asChild }) => {
  return (
    <div data-slot="dropdown-menu-trigger">
      {children}
    </div>
  )
}

const DropdownMenuContent = ({ className, children, align = "end", isOpen, onClose }) => {
  const dropdownRef = React.useRef(null)

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose && onClose()
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const alignClasses = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0"
  }

  return (
    <div
      data-slot="dropdown-menu-content"
      ref={dropdownRef}
      className={cn(
        "absolute top-full z-50 mt-2 min-w-[12rem] overflow-hidden rounded-md border bg-white dark:bg-black p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        alignClasses[align],
        className
      )}
    >
      {children}
    </div>
  )
}

const DropdownMenuItem = ({ className, onClick, children, variant = "default" }) => {
  return (
    <div
      data-slot="dropdown-menu-item"
      onClick={onClick}
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-muted cursor-pointer",
        variant === "destructive" && "text-destructive focus:bg-destructive/10",
        className
      )}
    >
      {children}
    </div>
  )
}

const DropdownMenuLabel = ({ className, children }) => {
  return (
    <div className={cn("px-2 py-1.5 text-sm font-semibold", className)}>
      {children}
    </div>
  )
}

const DropdownMenuSeparator = ({ className }) => {
  return <div className={cn("-mx-1 my-1 h-px bg-muted", className)} />
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
}
