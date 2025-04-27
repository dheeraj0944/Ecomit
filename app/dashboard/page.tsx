"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Leaf, AlertTriangle, Droplet, Wind, TreePine, Trophy, Target, Clock, ShoppingBag, Chrome } from "lucide-react"
import { ImpactChart } from "@/components/impact-chart"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const { theme } = useTheme()
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Enhanced mock data for the dashboard
  const impactData = {
    carbon: 12.5,
    water: 320,
    plastic: 4.2,
    deforestation: 0.8,
  }

  const monthlyTrends = [
    { month: "Jan", carbon: 15.2, water: 350, plastic: 5.1 },
    { month: "Feb", carbon: 14.8, water: 340, plastic: 4.8 },
    { month: "Mar", carbon: 13.5, water: 330, plastic: 4.5 },
    { month: "Apr", carbon: 12.5, water: 320, plastic: 4.2 },
    { month: "May", carbon: 11.8, water: 310, plastic: 3.9 },
    { month: "Jun", carbon: 10.5, water: 300, plastic: 3.7 },
  ]

  const recentPurchases = [
    {
      id: 1,
      name: "Reusable Shopping Bags",
      date: "2024-03-15",
      impact: "Very Low",
      savings: "0.4 kg CO₂",
      image: "/shop.jpg"
    },
    {
      id: 2,
      name: "Reusable Water Bottle",
      date: "2024-03-10",
      impact: "Very Low",
      savings: "0.5 kg CO₂",
      image: "https://images.pexels.com/photos/1188649/pexels-photo-1188649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      date: "2024-03-05",
      impact: "Low",
      savings: "1.2 kg CO₂",
      image: "https://images.pexels.com/photos/991509/pexels-photo-991509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
  ]

  const upcomingChallenges = [
    {
      title: "Plastic-Free Week",
      description: "Go 7 days without single-use plastic",
      progress: 60,
      reward: "50 points",
      icon: <Target className="h-5 w-5 text-blue-500" />,
      deadline: "5 days left"
    },
    {
      title: "Water Conservation",
      description: "Reduce water usage by 20% this month",
      progress: 45,
      reward: "30 points",
      icon: <Droplet className="h-5 w-5 text-blue-500" />,
      deadline: "12 days left"
    },
    {
      title: "Eco Shopping",
      description: "Make 5 eco-friendly purchases",
      progress: 80,
      reward: "40 points",
      icon: <ShoppingBag className="h-5 w-5 text-green-500" />,
      deadline: "3 days left"
    },
  ]

  // Function to get badge variant based on impact level
  const getImpactBadgeVariant = (impact) => {
    switch (impact) {
      case "Very Low":
        return "success"
      case "Low":
        return "default"
      case "Medium":
        return "warning"
      case "High":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Track your environmental impact and eco-friendly achievements
        </p>
      </div>

      

      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Carbon Footprint</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.5 kg CO₂</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
              <Progress value={impactData.carbon} className="h-2 mt-3" />
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Water Usage</CardTitle>
              <Droplet className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">320 L</div>
              <p className="text-xs text-muted-foreground">-5% from last month</p>
              <Progress value={impactData.water} className="h-2 mt-3" />
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Plastic Waste</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2 kg</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
              <Progress value={impactData.plastic} className="h-2 mt-3" />
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Deforestation Impact</CardTitle>
              <TreePine className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0.8 m²</div>
              <p className="text-xs text-muted-foreground">-8% from last month</p>
              <Progress value={impactData.deforestation} className="h-2 mt-3" />
            </CardContent>
          </Card>
        </div>

        {/* Impact Trends */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Environmental Impact Trends</CardTitle>
            <CardDescription>Your impact metrics over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ImpactChart data={monthlyTrends} />
          </CardContent>
        </Card>

        {/* Recent Purchases and Active Challenges */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Recent Eco-Friendly Purchases</CardTitle>
              <CardDescription>Your latest sustainable shopping choices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPurchases.map((purchase) => (
                  <div key={purchase.id} className="flex items-center gap-4 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                    <div className="h-12 w-12 rounded-md overflow-hidden">
                      <img src={purchase.image} alt={purchase.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{purchase.name}</div>
                      <div className="text-sm text-muted-foreground">{purchase.date}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={getImpactBadgeVariant(purchase.impact)}>
                        {purchase.impact}
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">{purchase.savings}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Active Challenges</CardTitle>
              <CardDescription>Complete these challenges to earn rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {upcomingChallenges.map((challenge, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {challenge.icon}
                        <div>
                          <h3 className="font-medium">{challenge.title}</h3>
                          <p className="text-sm text-muted-foreground">{challenge.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{challenge.reward}</Badge>
                    </div>
                    <Progress value={challenge.progress} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Progress: {challenge.progress}%</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {challenge.deadline}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievement Alert */}
        <Alert className="bg-green-50 border-green-200">
          <Leaf className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Eco Achievement!</AlertTitle>
          <AlertDescription className="text-green-700">
            You've reduced your carbon footprint by 15% compared to the average shopper. Keep it up!
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
