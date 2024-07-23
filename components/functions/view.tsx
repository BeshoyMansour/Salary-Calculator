import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { ActivityIcon, CreditCardIcon, DollarSignIcon, UsersIcon } from "lucide-react"
import { PieChart } from '@mui/x-charts/PieChart';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { invoices } from "./dummyData"
import { Badge } from "@/components/ui/badge"
import { CalendarDays } from 'lucide-react';
import { CirclePercent } from 'lucide-react';

import { useAtom } from 'jotai'
import { salaryBreakdownAtom } from '@/components/atoms/toolsAtoms' // Import the atom
// import { CashCardX as CashCard } from '@/components/x/calc/CashCards'
// import { SalaryBreakdownTable, LapTable } from '@/components/x/calc/CalcTables'
// import { SalaryBreakdownPie, TaxStackedBarChart } from '@/components/x/calc/CalcCharts'
// import {salaryBreakdown} from '@/components/functions/salFuc'

export function Cardview() {
  const [salaryBreakdown] = useAtom(salaryBreakdownAtom)

  if (!salaryBreakdown) {
    return null
  }

  const finalPayment = salaryBreakdown.finalPayment
  const taxes = salaryBreakdown.totalTax
  const insurance = salaryBreakdown.socialInsurance


const data = [
  { id: 0, value: finalPayment, label: "Net Salary", color: 'red' },
  { id: 1, value: taxes, label: 'Tax' },
  { id: 2, value: insurance, label: 'Insurance' },
];





  return (
  
      <main className="flex flex-1 flex-col w-full gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-center">
            <Badge className="mr-2" ><CirclePercent className="size-4 mr-2"/> Tax Tier: {salaryBreakdown.taxTier} </Badge>
            <Badge ><CalendarDays className="size-4 mr-2"/> Next LAP: {salaryBreakdown.nextLapMonths} Mos</Badge>
          </div>
          
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Gross</CardTitle>
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{salaryBreakdown.totalGross}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tax</CardTitle>
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{salaryBreakdown.totalTax}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Basic Salary</CardTitle>
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{salaryBreakdown.netBasic}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Final Payment</CardTitle>
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{salaryBreakdown.finalPayment}</div>
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bonus</CardTitle>
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{salaryBreakdown.totalBonus}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Lap Amount</CardTitle>
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{salaryBreakdown.nextLapAmount}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gross Daily Rate</CardTitle>
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{salaryBreakdown.grossDailyRate}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gross Alloc. Day</CardTitle>
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{salaryBreakdown.grossAllocationDailyRate}</div>
            </CardContent>
          </Card>

          </div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">

            <div className="border-r-4 ">
              <span className="text-3xl">Salary BreakDown</span>
          <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Months</TableHead>
          <TableHead>Gross</TableHead>
          <TableHead>Tax/Deduction</TableHead>
          <TableHead className="">Approx. Net</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        
          <TableRow >
            <TableCell className="font-medium">Salary</TableCell>
            <TableCell>{salaryBreakdown.totalGross}</TableCell>
            <TableCell>{salaryBreakdown.totalTax}</TableCell>
            <TableCell className="">{salaryBreakdown.netBasic}</TableCell>
          </TableRow>

          <TableRow >
            <TableCell className="font-medium">Allocation</TableCell>
            <TableCell>{salaryBreakdown.grossAllocations}</TableCell>
            <TableCell>{salaryBreakdown.allocationsTax}</TableCell>
            <TableCell className="">{salaryBreakdown.netAllocations}</TableCell>
          </TableRow>

          <TableRow >
            <TableCell className="font-medium">Bonus</TableCell>
            <TableCell>{salaryBreakdown.grossBonus}</TableCell>
            <TableCell>{salaryBreakdown.bonusTax}</TableCell>
            <TableCell className="">{salaryBreakdown.netBonus}</TableCell>
          </TableRow>
          
          <TableRow >
            <TableCell className="font-medium">LAP</TableCell>
            <TableCell>{salaryBreakdown.grossLAP}</TableCell>
            <TableCell>{salaryBreakdown.LAPTax}</TableCell>
            <TableCell className="">{salaryBreakdown.netLAP}</TableCell>
          </TableRow>

          <TableRow >
            <TableCell className="font-medium">Adjustments</TableCell>
            <TableCell>{salaryBreakdown.grossAdjustments}</TableCell>
            <TableCell>{salaryBreakdown.adjustmentsTax}</TableCell>
            <TableCell className="">{salaryBreakdown.netAdjustments}</TableCell>
          </TableRow>

          <TableRow >
            <TableCell className="font-medium">Social Insurance</TableCell>
            <TableCell>0</TableCell>
            <TableCell>{salaryBreakdown.socialInsurance}</TableCell>
            <TableCell className="">{salaryBreakdown.socialInsurance}</TableCell>
          </TableRow>

          <TableRow >
            <TableCell className="font-medium">Salary</TableCell>
            <TableCell>{salaryBreakdown.totalGross}</TableCell>
            <TableCell>{salaryBreakdown.totalTax}</TableCell>
            <TableCell className="">{salaryBreakdown.netBasic}</TableCell>
          </TableRow>
        
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="">{salaryBreakdown.finalPayment}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </div>
        <div className="border-l-4">
          <PieChart 
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={350}
      
    />
    </div>  
          </div>
      </main>

  )
}










