"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Check, Leaf, ShoppingCart, Trash2, ArrowRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"

// Mock cart data
const cartItems = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 129.99,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
    ecoScore: 35,
    impact: {
      carbon: 12.5,
      plastic: 0.35,
      water: 120,
    },
    alternatives: [
      {
        id: 101,
        name: "Eco-Friendly Headphones",
        price: 149.99,
        ecoScore: 85,
        image: "/placeholder.svg?height=100&width=100",
        savings: {
          carbon: "65%",
          plastic: "90%",
          water: "40%",
        },
      },
    ],
  },
  {
    id: 2,
    name: "Cotton T-Shirt",
    price: 24.99,
    quantity: 2,
    image: "/placeholder.svg?height=100&width=100",
    ecoScore: 45,
    impact: {
      carbon: 5.2,
      plastic: 0.1,
      water: 2700,
    },
    alternatives: [
      {
        id: 201,
        name: "Organic Cotton T-Shirt",
        price: 29.99,
        ecoScore: 90,
        image: "/placeholder.svg?height=100&width=100",
        savings: {
          carbon: "40%",
          plastic: "100%",
          water: "80%",
        },
      },
    ],
  },
  {
    id: 3,
    name: "Plastic Water Bottle",
    price: 15.99,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
    ecoScore: 20,
    impact: {
      carbon: 6.3,
      plastic: 0.5,
      water: 80,
    },
    alternatives: [
      {
        id: 301,
        name: "Stainless Steel Water Bottle",
        price: 24.99,
        ecoScore: 95,
        image: "/placeholder.svg?height=100&width=100",
        savings: {
          carbon: "70%",
          plastic: "100%",
          water: "60%",
        },
      },
    ],
  },
]

export default function Cart() {
  const [cart, setCart] = useState(cartItems)
  const [activeTab, setActiveTab] = useState("cart")

  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const replaceWithEco = (itemId: number, alternativeId: number) => {
    // In a real app, this would make an API call to update the cart
    // For this demo, we'll just show a simulated replacement
    alert(`Item ${itemId} would be replaced with eco-alternative ${alternativeId}`)
  }

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalCarbon = cart.reduce((sum, item) => sum + item.impact.carbon, 0)
  const totalPlastic = cart.reduce((sum, item) => sum + item.impact.plastic, 0)
  const totalWater = cart.reduce((sum, item) => sum + item.impact.water, 0)

  // Calculate average eco score
  const avgEcoScore = cart.length ? Math.round(cart.reduce((sum, item) => sum + item.ecoScore, 0) / cart.length) : 0

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
        <p className="text-muted-foreground">Review your items and their environmental impact.</p>
      </div>

      <Tabs defaultValue="cart" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="cart">Cart Items</TabsTrigger>
          <TabsTrigger value="alternatives">Eco Alternatives</TabsTrigger>
        </TabsList>

        <TabsContent value="cart" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-[120px] h-[120px] bg-muted">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant={item.ecoScore > 70 ? "outline" : "secondary"} className="bg-muted">
                                <div className="flex items-center gap-1">
                                  <Leaf className="h-3 w-3 text-green-600" />
                                  <span>Eco Score: {item.ecoScore}/100</span>
                                </div>
                              </Badge>
                              {item.ecoScore < 50 && (
                                <span className="text-xs text-amber-600 flex items-center gap-1">
                                  <AlertTriangle className="h-3 w-3" />
                                  High Impact
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">${item.price.toFixed(2)}</div>
                            <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground mb-1">Carbon</div>
                            <div className="font-medium">{item.impact.carbon} kg CO₂</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground mb-1">Plastic</div>
                            <div className="font-medium">{item.impact.plastic} kg</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground mb-1">Water</div>
                            <div className="font-medium">{item.impact.water} L</div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>

                          {item.alternatives.length > 0 && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600"
                              onClick={() => setActiveTab("alternatives")}
                            >
                              View Alternatives
                              <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                    <p className="text-muted-foreground mb-4">
                      Start shopping to see your items and their environmental impact.
                    </p>
                    <Button asChild>
                      <a href="/">Continue Shopping</a>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${(subtotal * 0.08).toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${(subtotal * 1.08).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Checkout</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Environmental Impact</CardTitle>
                  <CardDescription>The total impact of your cart items</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Eco Score</span>
                        <span
                          className={`text-sm font-medium ${
                            avgEcoScore > 70 ? "text-green-600" : avgEcoScore > 40 ? "text-amber-600" : "text-red-600"
                          }`}
                        >
                          {avgEcoScore}/100
                        </span>
                      </div>
                      <Progress value={avgEcoScore} className="h-2" />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Carbon Footprint</span>
                          <span>{totalCarbon.toFixed(1)} kg CO₂</span>
                        </div>
                        <Progress value={60} className="h-1.5" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Plastic Waste</span>
                          <span>{totalPlastic.toFixed(2)} kg</span>
                        </div>
                        <Progress value={75} className="h-1.5" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Water Usage</span>
                          <span>{totalWater.toFixed(0)} L</span>
                        </div>
                        <Progress value={40} className="h-1.5" />
                      </div>
                    </div>

                    <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800 border border-amber-200">
                      <div className="flex gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                        <div>
                          <p className="font-medium">High Environmental Impact</p>
                          <p className="text-amber-700 mt-1">
                            Your cart has items with high environmental impact. Consider eco-friendly alternatives.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="alternatives" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Current Item</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4">
                        <div className="w-[80px] h-[80px] bg-muted">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="bg-muted">
                              <div className="flex items-center gap-1">
                                <Leaf className="h-3 w-3 text-green-600" />
                                <span>Eco Score: {item.ecoScore}/100</span>
                              </div>
                            </Badge>
                          </div>
                          <div className="mt-2 font-medium">${item.price.toFixed(2)}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {item.alternatives.map((alt) => (
                    <ProductCard
                      key={alt.id}
                      product={alt}
                      originalProduct={item}
                      onReplace={() => replaceWithEco(item.id, alt.id)}
                    />
                  ))}
                </div>
              ))}

              <div className="flex justify-center mt-6">
                <Button variant="outline" onClick={() => setActiveTab("cart")}>
                  Back to Cart
                </Button>
              </div>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Why Choose Eco Alternatives?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Leaf className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Reduced Carbon Footprint</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Eco-friendly alternatives typically produce less CO₂ during manufacturing and transportation.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Check className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Less Plastic Waste</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Sustainable products often use minimal or biodegradable packaging to reduce plastic pollution.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Check className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Water Conservation</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Eco-friendly manufacturing processes typically use less water and produce less water pollution.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800 border border-green-200 mt-4">
                    <p className="font-medium">Your Impact Matters</p>
                    <p className="mt-1 text-green-700">
                      By choosing eco-friendly alternatives, you can reduce your environmental footprint by up to 70%.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
