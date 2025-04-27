"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Crown, Star, Award, Leaf, TreePine, Droplet, Wind, Recycle, Globe, Flag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  avatar: string;
  country: string;
  badge: string;
  impact: {
    carbon: number;
    plastic: number;
    water: number;
  };
}

// Diverse names from Indian, British, and Japanese backgrounds
const indianNames = [
  "Priya Sharma", "Arjun Patel", "Ananya Reddy", "Rahul Gupta", "Meera Singh", 
  "Vikram Malhotra", "Kavya Krishnan", "Rohan Verma", "Neha Kapoor", "Aditya Joshi"
];

const britishNames = [
  "Oliver Smith", "Emma Johnson", "William Brown", "Sophie Davis", "James Wilson", 
  "Charlotte Taylor", "Harry Thompson", "Isabella Clark", "George White", "Amelia Walker"
];

const japaneseNames = [
  "Yuki Tanaka", "Hiroshi Sato", "Aiko Yamamoto", "Kenji Watanabe", "Sakura Nakamura", 
  "Takashi Ito", "Mai Suzuki", "Yusuke Takahashi", "Rin Fujimoto", "Kazuki Kobayashi"
];

// Eco badges
const ecoBadges = [
  "Carbon Crusher", "Plastic Pioneer", "Water Warrior", "Forest Friend", "Ocean Guardian",
  "Zero Waste Hero", "Green Innovator", "Sustainability Star", "Eco Educator", "Climate Champion"
];

