"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Gift, Leaf, ShoppingBag, Coffee, TreePine, Droplet, Wind, CheckCircle2, XCircle, Camera, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";

interface ScannedItem {
  name: string;
  image: string;
  points: number;
  date: string;
  description: string;
  impact: {
    carbon: string;
    plastic: string;
    water: string;
  };
}

interface Voucher {
  id: number;
  company: string;
  logo: string;
  description: string;
  points: number;
  category: string;
  validUntil: string;
  impact: {
    carbon: string;
    plastic: string;
    water: string;
  };
  redeemedAt?: string;
}

// Real company vouchers with realistic values
const vouchers: Voucher[] = [
  {
    id: 1,
    company: "Patagonia",
    logo: "/patagonia.jpg",
    description: "Get 15% off on sustainable outdoor gear",
    points: 150,
    category: "clothing",
    validUntil: "2024-12-31",
    impact: {
      carbon: "1.5 kg CO₂ saved",
      plastic: "20% reduction",
      water: "25% reduction"
    }
  },
  {
    id: 2,
    company: "Starbucks",
    logo: "/starbucks.jpg",
    description: "Free reusable cup with any purchase",
    points: 75,
    category: "food",
    validUntil: "2024-10-31",
    impact: {
      carbon: "0.3 kg CO₂ saved",
      plastic: "100% reduction",
      water: "5% reduction"
    }
  },
  {
    id: 3,
    company: "Lush",
    logo: "/lush.jpg",
    description: "20% off on package-free products",
    points: 100,
    category: "beauty",
    validUntil: "2024-11-30",
    impact: {
      carbon: "0.8 kg CO₂ saved",
      plastic: "100% reduction",
      water: "15% reduction"
    }
  },
  {
    id: 4,
    company: "IKEA",
    logo: "/ikea.jpg",
    description: "10% off on sustainable home products",
    points: 120,
    category: "home",
    validUntil: "2024-12-15",
    impact: {
      carbon: "1.2 kg CO₂ saved",
      plastic: "30% reduction",
      water: "20% reduction"
    }
  },
  {
    id: 5,
    company: "The Body Shop",
    logo: "/body-shop.jpg",
    description: "15% off on refillable products",
    points: 90,
    category: "beauty",
    validUntil: "2024-11-15",
    impact: {
      carbon: "0.5 kg CO₂ saved",
      plastic: "50% reduction",
      water: "10% reduction"
    }
  },
  {
    id: 6,
    company: "REI",
    logo: "/rea.jpg",
    description: "15% off on eco-friendly camping gear",
    points: 100,
    category: "outdoor",
    validUntil: "2024-12-31",
    impact: {
      carbon: "1.0 kg CO₂ saved",
      plastic: "25% reduction",
      water: "15% reduction"
    }
  }
];

// Define the 5 accepted eco-friendly products
const ACCEPTED_PRODUCTS = [
  {
    id: 1,
    name: "Reusable Water Bottle",
    description: "A stainless steel or glass water bottle that reduces single-use plastic waste",
    points: 50,
    impact: {
      carbon: "1.2 kg CO₂ saved",
      plastic: "100% reduction",
      water: "20% reduction"
    }
  },
  {
    id: 2,
    name: "Bamboo Toothbrush",
    description: "A biodegradable toothbrush made from sustainable bamboo",
    points: 30,
    impact: {
      carbon: "0.5 kg CO₂ saved",
      plastic: "100% reduction",
      water: "10% reduction"
    }
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    description: "A t-shirt made from organic cotton without harmful pesticides",
    points: 40,
    impact: {
      carbon: "1.0 kg CO₂ saved",
      plastic: "0% reduction",
      water: "30% reduction"
    }
  },
  {
    id: 4,
    name: "Stainless Steel Straws",
    description: "Reusable metal straws that eliminate single-use plastic straws",
    points: 25,
    impact: {
      carbon: "0.3 kg CO₂ saved",
      plastic: "100% reduction",
      water: "5% reduction"
    }
  },
  {
    id: 5,
    name: "Safety Razor",
    description: "A metal safety razor with replaceable blades instead of disposable razors",
    points: 35,
    impact: {
      carbon: "0.7 kg CO₂ saved",
      plastic: "90% reduction",
      water: "15% reduction"
    }
  }
];

