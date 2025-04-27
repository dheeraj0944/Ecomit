import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Play, Leaf, Factory, ShoppingBag, Cloud, TreePine } from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">EcoMit in Action</h1>
        <p className="max-w-[700px] text-muted-foreground mt-4 text-lg">
          See how EcoMit transforms your shopping experience into a force for environmental good.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mb-16">
        <div className="space-y-6">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Play className="h-8 w-8 text-primary" />
              </div>
              <p className="text-muted-foreground">Demo video coming soon</p>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How It Works</h2>
            <p className="text-muted-foreground">
              EcoMit seamlessly integrates with your shopping experience to provide real-time environmental impact analysis and recommendations.
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
              <CardDescription>Experience these features in our demo video</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Cart Analysis</h3>
                  <p className="text-sm text-muted-foreground">Real-time environmental impact calculation</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Leaf className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Eco Alternatives</h3>
                  <p className="text-sm text-muted-foreground">Smart recommendations for sustainable choices</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <TreePine className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Impact Tracking</h3>
                  <p className="text-sm text-muted-foreground">Monitor your environmental footprint</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Supporting Sustainable Development Goals</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <div className="p-2 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Factory className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>SDG 9</CardTitle>
              <CardDescription>Industry, Innovation & Infrastructure</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                EcoMit promotes sustainable industrialization and fosters innovation in consumer technology.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="p-2 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>SDG 12</CardTitle>
              <CardDescription>Responsible Consumption & Production</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We help consumers make informed choices that reduce environmental impact and promote sustainable consumption patterns.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="p-2 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Cloud className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>SDG 13</CardTitle>
              <CardDescription>Climate Action</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                By reducing carbon footprints through sustainable shopping, we contribute to global climate action efforts.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="p-2 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <TreePine className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>SDG 15</CardTitle>
              <CardDescription>Life on Land</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our platform helps protect terrestrial ecosystems by promoting products that minimize deforestation and habitat destruction.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Install Extension</CardTitle>
            <CardDescription>Add EcoMit to your browser</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Get started by installing our browser extension. Works with all major browsers.
            </p>
            <Link href="/extension">
              <Button variant="outline" className="w-full">
                Get the Extension <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>Join our community</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Sign up for free to track your impact, earn green points, and access all features.
            </p>
            <Link href="/signup">
              <Button variant="outline" className="w-full">
                Create Account <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Start Shopping</CardTitle>
            <CardDescription>Make sustainable choices</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Shop at your favorite stores and let EcoMit guide you towards more sustainable choices.
            </p>
            <Link href="/supported-stores">
              <Button variant="outline" className="w-full">
                View Supported Stores <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="max-w-[600px] mx-auto mb-6">
          Join thousands of eco-conscious consumers making sustainable shopping choices with EcoMit.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button className="bg-background text-primary hover:bg-background/90">
              Get Started Now
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 