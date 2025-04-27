import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Leaf, BarChart3, Camera, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Features</h1>
        <p className="max-w-[700px] text-muted-foreground mt-4 text-lg">
          Discover how EcoMit helps you make sustainable shopping choices.
        </p>
      </div>

      <Tabs defaultValue="cart-analysis" className="mb-16">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="cart-analysis" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span>Cart Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="eco-alternatives" className="flex items-center gap-2">
            <Leaf className="h-4 w-4" />
            <span>Eco Alternatives</span>
          </TabsTrigger>
          <TabsTrigger value="impact-dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Impact Dashboard</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="cart-analysis" id="cart-analysis" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Smart Cart Analysis</h2>
              <p className="text-muted-foreground">
                EcoMit automatically analyzes your shopping cart to calculate environmental impact metrics in real-time.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Carbon footprint calculation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Water usage estimation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Plastic waste assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Deforestation impact tracking</span>
                </li>
              </ul>
              <div className="pt-4">
                <Link href="/signup">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Try It Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-6 flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-square">
                <div className="absolute inset-0 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-24 w-24 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="eco-alternatives" id="eco-alternatives" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Eco Alternatives</h2>
              <p className="text-muted-foreground">
                Discover eco-friendly alternatives to high-impact products in your cart with detailed comparisons.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Personalized recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Environmental impact comparison</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Price and quality analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>One-click replacement</span>
                </li>
              </ul>
              <div className="pt-4">
                <Link href="/signup">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Try It Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-6 flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-square">
                <div className="absolute inset-0 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Leaf className="h-24 w-24 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="impact-dashboard" id="impact-dashboard" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Impact Dashboard</h2>
              <p className="text-muted-foreground">
                Track your environmental footprint over time with comprehensive metrics and visualizations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Historical impact tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Interactive charts and graphs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Personalized improvement tips</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Community comparison</span>
                </li>
              </ul>
              <div className="pt-4">
                <Link href="/signup">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Try It Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-6 flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-square">
                <div className="absolute inset-0 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-24 w-24 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Additional Features</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="p-2 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Camera className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>GreenScan</CardTitle>
              <CardDescription>Scan products to get instant environmental impact information and earn green points.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/greenscan">
                <Button variant="ghost" className="text-primary">
                  Try GreenScan <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="p-2 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Leaderboard</CardTitle>
              <CardDescription>Compete with friends and see who can make the most eco-friendly shopping choices.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/leaderboard">
                <Button variant="ghost" className="text-primary">
                  View Leaderboard <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Shopping Sustainably?</h2>
        <p className="max-w-[600px] mx-auto mb-6">
          Join thousands of eco-conscious consumers making a difference with every purchase.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button className="bg-background text-primary hover:bg-background/90">
              Create an Account
            </Button>
          </Link>
          <Link href="/demo">
            <Button variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
              Watch Demo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 