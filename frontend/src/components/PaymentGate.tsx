import React from 'react'
import { MagicCard } from './magicui/magic-card'
import { useTheme } from './ThemeProvider'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { getCookie } from '@/lib/getUser'
const PaymentGate = () => {
  const user = getCookie('user');
  const { theme } = useTheme();
  return (
    <div className="flex mx-auto items-center justify-center flex-col min-h-[90vh]">
      <MagicCard
        className="cursor-pointer w-[600px] h-[300px] flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl"
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
      >
        <h1 className='tracking-tighter text-4xl font-bold'>Total Payment</h1>
        <Separator className='w-full my-2' />
        <div className='grid gap-4 grid-cols-2 text-xl items-center justify-center text-center'>
          <h4>MRP</h4>
          <p>$300</p>
          <h4>GST</h4>
          <p>${300 * 5 / 100}</p>
          <Separator />
          <Separator />
          <h4>Total</h4>
          <p>${300 + 300 * 5 / 100}</p>
        </div>
      </MagicCard>
    </div>
  )
}

export default PaymentGate
