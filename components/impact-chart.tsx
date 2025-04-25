"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ImpactChartProps {
  data: {
    month: string
    carbon: number
  }[]
}

export function ImpactChart({ data }: ImpactChartProps) {
  return (
    <ChartContainer
      config={{
        carbon: {
          label: "Carbon (kg CO₂)",
          color: "hsl(142.1 76.2% 36.3%)",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Bar dataKey="carbon" radius={[4, 4, 0, 0]} />
          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
