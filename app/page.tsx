import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf, ShoppingBag, ShoppingCart, BarChart3, ArrowRight, Factory, Recycle, Cloud, TreePine, ExternalLink } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Shop Smarter, Live Greener
                </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Make eco-conscious shopping decisions with real-time environmental impact insights.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup" prefetch={false}>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login" prefetch={false}>
                <Button size="lg" className="bg-background border border-primary text-primary hover:bg-muted">
                  Login
                </Button>
                </Link>
              <Link href="/about" prefetch={false}>
                <Button variant="outline" size="lg" className="bg-background">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SDGs Section - Matching Features Style */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Sustainable Development Goals</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                EcoMit aligns with key United Nations Sustainable Development Goals to create a more sustainable future.
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-card shadow-sm">
              <div className="p-3 rounded-full bg-primary/10">
                <Factory className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">SDG 9</h3>
              <p className="text-center text-sm text-muted-foreground">
                Industry, Innovation & Infrastructure
              </p>
              <p className="text-center text-xs text-muted-foreground mt-2">
                Promoting sustainable industrialization and fostering innovation in eco-friendly products.
              </p>
            </div>
            
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-card shadow-sm">
              <div className="p-3 rounded-full bg-primary/10">
                <Recycle className="h-6 w-6 text-primary" />
                  </div>
              <h3 className="text-xl font-bold">SDG 12</h3>
              <p className="text-center text-sm text-muted-foreground">
                Responsible Consumption & Production
              </p>
              <p className="text-center text-xs text-muted-foreground mt-2">
                Ensuring sustainable consumption and production patterns through informed shopping decisions.
              </p>
                  </div>
            
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-card shadow-sm">
              <div className="p-3 rounded-full bg-primary/10">
                <Cloud className="h-6 w-6 text-primary" />
                  </div>
              <h3 className="text-xl font-bold">SDG 13</h3>
              <p className="text-center text-sm text-muted-foreground">
                Climate Action
              </p>
              <p className="text-center text-xs text-muted-foreground mt-2">
                Taking urgent action to combat climate change and its impacts through reduced carbon footprint.
              </p>
                  </div>
            
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-card shadow-sm">
              <div className="p-3 rounded-full bg-primary/10">
                <TreePine className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">SDG 15</h3>
              <p className="text-center text-sm text-muted-foreground">
                Life on Land
              </p>
              <p className="text-center text-xs text-muted-foreground mt-2">
                Protecting, restoring and promoting sustainable use of terrestrial ecosystems through responsible sourcing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Key Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                EcoMit makes it easy to understand and reduce your environmental impact while shopping.
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-card shadow-sm">
              <div className="p-3 rounded-full bg-primary/10">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Cart Analysis</h3>
              <p className="text-center text-sm text-muted-foreground">
                Calculate environmental impact metrics for your shopping cart in real-time.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-card shadow-sm">
              <div className="p-3 rounded-full bg-primary/10">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Eco Alternatives</h3>
              <p className="text-center text-sm text-muted-foreground">
                Discover eco-friendly alternatives to high-impact products in your cart.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-card shadow-sm">
              <div className="p-3 rounded-full bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Impact Dashboard</h3>
              <p className="text-center text-sm text-muted-foreground">
                Track your environmental footprint over time with comprehensive metrics.
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/features" prefetch={false}>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Explore All Features <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                EcoMit works seamlessly with your online shopping experience.
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3 mt-8">
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-card shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                1
              </div>
              <h3 className="text-xl font-bold">Install Extension</h3>
              <p className="text-center text-sm text-muted-foreground">
                Add the EcoMit browser extension to Chrome, Firefox, or Edge browsers.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-card shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                2
              </div>
              <h3 className="text-xl font-bold">Shop As Usual</h3>
              <p className="text-center text-sm text-muted-foreground">
                Continue shopping on your favorite e-commerce sites. EcoMit works in the background.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-card shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                3
              </div>
              <h3 className="text-xl font-bold">Make Informed Choices</h3>
              <p className="text-center text-sm text-muted-foreground">
                Get real-time environmental impact data and recommendations for eco-friendly alternatives.
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/demo" prefetch={false}>
              <Button variant="outline" className="bg-background">
                Watch Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Make a Difference?</h2>
              <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
                Join thousands of eco-conscious consumers making sustainable shopping choices with EcoMit.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup" prefetch={false}>
                <Button size="lg" className="bg-background text-primary hover:bg-background/90">
                  Get Started Now
                </Button>
              </Link>
              <Link href="/about" prefetch={false}>
                <Button variant="outline" size="lg" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold">EcoMit</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 EcoMit. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link className="text-sm text-muted-foreground hover:text-foreground" href="/privacy">
                Privacy
              </Link>
              <Link className="text-sm text-muted-foreground hover:text-foreground" href="/terms">
                Terms
              </Link>
              <Link className="text-sm text-muted-foreground hover:text-foreground" href="/contact">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
