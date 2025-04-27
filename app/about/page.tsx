import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, Globe, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">About EcoMit</h1>
        <p className="max-w-[700px] text-muted-foreground mt-4 text-lg">
          EcoMit is on a mission to make sustainable shopping accessible to everyone.
        </p>
      </div>

      <div className="mb-16">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Our Story</h2>
          <p className="text-muted-foreground">
            EcoMit was founded in 2025 by a team of environmental enthusiasts and tech innovators who recognized the need for a tool that could help consumers make more informed shopping decisions.
          </p>
          <p className="text-muted-foreground">
            We believe that every purchase has an environmental impact, and by providing transparency and alternatives, we can collectively reduce our ecological footprint.
          </p>
          <div className="pt-4">
            <Link href="/signup">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Join Our Mission <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Our Values</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="p-2 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Transparency</CardTitle>
              <CardDescription>We believe in providing clear, accurate information about product environmental impacts.</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <div className="p-2 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Community</CardTitle>
              <CardDescription>We foster a community of eco-conscious consumers supporting each other's sustainable journey.</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <div className="p-2 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Impact</CardTitle>
              <CardDescription>We measure our success by the positive environmental impact our users create together.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Join Us in Making a Difference</h2>
        <p className="max-w-[600px] mx-auto mb-6">
          Every small change in shopping habits can lead to significant environmental impact. Join thousands of eco-conscious consumers making a difference with every purchase.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button className="bg-background text-primary hover:bg-background/90">
              Create an Account
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 