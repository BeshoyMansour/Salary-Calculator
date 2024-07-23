"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
// import { format } from "util";
import { format } from "date-fns"

import { cn } from "@/lib/utils";
import { Cardview } from "@/components/functions/view";
import { salaryBreakdownAtom } from "../atoms/toolsAtoms";
import { useAtom } from "jotai";
import { useState } from "react";

const formSchema = z.object({
  startingDate: z.date({
    required_error: "A date of Hiring is required.",
  }),
  gross: z.coerce.number({
    required_error: "Gross income is required.",
  }),
  grossBonus: z.coerce.number().optional(),
  allocations: z.coerce.number().optional(),
  lap: z.coerce.number().optional(),
  deductions: z.coerce.number().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function FormView() {

    const [, setSalaryBreakdown] = useAtom(salaryBreakdownAtom)
//   const [salarySettings] = useAtom(salarySettingsAtom)

const [isLoading, setIsLoading] = useState(false)


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deductions: 0,
      gross: 0,
      grossBonus: 0,
      lap: 0,
      allocations: 0,
    },
  });

 async function onSubmit(values: FormData) {
    setIsLoading(true)
    const registrationResult = await fetch('/api/tools/calc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
        }),
      })

      const responseBody = await registrationResult.json()
      setSalaryBreakdown(responseBody)

      console.log(responseBody)
  
      setIsLoading(false)
  }

  return (
    <main className="flex pt-5 min-h-[400px] items-center w-full flex-col gap-4 md:p-8 lg:gap-6">
      <div className="w-full">
        {/* <span className="ml-7 text-xl font-bold uppercase ">
          Enter the values
        </span> */}
      </div>
      <div className="grid w-[50%] items-center gap-6 overflow-auto p-4 pt-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="items-center">
            <div className="grid grid-cols-2 gap-4 rounded-lg border p-4 md:grid-cols-3 xl:grid-cols-3 " >
            <FormField
          control={form.control}
          name="startingDate"
          render={({ field }) => (
  <FormItem className="grid">
             <FormLabel>Hiring Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value,"PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            
              <FormMessage />
            </FormItem>
          )}
        />

              <FormField
                control={form.control}
                name="gross"
                render={({ field }) => (
                  <FormItem className="grid">
                    <FormLabel>Gross Salary</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="grossBonus"
                render={({ field }) => (
                  <FormItem className="grid ">
                    <FormLabel>Gross Bonus</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lap"
                render={({ field }) => (
                  <FormItem className="grid ">
                    <FormLabel>LAP</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deductions"
                render={({ field }) => (
                  <FormItem className="grid">
                    <FormLabel>Deductions</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                   
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="allocations"
                render={({ field }) => (
                  <FormItem className="grid">
                    <FormLabel>Allocations</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                   
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center">
            <Button variant={"outline"} className="mt-5 justify-center md:w-64" type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>

  
      

    </main>
  );
}
