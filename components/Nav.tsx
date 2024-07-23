"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { useTheme } from 'next-themes'
import { Moon, Sun } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState,  } from 'react';
import { cn } from '@/lib/utils'

const Nav = () => {
    
    const {theme, setTheme } = useTheme();



  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <h1 className="text-xl font-bold">Calulcate your Income</h1>
    </div>

    
        <Button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        variant="ghost" size="icon"
        className={cn(
          'h-9 w-9 rounded-3xl border',
        )}>
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100"/>
          <span className="sr-only">Toggle theme</span>
        </Button>
   

  </header>
  )
}

export default Nav