// Generate random leaderboard data
const generateLeaderboardData = (): LeaderboardEntry[] => {
  const allNames = [...indianNames, ...britishNames, ...japaneseNames];
  const data: LeaderboardEntry[] = [];
  
  for (let i = 1; i <= 30; i++) {
    const randomName = allNames[Math.floor(Math.random() * allNames.length)];
    const randomBadge = ecoBadges[Math.floor(Math.random() * ecoBadges.length)];
    
    // Determine country based on name
    let country = "Global";
    if (indianNames.includes(randomName)) country = "India";
    if (britishNames.includes(randomName)) country = "UK";
    if (japaneseNames.includes(randomName)) country = "Japan";
    
    // Generate more realistic points between 100 and 500
    const points = Math.floor(Math.random() * 400) + 100;
    
    // Generate more realistic impact metrics
    const carbon = Math.floor(Math.random() * 15) + 5; // 5-20 kg CO2
    const plastic = Math.floor(Math.random() * 8) + 2; // 2-10 kg plastic
    const water = Math.floor(Math.random() * 100) + 50; // 50-150 liters
    
    data.push({
      rank: i,
      name: randomName,
      points,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomName}`,
      country,
      badge: randomBadge,
      impact: {
        carbon,
        plastic,
        water
      }
    });
  }
  
  // Sort by points in descending order
  return data.sort((a, b) => b.points - a.points);
};

export default function LeaderboardPage() {
  const { theme } = useTheme();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [activeTab, setActiveTab] = useState("global");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLeaderboardData(generateLeaderboardData());
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter data based on active tab
  const filteredData = leaderboardData.filter(entry => {
    if (activeTab === "global") return true;
    return entry.country === activeTab;
  });
  
  // Get top 3 for special styling
  const topThree = filteredData.slice(0, 3);
  const restOfData = filteredData.slice(3);
  
  // Get country counts
  const countryCounts = {
    india: leaderboardData.filter(entry => entry.country === "India").length,
    uk: leaderboardData.filter(entry => entry.country === "UK").length,
    japan: leaderboardData.filter(entry => entry.country === "Japan").length,
    global: leaderboardData.length
  };
  
  // Get badge icon based on badge name
  const getBadgeIcon = (badge: string) => {
    if (badge.includes("Carbon")) return <Wind className="h-4 w-4 text-blue-500" />;
    if (badge.includes("Plastic")) return <Recycle className="h-4 w-4 text-green-500" />;
    if (badge.includes("Water")) return <Droplet className="h-4 w-4 text-blue-500" />;
    if (badge.includes("Forest") || badge.includes("Ocean")) return <TreePine className="h-4 w-4 text-green-500" />;
    if (badge.includes("Zero")) return <Leaf className="h-4 w-4 text-green-500" />;
    return <Award className="h-4 w-4 text-amber-500" />;
  };
  
  // Get podium background colors based on theme
  const getPodiumBackground = (index: number) => {
    if (theme === "dark") {
      return index === 0 ? "bg-yellow-900/30 border border-yellow-800" : 
             index === 1 ? "bg-gray-800/30 border border-gray-700" : 
             "bg-amber-900/30 border border-amber-800";
    } else {
      return index === 0 ? "bg-yellow-50 border border-yellow-200" : 
             index === 1 ? "bg-gray-50 border border-gray-200" : 
             "bg-amber-50 border border-amber-200";
    }
  };
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">Top Eco Warriors</h1>
      <p className="text-muted-foreground mb-6">See who's making the biggest impact for our planet</p>
      
      <Tabs defaultValue="global" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="global" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>Global</span>
            <Badge variant="outline" className="ml-1">{countryCounts.global}</Badge>
          </TabsTrigger>
          <TabsTrigger value="India" className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            <span>India</span>
            <Badge variant="outline" className="ml-1">{countryCounts.india}</Badge>
          </TabsTrigger>
          <TabsTrigger value="UK" className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            <span>UK</span>
            <Badge variant="outline" className="ml-1">{countryCounts.uk}</Badge>
          </TabsTrigger>
          <TabsTrigger value="Japan" className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            <span>Japan</span>
            <Badge variant="outline" className="ml-1">{countryCounts.japan}</Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="grid gap-4">
        <Card className="border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span>{activeTab === "global" ? "Global" : activeTab} Leaderboard</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Top 3 with special styling */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {topThree.map((entry, index) => (
                    <div
                      key={entry.rank}
                      className={`flex flex-col items-center p-4 rounded-lg ${getPodiumBackground(index)}`}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
                        {index === 0 ? <Crown className="h-5 w-5 text-yellow-500" /> : 
                         index === 1 ? <Medal className="h-5 w-5 text-gray-400" /> : 
                         <Medal className="h-5 w-5 text-amber-500" />}
                      </div>
                      <img
                        src={entry.avatar}
                        alt={entry.name}
                        className="w-16 h-16 rounded-full mb-2 border-2 border-primary"
                      />
                      <span className="font-bold text-lg">{entry.name}</span>
                      <span className="text-sm text-muted-foreground mb-1">{entry.country}</span>
                      <Badge variant="outline" className="mb-2 flex items-center gap-1">
                        {getBadgeIcon(entry.badge)}
                        <span>{entry.badge}</span>
                      </Badge>
                      <span className="font-semibold text-primary text-xl">{entry.points} pts</span>
                      <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-center">
                        <div>
                          <div className="font-medium">{entry.impact.carbon}</div>
                          <div className="text-muted-foreground">kg CO₂</div>
                        </div>
                        <div>
                          <div className="font-medium">{entry.impact.plastic}</div>
                          <div className="text-muted-foreground">kg saved</div>
                        </div>
                        <div>
                          <div className="font-medium">{entry.impact.water}</div>
                          <div className="text-muted-foreground">L saved</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Rest of the leaderboard */}
                {restOfData.map((entry) => (
                  <div
                    key={entry.rank}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                        <span className="font-bold text-primary">{entry.rank}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <img
                          src={entry.avatar}
                          alt={entry.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <span className="font-medium">{entry.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{entry.country}</span>
                            <Badge variant="outline" className="text-xs flex items-center gap-1">
                              {getBadgeIcon(entry.badge)}
                              <span>{entry.badge}</span>
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Impact</div>
                        <div className="text-xs">
                          {entry.impact.carbon}kg CO₂ • {entry.impact.plastic}kg plastic • {entry.impact.water}L water
                        </div>
                      </div>
                      <span className="font-semibold text-primary">{entry.points} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 