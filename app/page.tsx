import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf, ShoppingBag, ShoppingCart, BarChart3, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Shop Smarter, Live Greener
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  EcoMit helps you make eco-conscious shopping decisions by tracking your environmental impact and
                  suggesting greener alternatives.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup" prefetch={false}>
                  <Button className="bg-green-600 hover:bg-green-700">Get Started</Button>
                </Link>
                <Link href="#features" prefetch={false}>
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-sm lg:max-w-md aspect-square overflow-hidden rounded-xl shadow-lg bg-white p-8">
                <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
                  <div className="bg-green-100 rounded-lg flex items-center justify-center p-4">
                    <ShoppingBag className="h-10 w-10 text-green-600" />
                  </div>
                  <div className="bg-blue-100 rounded-lg flex items-center justify-center p-4">
                    <ShoppingCart className="h-10 w-10 text-blue-600" />
                  </div>
                  <div className="bg-amber-100 rounded-lg flex items-center justify-center p-4">
                    <Leaf className="h-10 w-10 text-amber-600" />
                  </div>
                  <div className="bg-purple-100 rounded-lg flex items-center justify-center p-4">
                    <BarChart3 className="h-10 w-10 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                EcoMit makes it easy to understand and reduce your environmental impact while shopping.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {/* Feature 1 */}
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white shadow-sm">
              <div className="p-3 rounded-full bg-green-100">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Smart Cart Analysis</h3>
              <p className="text-center text-sm text-gray-500">
                Automatically analyze your shopping cart to calculate environmental impact metrics.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white shadow-sm">
              <div className="p-3 rounded-full bg-blue-100">
                <Leaf className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">Eco Alternatives</h3>
              <p className="text-center text-sm text-gray-500">
                Discover eco-friendly alternatives to high-impact products in your cart.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white shadow-sm">
              <div className="p-3 rounded-full bg-amber-100">
                <BarChart3 className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold">Impact Dashboard</h3>
              <p className="text-center text-sm text-gray-500">
                Track your environmental footprint over time with comprehensive metrics and visualizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                EcoMit works seamlessly with your online shopping experience.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-600">
                1
              </div>
              <h3 className="text-xl font-bold">Install Extension</h3>
              <p className="text-center text-sm text-gray-500">
                Add the EcoMit browser extension to Chrome, Firefox, or Edge browsers.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-600">
                2
              </div>
              <h3 className="text-xl font-bold">Shop As Usual</h3>
              <p className="text-center text-sm text-gray-500">
                Continue shopping on your favorite e-commerce sites. EcoMit works in the background.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-600">
                3
              </div>
              <h3 className="text-xl font-bold">Get Insights</h3>
              <p className="text-center text-sm text-gray-500">
                View your environmental impact and eco-friendly alternatives in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Shop Sustainably?
              </h2>
              <p className="max-w-[600px] text-green-50 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of eco-conscious shoppers making a difference with every purchase.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup" prefetch={false}>
                <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                  Create an Account here<ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 md:py-8 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              <span className="font-bold">EcoMit</span>
            </div>
            <p className="text-sm text-gray-500">© 2023 EcoMit. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link className="text-sm text-gray-500 hover:text-gray-900" href="/privacy">
                Privacy
              </Link>
              <Link className="text-sm text-gray-500 hover:text-gray-900" href="/terms">
                Terms
              </Link>
              <Link className="text-sm text-gray-500 hover:text-gray-900" href="/contact">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