export default function VouchersPage() {
  const [activeTab, setActiveTab] = useState("available");
  const [greenPoints, setGreenPoints] = useState(0);
  const [redeemedVouchers, setRedeemedVouchers] = useState<Voucher[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemResult, setRedeemResult] = useState<{ success: boolean; message: string } | null>(null);
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>([]);
  const [showScannedItems, setShowScannedItems] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [isInitialized, setIsInitialized] = useState(false);

  // Load green points and scanned items from localStorage on component mount
  useEffect(() => {
    loadDataFromStorage();
  }, [lastUpdated]);

  const loadDataFromStorage = () => {
    try {
      const storedPoints = localStorage.getItem('greenPoints');
      const storedScannedItems = localStorage.getItem('scannedItems');
      const storedRedeemedVouchers = localStorage.getItem('redeemedVouchers');

      if (storedPoints) {
        setGreenPoints(parseInt(storedPoints, 10));
      }

      if (storedScannedItems) {
        setScannedItems(JSON.parse(storedScannedItems));
      }

      if (storedRedeemedVouchers) {
        setRedeemedVouchers(JSON.parse(storedRedeemedVouchers));
      }

      setIsLoading(false);
      setIsInitialized(true);
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      setIsLoading(false);
    }
  };

  const handleRedeem = (voucher: Voucher) => {
    if (greenPoints < voucher.points) {
      setRedeemResult({
        success: false,
        message: "Not enough green points to redeem this voucher."
      });
      return;
    }

    setIsRedeeming(true);
    setSelectedVoucher(voucher);

    // Simulate API call delay
    setTimeout(() => {
      const newPoints = greenPoints - voucher.points;
      setGreenPoints(newPoints);
      setRedeemedVouchers(prev => [...prev, voucher]);
      
      // Update localStorage
      localStorage.setItem('greenPoints', newPoints.toString());
      localStorage.setItem('redeemedVouchers', JSON.stringify([...redeemedVouchers, voucher]));
      
      setRedeemResult({
        success: true,
        message: `Successfully redeemed ${voucher.company} voucher!`
      });
      setIsRedeeming(false);
    }, 1500);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "clothing":
        return <ShoppingBag className="h-5 w-5" />;
      case "food":
        return <Coffee className="h-5 w-5" />;
      case "beauty":
        return <Gift className="h-5 w-5" />;
      case "home":
        return <Home className="h-5 w-5" />;
      case "outdoor":
        return <TreePine className="h-5 w-5" />;
      default:
        return <Gift className="h-5 w-5" />;
    }
  };

  const getProductDetails = (productName: string) => {
    return ACCEPTED_PRODUCTS.find(product => 
      product.name.toLowerCase() === productName.toLowerCase()
    );
  };

  // Calculate total points earned from GreenScan
  const totalGreenScanPoints = scannedItems.reduce((total, item) => total + (item.points || 0), 0);

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Vouchers</h1>
        <p className="text-muted-foreground">
          Redeem your green points for discounts at eco-friendly companies
        </p>
      </div>

      <div className="mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Your Green Points</h3>
                  <p className="text-sm text-muted-foreground">Earned from scanning eco-friendly products</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-600">{isLoading ? "..." : greenPoints}</div>
            </div>
            
            <Progress value={Math.min(greenPoints, 100)} className="h-2 mt-4" />
            <p className="text-xs text-muted-foreground text-right mt-1">
              {Math.min(greenPoints, 100)}/100 points to next level
            </p>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">GreenScan Points</span>
                </div>
                <span className="text-sm font-medium">{isLoading ? "..." : totalGreenScanPoints} points</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Items scanned: {isLoading ? "..." : scannedItems.length}</span>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8"
                    onClick={() => setShowScannedItems(!showScannedItems)}
                  >
                    {showScannedItems ? "Hide Scanned Items" : "Show Scanned Items"}
                  </Button>
                  <Link href="/greenscan">
                    <Button variant="outline" size="sm" className="h-8">
                      Scan More
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8"
                    onClick={() => setLastUpdated(Date.now())}
                  >
                    Refresh
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {showScannedItems && scannedItems.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Scanned Eco-Friendly Products</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {scannedItems.map((item, index) => {
              const productDetails = getProductDetails(item.name);
              return (
                <Card key={index} className="overflow-hidden">
                  <div className="h-40 bg-gray-100 flex items-center justify-center p-4">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-4">
                        <Leaf className="h-12 w-12 text-green-600 mb-2" />
                        <p className="text-sm font-medium">{item.name}</p>
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Points Earned:</span>
                      <span className="text-sm font-bold text-green-600">{item.points || productDetails?.points || 0}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Scanned On:</span>
                      <span className="text-sm">{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Carbon Impact:</span>
                        <span className="text-xs font-medium">
                          {item.impact?.carbon || productDetails?.impact?.carbon || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Plastic Reduction:</span>
                        <span className="text-xs font-medium">
                          {item.impact?.plastic || productDetails?.impact?.plastic || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Water Reduction:</span>
                        <span className="text-xs font-medium">
                          {item.impact?.water || productDetails?.impact?.water || "N/A"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      <Tabs defaultValue="available" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="available" className="flex items-center gap-2">
            <Gift className="h-4 w-4" />
            <span>Available Vouchers</span>
          </TabsTrigger>
          <TabsTrigger value="redeemed" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Redeemed Vouchers</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-6">
          {redeemResult && (
            <Alert className={redeemResult.success ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}>
              {redeemResult.success ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-amber-600" />
              )}
              <AlertTitle className={redeemResult.success ? "text-green-800" : "text-amber-800"}>
                {redeemResult.success ? "Success!" : "Not Enough Points"}
              </AlertTitle>
              <AlertDescription className={redeemResult.success ? "text-green-700" : "text-amber-700"}>
                {redeemResult.message}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vouchers.map((voucher) => (
              <Card key={voucher.id} className="overflow-hidden">
                <div className="h-24 bg-gray-100 flex items-center justify-center p-4">
                  <img 
                    src={voucher.logo} 
                    alt={voucher.company} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{voucher.company}</CardTitle>
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getCategoryIcon(voucher.category)}
                      <span className="capitalize">{voucher.category}</span>
                    </Badge>
                  </div>
                  <CardDescription>{voucher.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Points Required:</span>
                    <span className="text-sm font-bold text-green-600">{voucher.points}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Valid Until:</span>
                    <span className="text-sm">{new Date(voucher.validUntil).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Carbon Impact:</span>
                      <span className="text-xs font-medium">{voucher.impact.carbon}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Plastic Reduction:</span>
                      <span className="text-xs font-medium">{voucher.impact.plastic}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Water Reduction:</span>
                      <span className="text-xs font-medium">{voucher.impact.water}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button 
                    className="w-full" 
                    onClick={() => handleRedeem(voucher)}
                    disabled={isRedeeming || greenPoints < voucher.points}
                  >
                    {isRedeeming && selectedVoucher?.id === voucher.id ? (
                      "Redeeming..."
                    ) : greenPoints < voucher.points ? (
                      `Need ${voucher.points - greenPoints} more points`
                    ) : (
                      "Redeem Voucher"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="redeemed" className="space-y-6">
          {redeemedVouchers.length === 0 ? (
            <Card>
              <CardContent className="py-12">
                <div className="flex flex-col items-center justify-center text-center">
                  <Gift className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium">No Redeemed Vouchers</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    You haven't redeemed any vouchers yet. Browse available vouchers to get started.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setActiveTab("available")}
                  >
                    View Available Vouchers
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {redeemedVouchers.map((voucher) => (
                <Card key={voucher.id} className="overflow-hidden">
                  <div className="h-24 bg-gray-100 flex items-center justify-center p-4">
                    <img 
                      src={voucher.logo} 
                      alt={voucher.company} 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{voucher.company}</CardTitle>
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getCategoryIcon(voucher.category)}
                        <span className="capitalize">{voucher.category}</span>
                      </Badge>
                    </div>
                    <CardDescription>{voucher.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Points Used:</span>
                      <span className="text-sm font-bold text-green-600">{voucher.points}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Redeemed On:</span>
                      <span className="text-sm">{voucher.redeemedAt ? new Date(voucher.redeemedAt).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Carbon Impact:</span>
                        <span className="text-xs font-medium">{voucher.impact.carbon}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Plastic Reduction:</span>
                        <span className="text-xs font-medium">{voucher.impact.plastic}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Water Reduction:</span>
                        <span className="text-xs font-medium">{voucher.impact.water}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button variant="outline" className="w-full" disabled>
                      Redeemed
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 