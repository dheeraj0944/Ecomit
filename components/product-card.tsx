"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Leaf, Check } from "lucide-react"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    ecoScore: number
    image: string
    savings: {
      carbon: string
      plastic: string
      water: string
    }
  }
  originalProduct: {
    id: number
    name: string
    price: number
  }
  onReplace: () => void
}

export function ProductCard({ product, originalProduct, onReplace }: ProductCardProps) {
  const priceDifference = product.price - originalProduct.price

  return (
    <Card className="border-green-200 bg-green-50">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-[120px] h-[120px] bg-white rounded-md overflow-hidden">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200 mb-2">
                  <Leaf className="h-3 w-3 mr-1" />
                  Eco Alternative
                </Badge>
                <h3 className="font-semibold text-green-900">{product.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="bg-white border-green-200">
                    <div className="flex items-center gap-1">
                      <Leaf className="h-3 w-3 text-green-600" />
                      <span className="text-green-800">Eco Score: {product.ecoScore}/100</span>
                    </div>
                  </Badge>
                </div>
              </div>

              <div className="text-right">
                <div className="font-semibold text-green-900">${product.price.toFixed(2)}</div>
                <div className={`text-xs ${priceDifference > 0 ? "text-amber-600" : "text-green-600"}`}>
                  {priceDifference > 0
                    ? `+$${priceDifference.toFixed(2)} more`
                    : priceDifference < 0
                      ? `-$${Math.abs(priceDifference).toFixed(2)} less`
                      : "Same price"}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-md p-2 text-center">
                <div className="text-green-800 font-medium">{product.savings.carbon}</div>
                <div className="text-xs text-green-700">Less Carbon</div>
              </div>
              <div className="bg-white rounded-md p-2 text-center">
                <div className="text-green-800 font-medium">{product.savings.plastic}</div>
                <div className="text-xs text-green-700">Less Plastic</div>
              </div>
              <div className="bg-white rounded-md p-2 text-center">
                <div className="text-green-800 font-medium">{product.savings.water}</div>
                <div className="text-xs text-green-700">Less Water</div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center text-sm text-green-700">
                <Check className="h-4 w-4 mr-1" />
                Sustainable materials
              </div>

              <Button className="bg-green-600 hover:bg-green-700" onClick={onReplace}>
                Replace with This
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
