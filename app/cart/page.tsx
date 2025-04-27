"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Check, Leaf, ShoppingCart, Trash2, ArrowRight, ExternalLink, Chrome } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"

// Amazon product links
const amazonProducts = [
  {
    id: 1,
    name: "WaveX Microfiber Car Cleaning Cloths",
    description: "Ultra-Thick Cars Drying Towel Microfiber Cloth for Car and Home",
    image: "/a1.png",
    link: "https://www.amazon.in/WaveX-Microfiber-Ultra-Thick-Polishing-Detailing/dp/B0B93WRK75/ref=pd_bxgy_thbs_d_sccl_2/262-9519462-7092958?pd_rd_w=eeEOy&content-id=amzn1.sym.d1afc5d3-2e83-45f5-8382-2dc0d946ef8f&pf_rd_p=d1afc5d3-2e83-45f5-8382-2dc0d946ef8f&pf_rd_r=SXK4VGGM7CMJ5HYKVNF3&pd_rd_wg=2zsvS&pd_rd_r=a71554e3-4aab-43ed-a78c-ffe959687ae6&pd_rd_i=B0B93WRK75&th=1",
    ecoScore: 45,
    alternatives: [
      {
        id: 101,
        name: "Organic Cotton Cleaning Cloths",
        description: "100% natural cotton, grown without harmful chemicals. Fully biodegradable and compostable.",
        link: "https://www.amazon.in/Generic-Cleaning-Cotton-Clothes-24cmx24cm/dp/B08JKDCF8T/ref=sr_1_4?dib=eyJ2IjoiMSJ9.Y5faRCqrgzXKX8W-_n6jSM3dLESpqz22TyD7M_E1hCeZVOV4aIOZ9fNTsfu6mxxttakktgLd6YxKYlJa0hYDiWD_34cEAiN08npDkJi77fnHh2g2ho0pDB_z0NLWj6JWF8i_ORtSSxAom7XQwFDaIEszqIqfR88QSnb3ecCgcRQrOQkIlqk7ECPPgGSLIrd7WQd11-aIU2AhyTbrQq0hVbpuKg_4MEg6g1BJnaOZKc0.w_rypotEN5W1QAY8eUpzZ-nZdwM8QRisgTPW5OT4hF4&dib_tag=se&qid=1745644722&refinements=p_n_material_browse%3A3249578031&s=home-improvement&sr=1-4",
        ecoScore: 90,
        pros: [
          "Fully biodegradable and compostable",
          "Gentle on surfaces and skin",
          "Can be reused and washed many times"
        ],
        bestFor: "General cleaning, wiping, drying"
      },
      {
        id: 102,
        name: "Bamboo Fiber Cloths",
        description: "Sustainably harvested bamboo pulp. Naturally antibacterial and odor-resistant.",
        link: "https://www.amazon.in/Mush-Bamboo-Reusable-Magic-Cleaning/dp/B09TFMW2SK/ref=sr_1_6?crid=BWKCWI0KQUBC&dib=eyJ2IjoiMSJ9.FpP24OyTwdWbTTRNoopaeJMz0jZqHU3lc5iHsCcf0oMzjxAAV_E6jE7ljZWj1XoOmG8NBzV9JuHbV6GzAwRK0yycwCaJPEAYCsb13AQo_TLJELQF8C1COrjPy6MJKZ0trY_N8lznYY5Qbf4uIwC8E0aseqcJzA9XfSaT771rGeF3b1wViRVn96pEP4nAtrnMWli3uwpSg6x3F7UF22wtm9-bPyjPpOCCMlYcXsn2lToStIa0puiSFm_KSj6z0FsV5jV6rbmwDisNxGJZQoHphMlNL4SPG7LSK_DTSpu2SP0.i4vvew4SS2ITPIEwl65eEWZsUEMetW4HSj8yhVeUxT0&dib_tag=se&keywords=bamboo+fibre+clothes&qid=1745644977&sprefix=bamboo+fibre+cloth%2Caps%2C256&sr=8-6",
        ecoScore: 95,
        pros: [
          "Naturally antibacterial and odor-resistant",
          "Biodegradable and eco-friendly",
          "Soft but durable"
        ],
        bestFor: "Kitchen use, dusting, polishing"
      }
    ]
  },
  {
    id: 2,
    name: "WaveX Perfect Microfiber Towel",
    description: "Super Absorbing Microfiber Cloth for Car and Home Cleaning",
    image: "/a2.png",
    link: "https://www.amazon.in/WaveX-Perfect-Microfiber-Absorbing-Cleaning/dp/B0CNSYF5HS/ref=pd_sim_d_sccl_4_2/262-9519462-7092958?pd_rd_w=YI492&content-id=amzn1.sym.1f02df7f-f362-4e6d-9a92-f270d75713e4&pf_rd_p=1f02df7f-f362-4e6d-9a92-f270d75713e4&pf_rd_r=30BXT5BRQ92MD3X3CAEH&pd_rd_wg=mYiI3&pd_rd_r=48baebd3-da0a-478f-aaa6-377dff459853&pd_rd_i=B0CNSYF5HS&psc=1",
    ecoScore: 40,
    alternatives: [
      {
        id: 201,
        name: "Organic Cotton Cleaning Cloths",
        description: "100% natural cotton, grown without harmful chemicals. Fully biodegradable and compostable.",
        link: "https://www.amazon.in/Generic-Cleaning-Cotton-Clothes-24cmx24cm/dp/B08JKDCF8T/ref=sr_1_4?dib=eyJ2IjoiMSJ9.Y5faRCqrgzXKX8W-_n6jSM3dLESpqz22TyD7M_E1hCeZVOV4aIOZ9fNTsfu6mxxttakktgLd6YxKYlJa0hYDiWD_34cEAiN08npDkJi77fnHh2g2ho0pDB_z0NLWj6JWF8i_ORtSSxAom7XQwFDaIEszqIqfR88QSnb3ecCgcRQrOQkIlqk7ECPPgGSLIrd7WQd11-aIU2AhyTbrQq0hVbpuKg_4MEg6g1BJnaOZKc0.w_rypotEN5W1QAY8eUpzZ-nZdwM8QRisgTPW5OT4hF4&dib_tag=se&qid=1745644722&refinements=p_n_material_browse%3A3249578031&s=home-improvement&sr=1-4",
        ecoScore: 90,
        pros: [
          "Fully biodegradable and compostable",
          "Gentle on surfaces and skin",
          "Can be reused and washed many times"
        ],
        bestFor: "General cleaning, wiping, drying"
      },
      {
        id: 202,
        name: "Bamboo Fiber Cloths",
        description: "Sustainably harvested bamboo pulp. Naturally antibacterial and odor-resistant.",
        link: "https://www.amazon.in/Mush-Bamboo-Reusable-Magic-Cleaning/dp/B09TFMW2SK/ref=sr_1_6?crid=BWKCWI0KQUBC&dib=eyJ2IjoiMSJ9.FpP24OyTwdWbTTRNoopaeJMz0jZqHU3lc5iHsCcf0oMzjxAAV_E6jE7ljZWj1XoOmG8NBzV9JuHbV6GzAwRK0yycwCaJPEAYCsb13AQo_TLJELQF8C1COrjPy6MJKZ0trY_N8lznYY5Qbf4uIwC8E0aseqcJzA9XfSaT771rGeF3b1wViRVn96pEP4nAtrnMWli3uwpSg6x3F7UF22wtm9-bPyjPpOCCMlYcXsn2lToStIa0puiSFm_KSj6z0FsV5jV6rbmwDisNxGJZQoHphMlNL4SPG7LSK_DTSpu2SP0.i4vvew4SS2ITPIEwl65eEWZsUEMetW4HSj8yhVeUxT0&dib_tag=se&keywords=bamboo+fibre+clothes&qid=1745644977&sprefix=bamboo+fibre+cloth%2Caps%2C256&sr=8-6",
        ecoScore: 95,
        pros: [
          "Naturally antibacterial and odor-resistant",
          "Biodegradable and eco-friendly",
          "Soft but durable"
        ],
        bestFor: "Kitchen use, dusting, polishing"
      }
    ]
  }
]

