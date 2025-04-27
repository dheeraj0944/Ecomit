import Link from "next/link"
import { Heart, Leaf, Mail, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-8 md:py-12 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              <h3 className="font-bold text-lg">EcoMit</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering sustainable choices for a greener future. Join us in making a difference, one purchase at a time.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold">Our Team</h3>
            <div className="text-sm text-muted-foreground">
              <ul className="space-y-1 font-medium">
                <li>Ajay Shenoy</li>
                <li>Abhishek Kumar</li>
                <li>Abhishek IJ</li>
                <li>Dheeraj R</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} EcoMit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 