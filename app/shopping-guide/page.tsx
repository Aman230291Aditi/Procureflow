import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingCart, Package, FileText, ArrowRight } from 'lucide-react'

export default function ShoppingGuidePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Procurement Portal</h1>
        <p className="text-lg text-muted-foreground">
          Complete shopping and requisition workflow in one place
        </p>
      </div>

      {/* Flow Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1: Browse Catalog */}
        <Card className="border-border rounded-xl hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                1
              </div>
              <Package className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Browse Catalog</CardTitle>
            <CardDescription>Explore products by category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-foreground">
              Search through our extensive product catalog, filter by categories, and view detailed product information with pricing and supplier details.
            </p>
            <Link href="/catalog" className="block">
              <Button className="w-full bg-primary hover:bg-primary/90">
                Open Catalog
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Step 2: Manage Cart */}
        <Card className="border-border rounded-xl hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                2
              </div>
              <ShoppingCart className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Review Cart</CardTitle>
            <CardDescription>Adjust quantities and remove items</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-foreground">
              Review all items you've added to your cart, adjust quantities, apply modifications, and see the total cost including taxes.
            </p>
            <Link href="/cart" className="block">
              <Button className="w-full bg-primary hover:bg-primary/90">
                View Cart
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Step 3: Create Requisition */}
        <Card className="border-border rounded-xl hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                3
              </div>
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Create Requisition</CardTitle>
            <CardDescription>Submit for approval</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-foreground">
              Fill in requisition details, add categories and tax information, review the final amounts, and submit for multi-level approval.
            </p>
            <Link href="/purchase-requisition/create" className="block">
              <Button className="w-full bg-primary hover:bg-primary/90">
                Create Requisition
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <div className="bg-secondary/30 rounded-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Smart Catalog Search</h3>
            <p className="text-sm text-muted-foreground">
              Filter products by multiple categories, search by SKU or name, and view detailed product information with high-quality images.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Beautiful Product Cards</h3>
            <p className="text-sm text-muted-foreground">
              See prices, supplier information, delivery dates, and savings percentage directly on product cards for quick decisions.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Flexible Cart Management</h3>
            <p className="text-sm text-muted-foreground">
              Easily adjust quantities, remove items, and see real-time calculations of subtotals, taxes, and final amounts.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Enhanced Line Items</h3>
            <p className="text-sm text-muted-foreground">
              Add tax percentages, track tax amounts, assign categories at multiple levels, and view net/tax/gross amounts in the footer.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Seamless Integration</h3>
            <p className="text-sm text-muted-foreground">
              Cart items automatically populate the requisition form, maintaining all details including pricing and supplier information.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Approval Workflow</h3>
            <p className="text-sm text-muted-foreground">
              Submit requisitions through a multi-level approval process with clear visibility into approval status at each level.
            </p>
          </div>
        </div>
      </div>

      {/* Direct Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/catalog">
          <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2">
            <Package className="h-5 w-5" />
            <span className="text-xs font-medium">Catalog</span>
          </Button>
        </Link>
        <Link href="/cart">
          <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <span className="text-xs font-medium">Cart</span>
          </Button>
        </Link>
        <Link href="/purchase-requisition/create">
          <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2">
            <FileText className="h-5 w-5" />
            <span className="text-xs font-medium">Create PR</span>
          </Button>
        </Link>
        <Link href="/purchase-requisition">
          <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2">
            <FileText className="h-5 w-5" />
            <span className="text-xs font-medium">View PRs</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