// Mock cart data with realistic values
const cartItems = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 4999,
    quantity: 1,
    image: "/i6.jpg",
    ecoScore: 35,
    impact: {
      carbon: 2.5,
      plastic: 0.15,
      water: 25,
    },
    alternatives: [
      {
        id: 101,
        name: "Eco-Friendly Headphones",
        price: 5999,
        ecoScore: 85,
        image: "/i4.jpg",
        savings: {
          carbon: "45%",
          plastic: "60%",
          water: "40%",
        },
      },
    ],
  },
  {
    id: 2,
    name: "Cotton T-Shirt",
    price: 799,
    quantity: 2,
    image: "/i7.jpg",
    ecoScore: 45,
    impact: {
      carbon: 1.2,
      plastic: 0.05,
      water: 270,
    },
    alternatives: [
      {
        id: 201,
        name: "Organic Cotton T-Shirt",
        price: 999,
        ecoScore: 90,
        image: "https://images.pexels.com/photos/6311251/pexels-photo-6311251.jpeg?auto=compress&cs=tinysrgb&w=600",
        savings: {
          carbon: "30%",
          plastic: "100%",
          water: "50%",
        },
      },
    ],
  },
  {
    id: 3,
    name: "Plastic Water Bottle",
    price: 299,
    quantity: 1,
    image: "/i1.jpg",
    ecoScore: 20,
    impact: {
      carbon: 0.3,
      plastic: 0.2,
      water: 8,
    },
    alternatives: [
      {
        id: 301,
        name: "Stainless Steel Water Bottle",
        price: 999,
        ecoScore: 95,
        image: "/i9.jpg",
        savings: {
          carbon: "70%",
          plastic: "100%",
          water: "60%",
        },
      },
    ],
  },
  {
    id: 4,
    name: "Plastic Food Storage Containers",
    price: 599,
    quantity: 1,
    image: "/i8.jpg",
    ecoScore: 25,
    impact: {
      carbon: 0.8,
      plastic: 0.3,
      water: 15,
    },
    alternatives: [
      {
        id: 401,
        name: "Glass Food Storage Set",
        price: 1499,
        ecoScore: 92,
        image: "/i3.jpg",
        savings: {
          carbon: "65%",
          plastic: "100%",
          water: "75%",
        },
      },
    ],
  },
  {
    id: 5,
    name: "Disposable Coffee Cups",
    price: 399,
    quantity: 1,
    image: "/i5.jpg",
    ecoScore: 15,
    impact: {
      carbon: 0.2,
      plastic: 0.1,
      water: 5,
    },
    alternatives: [
      {
        id: 501,
        name: "Reusable Coffee Cup",
        price: 799,
        ecoScore: 88,
        image: "/i2.jpg",
        savings: {
          carbon: "80%",
          plastic: "100%",
          water: "90%",
        },
      },
    ],
  }
];


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

  const downloadExtension = async () => {
    try {
      // Create a direct download link
      const link = document.createElement('a');
      link.href = '/api/download-extension';
      link.download = 'EcoMit-Extension.zip';
      link.setAttribute('type', 'application/zip');
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      
      // Remove the link after a short delay to ensure the download starts
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
      
      // Show a success message
      alert('Extension download started! Once downloaded, you can install it in your browser.');
    } catch (error) {
      console.error('Error downloading extension:', error);
      alert('Failed to download the extension. Please try again later.');
    }
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

      {/* Browser Extension Section */}
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md">
                <Chrome className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">EcoMit Browser Extension</h3>
                <p className="text-muted-foreground mb-4">
                  Get real-time eco-friendly product recommendations while shopping online. Our extension helps you make sustainable choices.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={downloadExtension} className="bg-blue-600 hover:bg-blue-700 text-white">
                    Install Extension
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/about#extension">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Amazon Products Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Cart Sync With Extension</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {amazonProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 md:h-auto bg-gray-100 flex items-center justify-center p-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="md:w-2/3 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800">
                      Eco Score: {product.ecoScore}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="font-medium">Impact:</span>{" "}
                      <span className="text-amber-600 dark:text-amber-400">Medium environmental impact</span>
                    </div>
                    <Link href={product.link} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline">
                        View on Amazon <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Eco-Friendly Alternatives */}
              <div className="p-4 bg-gray-50 dark:bg-gray-900/20 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-sm mb-3">🌿 Eco-Friendly Alternatives:</h4>
                <div className="grid gap-3 md:grid-cols-2">
                  {product.alternatives.map((alt) => (
                    <Card key={alt.id} className="bg-white dark:bg-gray-800 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-sm">{alt.name}</h5>
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                            Eco Score: {alt.ecoScore}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{alt.description}</p>
                        <div className="text-xs">
                          <div className="font-medium mb-1">Pros:</div>
                          <ul className="list-disc list-inside space-y-1">
                            {alt.pros.map((pro, index) => (
                              <li key={index}>{pro}</li>
                            ))}
                          </ul>
                          <div className="mt-1">
                            <span className="font-medium">Best for:</span> {alt.bestFor}
                          </div>
                        </div>
                        <div className="mt-3">
                          <Link href={alt.link} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline" className="w-full bg-green-100 hover:bg-green-200 text-green-800 border-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                              View Alternative <ExternalLink className="ml-1 h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
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
                      <div className="w-full sm:w-[200px] h-[200px] bg-muted relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant={item.ecoScore > 70 ? "outline" : "secondary"} className="bg-background/80 backdrop-blur-sm">
                            <div className="flex items-center gap-1">
                              <Leaf className="h-3 w-3 text-primary" />
                              <span>Eco Score: {item.ecoScore}/100</span>
                            </div>
                          </Badge>
                        </div>
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            {item.ecoScore < 50 && (
                              <span className="text-xs text-amber-600 flex items-center gap-1 mt-1">
                                <AlertTriangle className="h-3 w-3" />
                                High Impact
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-lg">₹{item.price.toFixed(2)}</div>
                            <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div className="space-y-1">
                            <div className="text-muted-foreground text-sm">Carbon</div>
                            <div className="font-medium">{item.impact.carbon} kg CO₂</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-muted-foreground text-sm">Plastic</div>
                            <div className="font-medium">{item.impact.plastic} kg</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-muted-foreground text-sm">Water</div>
                            <div className="font-medium">{item.impact.water} L</div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-6">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>

                          {item.alternatives.length > 0 && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-primary"
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
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>₹0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>₹{(subtotal * 0.08).toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{(subtotal * 1.08).toFixed(2)}</span>
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
                        <div className="w-[120px] h-[120px] bg-muted rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="bg-muted">
                              <div className="flex items-center gap-1">
                                <Leaf className="h-3 w-3 text-primary" />
                                <span>Eco Score: {item.ecoScore}/100</span>
                              </div>
                            </Badge>
                          </div>
                          <div className="mt-2 font-medium text-lg">₹{item.price.toFixed(2)}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Eco-Friendly Alternatives</h3>
                    {item.alternatives.map((alt) => (
                      <Card key={alt.id} className="overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="w-full sm:w-[200px] h-[200px] bg-muted relative">
                            <img
                              src={alt.image}
                              alt={alt.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2">
                              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                                <div className="flex items-center gap-1">
                                  <Leaf className="h-3 w-3 text-primary" />
                                  <span>Eco Score: {alt.ecoScore}/100</span>
                                </div>
                              </Badge>
                            </div>
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-semibold text-lg">{alt.name}</h3>
                                <div className="mt-2 space-y-1">
                                  <div className="flex items-center gap-2 text-sm">
                                    <span className="text-muted-foreground">Carbon Savings:</span>
                                    <span className="font-medium text-green-600">{alt.savings.carbon}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <span className="text-muted-foreground">Plastic Savings:</span>
                                    <span className="font-medium text-green-600">{alt.savings.plastic}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <span className="text-muted-foreground">Water Savings:</span>
                                    <span className="font-medium text-green-600">{alt.savings.water}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-lg">₹{alt.price.toFixed(2)}</div>
                                <div className="text-sm text-muted-foreground">+₹{(alt.price - item.price).toFixed(2)}</div>
                              </div>
                            </div>

                            <div className="flex justify-end mt-6">
                              <Button
                                onClick={() => replaceWithEco(item.id, alt.id)}
                                className="bg-primary hover:bg-primary/90"
                              >
                                Replace Item
                                <ArrowRight className="h-4 w-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
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
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Leaf className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Reduced Carbon Footprint</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Eco-friendly alternatives typically produce less CO₂ during manufacturing and transportation.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Less Plastic Waste</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Sustainable products often use minimal or biodegradable packaging to reduce plastic pollution.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Water Conservation</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Eco-friendly manufacturing processes typically use less water and produce less water pollution.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-primary/5 p-4 text-sm border border-primary/10 mt-4">
                    <p className="font-medium">Your Impact Matters</p>
                    <p className="mt-1 text-muted-foreground">
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
