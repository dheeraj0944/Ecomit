"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Leaf, User, Award, Settings, Trophy, Activity, Droplet, Recycle } from "lucide-react";
import { toast } from "sonner";

interface ImpactStats {
  carbonSaved: number;
  plasticReduced: number;
  waterSaved: number;
  ecoChoices: number;
}

interface BadgeData {
  name: string;
  description: string;
  dateEarned?: string;
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  ecoLevel: string;
  joinDate: string;
  impactStats: ImpactStats;
  badges: BadgeData[];
}

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { theme } = useTheme();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("account");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    // Enhanced dummy user data with more realistic values
    const dummyUserData: UserData = {
      _id: "680b54d18d0af89dd0b33f8f",
      name: "Ajay Shenoy P",
      email: "ajaygsb123@gmail.com",
      ecoLevel: "Eco Explorer",
      joinDate: "2024-01-15T09:24:33.260+00:00",
      impactStats: {
        carbonSaved: 12.5,
        plasticReduced: 4.2,
        waterSaved: 320,
        ecoChoices: 18
      },
      badges: [
        {
          name: "Eco Beginner",
          description: "Completed 10 eco-friendly purchases",
          dateEarned: "2024-02-01T09:24:33.260+00:00"
        },
        {
          name: "Water Saver",
          description: "Saved over 300 liters of water",
          dateEarned: "2024-02-15T09:24:33.260+00:00"
        },
        {
          name: "Plastic Reducer",
          description: "Reduced plastic usage by 4kg",
          dateEarned: "2024-03-01T09:24:33.260+00:00"
        },
        {
          name: "Carbon Conscious",
          description: "Offset 10kg of carbon emissions",
          dateEarned: "2024-03-15T09:24:33.260+00:00"
        }
      ],
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=tiger&backgroundColor=b6e3f4&style=botttsNeutral"
    };

    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      setUserData(dummyUserData);
      setFormData({
        name: dummyUserData.name,
        email: dummyUserData.email,
      });
      setIsLoading(false);
    }
  }, [status, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    // In a real application, you would make an API call here
    // For now, we'll just update the local state and show a success message
    if (userData) {
      setUserData({
        ...userData,
        name: formData.name,
        email: formData.email,
      });
      toast.success("Profile updated successfully!");
    }
  };

  // Get card background color based on theme
  const getCardBackground = () => {
    return theme === "dark" ? "bg-card/50 border border-border/50" : "bg-card";
  };

  // Get stat card background based on theme
  const getStatCardBackground = () => {
    return theme === "dark" ? "bg-primary/10 border border-primary/20" : "bg-primary/5";
  };

  // Get badge background based on theme
  const getBadgeBackground = () => {
    return theme === "dark" ? "bg-primary/20 text-primary hover:bg-primary/30" : "bg-primary/10 text-primary hover:bg-primary/20";
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Error Loading Profile</h1>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-primary hover:bg-primary/90"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
            <p className="text-muted-foreground">Unable to load your profile data.</p>
            <Button 
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Left Column */}
          <div className="md:col-span-1">
            <Card className={getCardBackground()}>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-32 w-32 mb-4 border-4 border-border">
                    <AvatarImage
                      src={userData.avatar}
                      alt={userData.name}
                    />
                    <AvatarFallback>
                      <User className="h-16 w-16" />
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold">{userData.name}</h2>
                  <p className="text-sm text-muted-foreground mb-2">
                    {userData.email}
                  </p>
                  <Badge className={`${getBadgeBackground()} px-4 py-1`}>
                    <Leaf className="h-4 w-4 mr-1" />
                    {userData.ecoLevel}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-2">
                    Member since {new Date(userData.joinDate).toLocaleDateString()}
                  </p>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className={`flex justify-between items-center p-3 rounded-lg ${getStatCardBackground()}`}>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Carbon Saved</div>
                        <div className="text-xs text-muted-foreground">vs. avg shopper</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">{userData.impactStats.carbonSaved} kg</div>
                    </div>
                  </div>

                  <div className={`flex justify-between items-center p-3 rounded-lg ${getStatCardBackground()}`}>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Recycle className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Plastic Reduced</div>
                        <div className="text-xs text-muted-foreground">vs. avg shopper</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">{userData.impactStats.plasticReduced} kg</div>
                    </div>
                  </div>

                  <div className={`flex justify-between items-center p-3 rounded-lg ${getStatCardBackground()}`}>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Droplet className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Water Saved</div>
                        <div className="text-xs text-muted-foreground">vs. avg shopper</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">{userData.impactStats.waterSaved} L</div>
                    </div>
                  </div>

                  <div className={`flex justify-between items-center p-3 rounded-lg ${getStatCardBackground()}`}>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Trophy className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Eco Choices Made</div>
                        <div className="text-xs text-muted-foreground">total count</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">{userData.impactStats.ecoChoices}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2">
            <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className={`grid grid-cols-2 ${theme === "dark" ? "bg-primary/10" : "bg-primary/5"} p-1 rounded-lg`}>
                <TabsTrigger value="account" className="data-[state=active]:bg-background data-[state=active]:text-primary">Account</TabsTrigger>
                <TabsTrigger value="badges" className="data-[state=active]:bg-background data-[state=active]:text-primary">Eco Badges</TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="space-y-6">
                <Card className={getCardBackground()}>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Update your personal details.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={theme === "dark" ? "bg-background/50 border-border/50" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          className={theme === "dark" ? "bg-background/50 border-border/50" : ""}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setFormData({
                          name: userData.name,
                          email: userData.email,
                        });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSaveChanges}
                    >
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="badges" className="space-y-6">
                <Card className={getCardBackground()}>
                  <CardHeader>
                    <CardTitle>Your Eco Badges</CardTitle>
                    <CardDescription>Achievements you've earned through eco-conscious shopping.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {userData.badges.map((badge, index) => (
                        <div
                          key={index}
                          className={`flex flex-col items-center text-center p-6 border rounded-lg ${theme === "dark" ? "bg-primary/10 border-primary/20 hover:bg-primary/20" : "bg-primary/5 hover:bg-primary/10"} transition-colors`}
                        >
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                            <Award className="h-8 w-8 text-primary" />
                          </div>
                          <h3 className="font-semibold">{badge.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{badge.description}</p>
                          {badge.dateEarned && (
                            <p className="text-xs text-muted-foreground mt-2">
                              Earned on {new Date(badge.dateEarned).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
} 