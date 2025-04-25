"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Leaf, Info, AlertTriangle, Droplet, Wind, TreePine } from "lucide-react"
import { ImpactChart } from "@/components/impact-chart"
import { EcoTip } from "@/components/eco-tip"
import { RealTimeCart } from "@/components/real-time-cart"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for the dashboard
  const impactData = {
    carbon: 65,
    water: 40,
    plastic: 75,
    deforestation: 25,
  }

  const monthlyTrends = [
    { month: "Jan", carbon: 80 },
    { month: "Feb", carbon: 75 },
    { month: "Mar", carbon: 70 },
    { month: "Apr", carbon: 68 },
    { month: "May", carbon: 65 },
    { month: "Jun", carbon: 60 },
  ]

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Eco Dashboard</h1>
        <p className="text-muted-foreground">Track your environmental impact and learn how to reduce it.</p>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="impact">Impact Details</TabsTrigger>
          <TabsTrigger value="education">Eco Education</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Carbon Footprint</CardTitle>
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245 kg CO₂</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
                <Progress value={impactData.carbon} className="h-2 mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Water Usage</CardTitle>
                <Droplet className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,240 L</div>
                <p className="text-xs text-muted-foreground">-5% from last month</p>
                <Progress value={impactData.water} className="h-2 mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Plastic Waste</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2 kg</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
                <Progress value={impactData.plastic} className="h-2 mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Deforestation Impact</CardTitle>
                <TreePine className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.5 m²</div>
                <p className="text-xs text-muted-foreground">-8% from last month</p>
                <Progress value={impactData.deforestation} className="h-2 mt-3" />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Monthly Carbon Trend</CardTitle>
                <CardDescription>Your carbon footprint over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ImpactChart data={monthlyTrends} />
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Eco Tips</CardTitle>
                <CardDescription>Personalized suggestions to reduce your impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <EcoTip
                    title="Reduce Plastic Packaging"
                    description="Your recent purchases contain high plastic content. Consider products with minimal or recyclable packaging."
                    icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
                  />

                  <EcoTip
                    title="Offset Your Carbon"
                    description="Consider carbon offsetting options for your recent electronics purchase."
                    icon={<Wind className="h-5 w-5 text-blue-500" />}
                  />

                  <EcoTip
                    title="Water-Saving Products"
                    description="Switch to water-efficient alternatives for your household products."
                    icon={<Droplet className="h-5 w-5 text-blue-500" />}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real-time cart updates */}
          <RealTimeCart />

          <Alert className="bg-green-50 border-green-200">
            <Leaf className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Eco Achievement!</AlertTitle>
            <AlertDescription className="text-green-700">
              You've reduced your carbon footprint by 15% compared to the average shopper. Keep it up!
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Impact Analysis</CardTitle>
              <CardDescription>Breakdown of your environmental impact by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span className="font-medium">Carbon Footprint</span>
                    </div>
                    <span className="text-sm">245 kg CO₂</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <div className="grid grid-cols-3 text-xs text-muted-foreground">
                    <div>Electronics: 40%</div>
                    <div>Clothing: 35%</div>
                    <div>Food: 25%</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Droplet className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Water Usage</span>
                    </div>
                    <span className="text-sm">1,240 L</span>
                  </div>
                  <Progress value={40} className="h-2" />
                  <div className="grid grid-cols-3 text-xs text-muted-foreground">
                    <div>Clothing: 60%</div>
                    <div>Food: 30%</div>
                    <div>Other: 10%</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="font-medium">Plastic Waste</span>
                    </div>
                    <span className="text-sm">3.2 kg</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="grid grid-cols-3 text-xs text-muted-foreground">
                    <div>Packaging: 70%</div>
                    <div>Products: 20%</div>
                    <div>Other: 10%</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <TreePine className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Deforestation Impact</span>
                    </div>
                    <span className="text-sm">0.5 m²</span>
                  </div>
                  <Progress value={25} className="h-2" />
                  <div className="grid grid-cols-3 text-xs text-muted-foreground">
                    <div>Paper: 45%</div>
                    <div>Wood: 40%</div>
                    <div>Other: 15%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Did You Know?</CardTitle>
                <CardDescription>Environmental facts related to your shopping habits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert className="bg-blue-50 border-blue-200">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertTitle className="text-blue-800">Fast Fashion Impact</AlertTitle>
                    <AlertDescription className="text-blue-700">
                      The fashion industry produces 10% of global carbon emissions and is the second-largest consumer of
                      water.
                    </AlertDescription>
                  </Alert>

                  <Alert className="bg-amber-50 border-amber-200">
                    <Info className="h-4 w-4 text-amber-600" />
                    <AlertTitle className="text-amber-800">Electronics Waste</AlertTitle>
                    <AlertDescription className="text-amber-700">
                      E-waste represents 2% of trash in landfills but accounts for 70% of toxic waste.
                    </AlertDescription>
                  </Alert>

                  <Alert className="bg-green-50 border-green-200">
                    <Info className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-800">Packaging Facts</AlertTitle>
                    <AlertDescription className="text-green-700">
                      Plastic packaging accounts for nearly half of all plastic waste globally, and most of it is never
                      recycled or incinerated.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Eco Learning Resources</CardTitle>
                <CardDescription>Expand your knowledge about sustainable living</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-semibold mb-1">Sustainable Shopping Guide</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Learn how to identify truly sustainable products and avoid greenwashing.
                    </p>
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-semibold mb-1">Carbon Footprint Calculator</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Understand how different products contribute to your carbon footprint.
                    </p>
                    <Button variant="outline" size="sm">
                      Try Calculator
                    </Button>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-semibold mb-1">Eco-Certification Guide</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Learn about different eco-certifications and what they actually mean.
                    </p>
                    <Button variant="outline" size="sm">
                      View Guide
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
