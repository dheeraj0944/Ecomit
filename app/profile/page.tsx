"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Leaf, User, Award } from "lucide-react"

export default function Profile() {
  const [activeTab, setActiveTab] = useState("account")

  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    ecoLevel: "Eco Enthusiast",
    joinDate: "January 2023",
    impactStats: {
      carbonSaved: 245,
      plasticReduced: 12.5,
      waterSaved: 3200,
      ecoChoices: 28,
    },
    badges: [
      { name: "Carbon Reducer", description: "Reduced carbon footprint by 20%" },
      { name: "Plastic Fighter", description: "Chose plastic-free alternatives 10 times" },
      { name: "Water Saver", description: "Saved 1000+ liters of water" },
    ],
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground">Manage your account and eco preferences.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  <Leaf className="h-3 w-3 mr-1" />
                  {user.ecoLevel}
                </Badge>
                <p className="text-xs text-muted-foreground mt-2">Member since {user.joinDate}</p>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Leaf className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Carbon Saved</div>
                      <div className="text-xs text-muted-foreground">vs. avg shopper</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{user.impactStats.carbonSaved} kg</div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Leaf className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Plastic Reduced</div>
                      <div className="text-xs text-muted-foreground">vs. avg shopper</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">{user.impactStats.plasticReduced} kg</div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <Leaf className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Water Saved</div>
                      <div className="text-xs text-muted-foreground">vs. avg shopper</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-amber-600">{user.impactStats.waterSaved} L</div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <Award className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Eco Choices Made</div>
                      <div className="text-xs text-muted-foreground">total count</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-purple-600">{user.impactStats.ecoChoices}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="preferences">Eco Preferences</TabsTrigger>
              <TabsTrigger value="badges">Eco Badges</TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Update your personal details and contact information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input
                      id="bio"
                      defaultValue="Eco-conscious shopper trying to make better choices for the planet."
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-green-600 hover:bg-green-700">Save Changes</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Update your password to keep your account secure.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-green-600 hover:bg-green-700">Update Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Eco Shopping Preferences</CardTitle>
                  <CardDescription>Customize how EcoMit works with your shopping experience.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="eco-mode">Eco Shopping Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically suggest eco alternatives while shopping
                      </p>
                    </div>
                    <Switch id="eco-mode" defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="impact-alerts">High Impact Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when adding high-impact items to cart
                      </p>
                    </div>
                    <Switch id="impact-alerts" defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="price-priority">Price Priority</Label>
                      <p className="text-sm text-muted-foreground">
                        Only suggest alternatives within 20% of original price
                      </p>
                    </div>
                    <Switch id="price-priority" />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-replace">Auto-Replace</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically replace items with eco alternatives when available
                      </p>
                    </div>
                    <Switch id="auto-replace" />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekly-report">Weekly Impact Report</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive a weekly email summarizing your environmental impact
                      </p>
                    </div>
                    <Switch id="weekly-report" defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-green-600 hover:bg-green-700">Save Preferences</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Control what notifications you receive from EcoMit.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive updates and alerts via email</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="browser-notifications">Browser Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                    </div>
                    <Switch id="browser-notifications" defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing-emails">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Receive promotional content and eco tips</p>
                    </div>
                    <Switch id="marketing-emails" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-green-600 hover:bg-green-700">Save Notification Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="badges" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Eco Badges</CardTitle>
                  <CardDescription>Achievements you've earned through eco-conscious shopping.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {user.badges.map((badge, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center text-center p-4 border rounded-lg bg-green-50 border-green-200"
                      >
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3">
                          <Award className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-green-800">{badge.name}</h3>
                        <p className="text-xs text-green-700 mt-1">{badge.description}</p>
                      </div>
                    ))}

                    <div className="flex flex-col items-center text-center p-4 border rounded-lg border-dashed border-muted-foreground/20">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3">
                        <Award className="h-8 w-8 text-muted-foreground/40" />
                      </div>
                      <h3 className="font-semibold text-muted-foreground/60">Water Warrior</h3>
                      <p className="text-xs text-muted-foreground/60 mt-1">
                        Save 5000+ liters of water through eco choices
                      </p>
                    </div>

                    <div className="flex flex-col items-center text-center p-4 border rounded-lg border-dashed border-muted-foreground/20">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3">
                        <Award className="h-8 w-8 text-muted-foreground/40" />
                      </div>
                      <h3 className="font-semibold text-muted-foreground/60">Zero Waste Hero</h3>
                      <p className="text-xs text-muted-foreground/60 mt-1">Choose 20 plastic-free products</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Badge Progress</CardTitle>
                  <CardDescription>Track your progress towards earning new eco badges.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-amber-600" />
                          <span className="font-medium">Carbon Master</span>
                        </div>
                        <span className="text-sm">65%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground">Reduce carbon footprint by 500kg (325kg so far)</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Water Warrior</span>
                        </div>
                        <span className="text-sm">64%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "64%" }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground">Save 5000+ liters of water (3200L so far)</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-green-600" />
                          <span className="font-medium">Eco Influencer</span>
                        </div>
                        <span className="text-sm">20%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground">Share eco alternatives with 10 friends (2 so far)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
