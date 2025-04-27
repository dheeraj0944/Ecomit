"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Camera, Upload, CheckCircle2, XCircle, Leaf, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

export default function GreenScanPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [scannedItems, setScannedItems] = useState([]);
  const [activeTab, setActiveTab] = useState("scan");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [isRejected, setIsRejected] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const fileInputRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved points and scanned items from localStorage on component mount
  useEffect(() => {
    try {
      // Load green points
      const savedPoints = localStorage.getItem("greenPoints");
      if (savedPoints) {
        setTotalPoints(parseInt(savedPoints, 10));
      }
      
      // Load scanned items
      const savedItems = localStorage.getItem("scannedItems");
      if (savedItems) {
        try {
          const parsedItems = JSON.parse(savedItems);
          setScannedItems(parsedItems);
        } catch (e) {
          console.error("Error parsing scanned items:", e);
          setScannedItems([]);
        }
      }
      
      setIsInitialized(true);
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
      setIsInitialized(true);
    }
  }, []);

  // Save points to localStorage when they change
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("greenPoints", totalPoints.toString());
      } catch (error) {
        console.error("Error saving points to localStorage:", error);
      }
    }
  }, [totalPoints, isInitialized]);

  // Save scanned items to localStorage when they change
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("scannedItems", JSON.stringify(scannedItems));
      } catch (error) {
        console.error("Error saving scanned items to localStorage:", error);
      }
    }
  }, [scannedItems, isInitialized]);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // Create a preview URL for the selected image
    const imageUrl = URL.createObjectURL(file);
    
    setSelectedImage({
      id: Date.now(),
      name: productName || "Unnamed Product",
      image: imageUrl,
      file: file,
      description: productDescription || "No description provided."
    });
    
    setScanResult(null);
    setIsRejected(false);
  };

  const handleScan = () => {
    if (!selectedImage) return;
    
    setIsScanning(true);
    setIsRejected(false);
    
    // Simulate scanning process
    setTimeout(() => {
      // Check if the product name matches one of the accepted products
      const matchedProduct = ACCEPTED_PRODUCTS.find(
        product => product.name.toLowerCase() === selectedImage.name.toLowerCase()
      );
      
      if (matchedProduct) {
        // Product is accepted
        const result = {
          ...selectedImage,
          ecoScore: 90, // High eco score for accepted products
          points: matchedProduct.points,
          impact: matchedProduct.impact,
          scannedAt: new Date().toISOString()
        };
        
        setScanResult(result);
        
        // Add points and update scanned items
        const newTotalPoints = totalPoints + matchedProduct.points;
        setTotalPoints(newTotalPoints);
        
        // Update scanned items and ensure it's saved to localStorage
        const updatedScannedItems = [...scannedItems, result];
        setScannedItems(updatedScannedItems);
        
        // Directly save to localStorage to ensure data persistence
        try {
          localStorage.setItem("scannedItems", JSON.stringify(updatedScannedItems));
          localStorage.setItem("greenPoints", newTotalPoints.toString());
        } catch (error) {
          console.error("Error saving data to localStorage:", error);
        }
      } else {
        // Product is rejected
        setIsRejected(true);
        setRejectionReason("This product is not in our list of accepted eco-friendly products. Please try one of the accepted products.");
        setScanResult(null);
      }
      
      setIsScanning(false);
      
      // Reset form
      setSelectedImage(null);
      setProductName("");
      setProductDescription("");
    }, 2000);
  };

  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">GreenScan</h1>
        <p className="text-muted-foreground">
          Upload eco-friendly products to earn green points and track your environmental impact.
        </p>
      </div>

      <Tabs defaultValue="scan" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="scan" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            <span>Upload Products</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Leaf className="h-4 w-4" />
            <span>Scan History</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scan" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-green-600" />
                <span>Upload Your Product</span>
              </CardTitle>
              <CardDescription>
                Upload a product image to earn green points
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input 
                      id="product-name" 
                      placeholder="Enter product name" 
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Accepted products: Reusable Water Bottle, Bamboo Toothbrush, Organic Cotton T-Shirt, Stainless Steel Straws, Safety Razor
                    </p>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="product-description">Product Description</Label>
                    <Input 
                      id="product-description" 
                      placeholder="Enter product description" 
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Product Image</Label>
                    <div className="flex flex-col items-center gap-4 py-8 border-2 border-dashed border-green-200 rounded-lg">
                      {selectedImage ? (
                        <div className="relative w-48 h-48">
                          <img 
                            src={selectedImage.image} 
                            alt={selectedImage.name} 
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm"
                            onClick={() => setSelectedImage(null)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-8 w-8 text-green-300" />
                          <Button className="bg-green-600 hover:bg-green-700" onClick={handleUpload}>
                            Upload Product Image
                          </Button>
                          <input 
                            type="file" 
                            ref={fileInputRef}
                            className="hidden" 
                            accept="image/*"
                            onChange={handleImageSelect}
                          />
                          <p className="text-sm text-muted-foreground">
                            Supported formats: JPG, PNG, WebP
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700" 
                  onClick={handleScan}
                  disabled={!selectedImage || isScanning}
                >
                  {isScanning ? (
                    <>
                      <span className="inline-block animate-spin mr-2">⏳</span>
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Camera className="h-4 w-4 mr-2" />
                      Scan Product
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {scanResult && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Scan Successful!</AlertTitle>
              <AlertDescription className="text-green-700">
                You've earned {scanResult.points} green points for scanning {scanResult.name}.
              </AlertDescription>
            </Alert>
          )}

          {isRejected && (
            <Alert className="bg-amber-50 border-amber-200">
              <XCircle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800">Product Not Accepted</AlertTitle>
              <AlertDescription className="text-amber-700">
                {rejectionReason}
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                <span>Your Green Points</span>
              </CardTitle>
              <CardDescription>
                Track your earned green points and scanned products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Leaf className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Total Green Points</h3>
                      <p className="text-sm text-muted-foreground">Earned from scanning eco-friendly products</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{totalPoints}</div>
                </div>
                
                <Progress value={Math.min(totalPoints, 100)} className="h-2" />
                <p className="text-xs text-muted-foreground text-right">
                  {Math.min(totalPoints, 100)}/100 points to next level
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scan History</CardTitle>
              <CardDescription>Your recently scanned eco-friendly products</CardDescription>
            </CardHeader>
            <CardContent>
              {scannedItems.length === 0 ? (
                <div className="text-center py-8">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No scanned products yet</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setActiveTab("scan")}
                  >
                    Upload a Product
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {scannedItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-green-50/50 transition-colors">
                      <div className="h-16 w-16 rounded-md overflow-hidden">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Scanned on {new Date(item.scannedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          +{item.points} points
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-1">
                          Eco Score: {item.ecoScore}/100
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 