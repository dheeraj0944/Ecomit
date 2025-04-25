import { Card, CardContent } from "@/components/ui/card"
import type { ReactNode } from "react"

interface EcoTipProps {
  title: string
  description: string
  icon: ReactNode
}

export function EcoTip({ title, description, icon }: EcoTipProps) {
  return (
    <Card className="border-l-4 border-l-green-500">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="mt-0.5">{icon}</div>
          <div>
            <h4 className="font-medium mb-1">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
